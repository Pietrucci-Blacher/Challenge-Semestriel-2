<script setup>
import ChessBoard from '@/components/Board.js';
import { reactive } from 'vue';
</script>
<template>
    <div class="board noselect" :style="{ width: boardDim }">
        <div class="row">
            <div class="equalizer"></div>
            <div
                :key="label"
                v-for="label in reverseTab(labels, reverse)"
                class="label row-label"
                :style="{ width: squareSize }"
            >
                {{ label }}
            </div>
            <div class="equalizer"></div>
        </div>
        <div
            v-for="(row, rowIndex) in reverseTab(chessBoard.board, reverse)"
            :key="rowIndex"
            class="row"
        >
            <div class="label col-label">
                {{ reverseLabel(rowIndex, reverse) }}
            </div>
            <div
                v-for="(square, colIndex) in reverseTab(row, reverse)"
                :key="colIndex"
                class="square"
                :class="{ 'black-square': (rowIndex + colIndex) % 2 === 1 }"
                :style="{ width: squareSize, height: squareSize }"
                @click="
                    onSquareClick(
                        reverse ? 7 - colIndex : colIndex,
                        reverse ? 7 - rowIndex : rowIndex,
                    )
                "
            >
                <img
                    v-if="square"
                    class="chess-piece"
                    :src="chessPiece(square.imageName)"
                />
            </div>
            <div class="label col-label">
                {{ reverseLabel(rowIndex, reverse) }}
            </div>
        </div>
        <div class="row">
            <div class="equalizer"></div>
            <div
                :key="label"
                v-for="label in reverseTab(labels, reverse)"
                class="label row-label"
                :style="{ width: squareSize }"
            >
                {{ label }}
            </div>
            <div class="equalizer"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Board',
    props: {
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400,
        },
        reverse: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            chessBoard: reactive(new ChessBoard()),
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            clicked: null,
        };
    },
    computed: {
        boardDim() {
            const minDimension = Math.max(this.width, this.height);
            return `${minDimension + 40}px`;
        },
        squareSize() {
            const minDimension = Math.max(this.width, this.height);
            return `${minDimension / 8}px`;
        },
    },
    methods: {
        reverseTab(data, rev = false) {
            return rev ? data.slice().reverse() : data;
        },
        reverseLabel(index, rev = false) {
            return rev ? 1 + index : 8 - index;
        },
        chessPiece(piece) {
            return `/images/chess-piece-classic/${piece}`;
        },
        onSquareClick(x, y) {
            if (this.clicked) {
                const { x: x1, y: y1 } = this.clicked;
                this.chessBoard.movePiece(x1, y1, x, y);
                this.clicked = null;
                return;
            }

            this.clicked = { x, y };
        },
    },
};
</script>
