<template>
    <div>
        <ul>
            <li v-for="message in messages" :key="message.id">
                {{ message.text }}
            </li>
        </ul>

        <form @submit.prevent="sendMessage">
            <input
                type="text"
                v-model="newMessage"
                placeholder="Type your message"
            />
            <button type="submit">Send</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Socket from '@/utils/socket.js';

export default {
    setup() {
        const socket = Socket.connect();

        const messages = ref([]);
        const newMessage = ref('');

        const sendMessage = () => {
            if (newMessage.value.trim() !== '') {
                const message = {
                    text: newMessage.value.trim(),
                };
                messages.value.push(message);
                socket.emit('chat message', message);
                newMessage.value = '';
            }
        };

        onMounted(() => {
            socket.on('message', (message) => {
                messages.value.push(message);
            });
        });

        onBeforeUnmount(() => {
            socket.disconnect();
        });

        return {
            messages,
            newMessage,
            sendMessage,
        };
    },
};
</script>

<style scoped>
/* Add custom styles for your chat component */
</style>
