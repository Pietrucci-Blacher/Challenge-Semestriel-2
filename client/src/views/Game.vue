<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import PlayerInfo from '@/components/Chess/PlayerInfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { ref, onBeforeUnmount } from 'vue';
import Socket from '@/utils/socket.js';
import Chat from '@/components/Chat.vue';

const isUserAuthenticated = ref(false);
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <div v-if="$route.params.id !== 'local'" class="game-info">
                    <Chat />
                </div>
                <div class="game-board">
                    <PlayerInfo color="black" />
                    <Board :reverse="board.color !== 'white'" />
                    <PlayerInfo color="white" />
                </div>
                <div class="game-info">
                    <History />
                </div>
            </div>
        </main>
    </section>
</template>

<script>
export default {
    name: 'Game',
    data() {
        const board = ChessBoard.getInstance();
        const data = {
            board,
        };

        if (this.$route.params.id === 'local') return data;

        const gameId = this.$route.params.id;

        const socket = Socket.connect(`game-${gameId}`);

        socket.on('gameDoesNotExist', () => {
            window.location.href = '/game';
        });

        board.connectToSocket(socket);
        board.gameId = gameId;

        board.initInfo();

        onBeforeUnmount(() => {
            Socket.disconnect(`game-${this.$route.params.id}`);
        });

        return data;
    },
};
</script>

<style scoped>
.game {
    padding: 10px;
    display: flex;
    flex-direction: row;
}

.game-info {
    margin-left: 10px;
    height: 100%;
}
</style>
