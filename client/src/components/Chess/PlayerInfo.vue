<script setup>
import ChessBoard from '@/components/Chess/Board.js';
</script>

<template>
    <div class="player-info">
        <div
            class="player-info-name"
            :class="{ 'player-info-turn': getTurn() === color }"
        >
            {{ name }}
        </div>
        <button v-if="color === board.color" class="giveup-btn" @click="giveUp()">
            Give up
        </button>
        <div class="player-info-taken">
            <img
                v-for="piece in getTakenPiece(color)"
                :key="piece"
                :src="piece"
                class="player-info-taken-piece"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerInfo',
    props: {
        name: String,
        color: String,
    },
    data() {
        return {
            board: ChessBoard.getInstance(),
        };
    },
    methods: {
        getTakenPiece(color) {
            return this.board.moveHistory
                .filter((move) => move.player === color && move.takenPieceName)
                .map((move) => this.chessPiece(color, move.takenPieceName));
        },
        chessPiece(color, name) {
            const invColor = color === 'white' ? 'black' : 'white';
            return `/images/chess-piece-classic/${invColor}-${name}.svg`;
        },
        getTurn() {
            return this.board.getTurn();
        },
        giveUp() {
            this.board.giveUp();
        },
    },
};
</script>

<style scoped>
.player-info {
    background-color: #8b4513;
    color: #fff;
    display: flex;
    flex-direction: row;
    padding: 5px;
}

.player-info-name {
    padding: 0px 15px;
}

.player-info-turn {
    font-weight: bold;
    border-radius: 20px;
    background-color: #f0d9b5;
    color: #000;
}

.player-info-taken {
    display: flex;
    flex-direction: row;
    margin-left: auto;
}

.player-info-taken-piece {
    width: 20px;
    height: 20px;
}

.giveup-btn {
    margin-left: 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
}
</style>
