<template>
    <div>
        <ul>
            <li v-for="(message, i) in chat.messages" :key="i">
                {{ message.sender || 'me' }}: {{ message.text }}
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
import { ref } from 'vue';
import ChatJs from '@/components/Chat.js';

const newMessage = ref('');

export default {
    data() {
        const chat = ChatJs.getInstance();

        return {
            newMessage,
            chat,
        };
    },
    methods: {
        sendMessage() {
            if (newMessage.value.trim() !== '') {
                const message = {
                    text: newMessage.value.trim(),
                };
                this.chat.sendMessage(message);
                newMessage.value = '';
            }
        },
    },
};
</script>

<style scoped>
/* Add custom styles for your chat component */
</style>
