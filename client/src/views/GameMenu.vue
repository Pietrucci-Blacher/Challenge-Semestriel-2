<script setup>
import Navbar from '@/components/Navbar/Navbar.vue';
import Socket from '@/utils/socket.js';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <div>
            <div><a href="/game/local">Local</a></div>
            <div @click="findGame">Online</div>
        </div>
    </section>
    <Modal v-show="showModal === 1" title="Match making">
        <p>Recherche de partie ...</p>
        <button @click="hideModal">Annuler</button>
    </Modal>
    <Modal v-show="showModal === 2" title="Match making">
        <p>Aucun joueur n'a été trouver</p>
        <button @click="hideModal">Fermer</button>
    </Modal>
</template>

<script>
const showModal = ref(0);

export default {
    name: 'GameMenu',
    methods: {
        findGame() {
            const socket = Socket.connect('queue');
            socket.emit('addToQueue');
            showModal.value = 1;

            socket.on('gameFound', (data) => {
                window.location.href = `/game/${data.gameId}`;
            });
            socket.on('gameNotFound', () => {
                showModal.value = 2;
            });
        },
        hideModal() {
            Socket.disconnect('queue');
            showModal.value = 0;
        },
    },
};
</script>
