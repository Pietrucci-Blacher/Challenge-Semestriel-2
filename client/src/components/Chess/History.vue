<script setup>
import ChessBoard from '@/components/Chess/Board.js';
</script>

<template>
    <div class="bg-grey-100 h-screen history">
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
};
</script>

<style scoped>
.history {
    width: 100%;
    overflow-y: auto;
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
