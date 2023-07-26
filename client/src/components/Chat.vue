<template>
    <div class="h-screen flex items-center justify-center chat">
        <div class="bg-gray-100 p-4 h-full overflow-y-auto">
            <ul class="space-y-2">
                <li
                    v-for="(message, i) in chat.messages"
                    :key="i"
                    :class="['flex', getMessageClass(message)]"
                >
                    <span v-if="message.sender === 'me'" class="text-green-600"
                        >Me:</span
                    >
                    <span v-else class="text-gray-600"
                        >{{ message.sender || 'me' }}:</span
                    >
                    {{ message.text }}
                </li>
            </ul>

            <form @submit.prevent="sendMessage" class="flex mt-4">
                <input
                    type="text"
                    v-model="newMessage"
                    placeholder="Type your message"
                    class="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
                <button
                    type="submit"
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
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
        getMessageClass(message) {
            return message.sender === 'me'
                ? 'flex justify-end'
                : 'flex justify-start';
        },
    },
};
</script>

<style scoped>
.chat {
    width: 100%;
}
</style>
