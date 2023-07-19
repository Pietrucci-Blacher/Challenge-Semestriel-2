<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import PlayerInfo from '@/components/Chess/PlayerInfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { ref } from 'vue';
import Socket from '@/utils/socket.js';
import Chat from '@/components/Chat.vue';

const isUserAuthenticated = ref(false);
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <div class="game-info">
                    <Chat />
                </div>
                <div class="game-board">
                    <PlayerInfo name="Sunshio" color="black" />
                    <Board :reverse="false" />
                    <PlayerInfo name="LordPax" color="white" />
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

        if (this.$route.params.id !== 'local') {
            const socket = Socket.connect('game');
            board.connectToSocket(socket);
            board.gameId = this.$route.params.id;
        }

        return { board };
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
