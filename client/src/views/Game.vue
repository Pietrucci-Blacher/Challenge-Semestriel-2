<script setup>
import Board from '@/components/Chess/Board.vue';
import History from '@/components/Chess/History.vue';
import ChessBoard from '@/components/Chess/Board.js';
import PlayerInfo from '@/components/Chess/PlayerInfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { ref, onBeforeUnmount } from 'vue';
import Socket from '@/utils/socket.js';
import Chat from '@/components/Chat.vue';
import Cookie from 'js-cookie';

const isUserAuthenticated = ref(false);
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
                        :name="
                            board.color.value === 'black'
                                ? board.whitePlayer.value
                                : board.blackPlayer.value
                        "
                        :color="
                            board.color.value === 'black' ? 'black' : 'white'
                        "
                    />
                    <Board :reverse="board.color.value !== 'white'" />
                    <PlayerInfo
                        :name="
                            board.color.value === 'white'
                                ? board.whitePlayer.value
                                : board.blackPlayer.value
                        "
                        :color="
                            board.color.value === 'white' ? 'white' : 'black'
                        "
                    />
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
    name: 'Game',
    data() {
        const board = ChessBoard.getInstance();
        const data = {
            board,
        };

        if (this.$route.params.id === 'local') return data;

        const gameId = this.$route.params.id;

        const socket = Socket.connect(`game-${gameId}`);
        board.connectToSocket(socket);
        board.gameId = gameId;

        (async () => {
            let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
            const response = await fetch(`${url}/game/${gameId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
                },
            });

            const game = await response.json();

            console.log('game', game);

            const [whiteRes, blackRes] = await Promise.all([
                fetch(`${url}/users/${game.whiteUserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookie.get(
                            'userAccessToken',
                        )}`,
                    },
                }),
                fetch(`${url}/users/${game.blackUserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookie.get(
                            'userAccessToken',
                        )}`,
                    },
                }),
            ]);

            console.log('whiteRes', whiteRes, 'blackRes', blackRes);

            const [whitePlayer, blackPlayer] = await Promise.all([
                whiteRes.json(),
                blackRes.json(),
            ]);

            console.log('whitePlayer', whitePlayer, 'blackPlayer', blackPlayer);

            board.whitePlayer = ref(whitePlayer.username);
            board.blackPlayer = ref(blackPlayer.username);
            board.color = ref(
                game.whiteUserId === socket.userId ? 'white' : 'black',
            );
        })();

        socket.on('gameDoesNotExist', () => {
            window.location.href = '/game';
        });

        onBeforeUnmount(() => {
            Socket.disconnect(`game-${this.$route.params.id}`);
        });

        return data;
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
