<script setup>
import Board from '@/components/Board.vue';
import ChessBoard from '@/components/Board.js';
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <Board width="500" />
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
