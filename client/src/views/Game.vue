<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import PlayerInfo from '@/components/Chess/PlayerInfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { ref, onBeforeUnmount } from 'vue';
import Socket from '@/utils/socket.js';
import Chat from '@/components/Chat.vue';

defineProps(['isUserAuthenticated']);

</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <div class="game">
                <div v-if="$route.params.id !== 'local'" class="game-info">
                    <Chat />
                </div>
                <div class="game-board">
                    <PlayerInfo
                        :key="reload"
                        :name="opponent()"
                        :color="opponentColor()"
                    />
                    <Board :key="reload" :reverse="board.color !== 'white'" />
                    <PlayerInfo
                        :key="reload"
                        :name="player()"
                        :color="playerColor()"
                    />
                </div>
                <div class="game-info">
                    <History :key="reload" />
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
        const data = {
            board,
            reload: 0,
        };

        if (this.$route.params.id === 'local') return data;

        const gameId = this.$route.params.id;

        const socket = Socket.connect(`game-${gameId}`);

        socket.on('gameDoesNotExist', () => {
            window.location.href = '/game';
        });

        socket.on('chessMoveFromServer', (move) => {
            console.log('chessMoveFromServer', move);
            board.movePiece(
                move.fromRow,
                move.fromCol,
                move.toRow,
                move.toCol,
                false,
            );
            this.forceReload();
        });

        board.connectToSocket(socket);
        board.gameId = gameId;

        board.initInfo().then(() => {
            this.forceReload();
        });

        onBeforeUnmount(() => {
            Socket.disconnect(`game-${gameId}`);
            ChessBoard.destroyInstance();
        });

        return data;
    },
    methods: {
        forceReload() {
            this.reload += 1;
        },
        player() {
            return this.board.color === 'white'
                ? this.board.whitePlayer
                : this.board.blackPlayer;
        },
        playerColor() {
            return this.board.color;
        },
        opponent() {
            return this.board.color === 'white'
                ? this.board.blackPlayer
                : this.board.whitePlayer;
        },
        opponentColor() {
            return this.board.color === 'white' ? 'black' : 'white';
        },
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
