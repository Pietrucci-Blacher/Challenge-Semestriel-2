<script setup>
import ChessBoard from '@/components/Chess/Board.js';
</script>

<template>
    <div class="history" :style="{ height: height + 40 + 'px' }">
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
    props: {
        height: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            chessBoard: ChessBoard.getInstance(),
        };
    },
};
</script>
