<script setup>
import Board from '@/components/Board.vue';
import ChessBoard from '@/components/Board.js';
</script>

<template>
    <div class="game">
        <Board width="500" />
        <button @click="board.resetBoard()">Reset</button>
    </div>
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
