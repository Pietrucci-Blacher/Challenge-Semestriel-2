<script setup>
import ChessBoard from '@/components/Chess/Board.js';
</script>

<template>
    <!--<div class="history">-->
    <div class="history" :style="{ height: height + 10 + 'px' }">
        <div
            class="history-item"
            v-for="(move, index) in chessBoard.moveHistory"
            :key="index"
        >
            <div class="history-notation">
                {{ index + 1 }}. {{ move.notation }}
            </div>
            <div class="history-player">{{ move.player }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'History',
    data() {
        return {
            chessBoard: ChessBoard.getInstance(),
        };
    },
    props: {
        height: {
            type: Number,
            default: 600,
        },
    },
};
</script>

<style scoped>
.history {
    border: 1px solid black;
    width: 250px;
    overflow-y: auto;
    background-color: #f0d9b5;
}

.history-item {
    padding: 3px 15px;
    cursor: pointer;
    color: black;
    display: flex;
    flex-direction: row;
}

.history-notation {
    width: 100%;
}
</style>
