<script setup>
import { onMounted } from 'vue';
import ChessBoard from '@/components/Chess/Board.js';

onMounted(() => {
    const board = document.querySelector('.board');
    board.addEventListener('contextmenu', (event) => event.preventDefault());
});
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
                :class="{
                    'selected-square':
                        clicked?.x === reverseCoord(colIndex, reverse) &&
                        clicked?.y === reverseCoord(rowIndex, reverse),
                    'black-square': (rowIndex + colIndex) % 2 === 1,
                }"
                :style="{ width: squareSize, height: squareSize }"
                @click="
                    onSquareClick(
                        reverseCoord(colIndex, reverse),
                        reverseCoord(rowIndex, reverse),
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
            default: 500,
        },
        height: {
            type: Number,
            default: 500,
        },
        reverse: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            chessBoard: ChessBoard.getInstance(),
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
        reverseCoord(coord, rev = false) {
            return rev ? 7 - coord : coord;
        },
        chessPiece(piece) {
            return `/images/chess-piece-classic/${piece}`;
        },
        onSquareClick(x, y) {
            if (this.clicked) {
                const { x: x1, y: y1 } = this.clicked;
                this.chessBoard.movePiece(y1, x1, y, x);
                this.clicked = null;
                return;
            }

            this.clicked = { x, y };
        },
    },
};
</script>

<style scoped>
.board {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    background-color: #f0d9b5;
}

.row {
    display: flex;
    flex-direction: row;
}

.label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
}

.col-label {
    width: 20px;
}

.row-label {
    height: 20px;
}

.equalizer {
    width: 20px;
    height: 20px;
}

.square {
    display: flex;
    justify-content: center;
    align-items: center;
    /*font-size: 24px;*/
    border: 1px solid black;
    background-color: #f0d9b5;
}

.black-square {
    background-color: #8b4513;
    color: white;
}

.selected-square {
    background-color: orange;
}

.chess-piece {
    width: 100%;
    pointer-events: none;
}

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
    supported by Chrome, Edge, Opera and Firefox */
}
</style>
