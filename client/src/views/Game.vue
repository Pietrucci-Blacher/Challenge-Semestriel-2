<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <div class="game-board">
                    <Board />
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
    components: {
        Board,
    },
    data() {
        return {
            board: ChessBoard.getInstance(),
        };
    },
};
</script>
