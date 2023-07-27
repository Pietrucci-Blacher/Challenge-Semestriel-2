<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import PlayerInfo from '@/components/Chess/PlayerInfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { ref, onBeforeUnmount } from 'vue';
import Socket from '@/utils/socket.js';
import Chat from '@/components/Chat.vue';
import ChatJs from '@/components/Chat.js';
import Modal from '@/components/Modal.vue';

defineProps(['isUserAuthenticated']);
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <div v-if="$route.params.id !== 'local'">
                    <Chat :key="reload" />
                </div>
                <div class="game-board">
                    <PlayerInfo
                        :key="reload"
                        :name="opponent()"
                        :color="opponentColor()"
                    />
                    <Board
                        :key="reload"
                        :reverse="board.color !== 'white'"
                        :height="height"
                    />
                    <PlayerInfo
                        :key="reload"
                        :name="playerName()"
                        :color="playerColor()"
                    />
                </div>
                <div class="game-info">
                    <History :key="reload" />
                </div>
            </div>
        </main>
    </section>
    <Modal v-if="showModal === 1" title="You Win">
        <p>Your elo is {{ elo }}</p>
        <button @click="hideModal">Retour</button>
    </Modal>
    <Modal v-if="showModal === 2" title="You Loose">
        <p>Your elo is {{ elo }}</p>
        <button @click="hideModal">Retour</button>
    </Modal>
</template>

<script>
export default {
    name: 'Game',
    data() {
        const board = ChessBoard.getInstance();
        const data = {
            board,
            reload: 0,
            showModal: 0,
            height: window.innerHeight - 110,
            player: '',
            elo: 0,
        };

        if (this.$route.params.id === 'local') return data;

        const gameId = this.$route.params.id;
        const socket = Socket.connect(`game-${gameId}`);
        if (!socket) window.location.href = '/game';
        board.gameId = gameId;
        board.connectToSocket(socket);
        board.initEventListeners(this);

        const chat = ChatJs.getInstance();
        const chatSocket = Socket.connect(`chat-${gameId}`);
        if (!chatSocket) window.location.href = '/game';
        chat.gameId = gameId;
        chat.connectToSocket(chatSocket);
        chat.initEventListeners(this);

        board.initData(this).then(() => {
            this.forceReload();
        });
        chat.initData().then(() => {
            this.forceReload();
        });

        onBeforeUnmount(() => {
            Socket.disconnect(`game-${gameId}`);
            Socket.disconnect(`chat-${gameId}`);
            ChessBoard.destroyInstance();
            ChatJs.destroyInstance();
        });

        return data;
    },
    methods: {
        forceReload() {
            this.reload += 1;
        },
        playerName() {
            return this.board.color === 'white'
                ? this.board.whitePlayer
                : this.board.blackPlayer;
        },
        playerColor() {
            return this.board.color;
        },
        opponent() {
            return this.board.color === 'white'
                ? this.board.blackPlayer
                : this.board.whitePlayer;
        },
        opponentColor() {
            return this.board.color === 'white' ? 'black' : 'white';
        },
        hideModal() {
            this.showModal = 0;
            window.location.href = '/game';
        },
    },
};
</script>

<style scoped>
.game {
    display: flex;
    flex-direction: row;
}

.game-info {
    width: 100%;
}
</style>
