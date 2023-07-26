<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the icons you need
import { faDumbbell, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/Modal.vue';

library.add(faGlobe, faDumbbell);
const isUserAuthenticated = true; // Replace with your actual authenticated state logic

const showContent = ref(false);

onMounted(() => {
    // Trigger the fade-in effect after a short delay
    setTimeout(() => {
        showContent.value = true;
    }, 100);
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />

        <div class="w-full fade-in-container">
            <h1 class="text-4xl font-bold mt-16 mb-6 text-center fade-in-down">
                Select a Game Mode
            </h1>
            <div class="flex justify-center h-4/5">
                <div
                    class="flex flex-col items-center md:flex-row lg:gap-56 md:gap-20 sm:gap-y-8 fade-in-down"
                >
                    <router-link
                        to="/game/local"
                        class="bg-white p-6 rounded-lg shadow-md w-64 md:w-96 h-96 transition duration-300 hover:shadow-lg hover:bg-gray-50 cursor-pointer flex flex-col gap-y-24"
                    >
                        <div class="flex items-center justify-center mb-4">
                            <font-awesome-icon
                                :icon="['fas', 'dumbbell']"
                                class="text-7xl"
                            />
                        </div>
                        <div class="flex flex-col gap-y-12">
                            <h2 class="text-2xl font-bold mb-3 text-center">
                                Local Mode
                            </h2>
                            <p class="text-gray-600 text-center">
                                Select a game mode to play with friends locally
                            </p>
                        </div>
                    </router-link>
                    <div
                        class="bg-white p-6 rounded-lg shadow-md w-64 md:w-96 h-96 transition duration-300 hover:shadow-lg hover:bg-gray-50 cursor-pointer flex flex-col gap-y-24"
                        @click="findGame"
                    >
                        <div class="flex items-center justify-center mb-4">
                            <font-awesome-icon
                                :icon="['fas', 'globe']"
                                class="text-7xl"
                            />
                        </div>
                        <div class="flex flex-col gap-y-12">
                            <h2 class="text-2xl font-bold mb-3 text-center">
                                Online Mode
                            </h2>
                            <p class="text-gray-600 text-center">
                                Select a game mode to play with others online
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Modal v-if="showModal === 1" title="Match making">
        <p>Recherche de partie ...</p>
        <button @click="hideModal">Annuler</button>
    </Modal>
    <Modal v-if="showModal === 2" title="Match making">
        <p>Aucun joueur n'a été trouver</p>
        <button @click="hideModal">Fermer</button>
    </Modal>
</template>

<script>
import Socket from '@/utils/socket';
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
            socket.on('gameDoesNotExist', () => {
                window.location.href = '/game';
            });
        },
        hideModal() {
            Socket.disconnect('queue');
            showModal.value = 0;
        },
    },
};
</script>

<style scoped>
.router-link-active::after {
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 9999px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    animation: ripple 0.6s linear;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Apply fade-in down animation to the wrapper element */
.fade-in-container > * {
    animation: fade-in-down 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
