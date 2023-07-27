<template>
    <div class="h-screen flex items-center justify-center chat">
        <div class="bg-gray-100 p-4 h-full max-w-md flex flex-col">
            <div ref="messageContainer" class="flex-grow overflow-y-auto">
                <ul class="space-y-2">
                    <li
                        v-for="(message, i) in chat.messages"
                        :key="i"
                        :class="['flex', getMessageClass(message)]"
                        ref="messages"
                    >
                        <span class="text-gray-600">
                            <button
                                @click="reportMessage(message.id)"
                                v-if="message.sender"
                                class="text-red-600"
                            >
                                report
                            </button>
                            {{ message.sender || 'me' }}:
                        </span>
                        {{ message.text }}
                    </li>
                </ul>
            </div>

            <form @submit.prevent="sendMessage" class="mt-4 ml-2 mb-2 mr-2">
                <div class="flex">
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
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
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
            return !message.sender ? 'flex justify-end' : 'flex justify-start';
        },
        reportMessage(id) {
            this.chat.reportMessage(id);
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messageContainer;
                container.scrollTop = container.scrollHeight;
            });
        },
    },
    watch: {
        'chat.messages': 'scrollToBottom', // Watch for changes in messages and scroll to bottom
    },
    mounted() {
        this.scrollToBottom(); // Scroll to the bottom when the component is mounted
    },
    updated() {
        const messages = this.$refs.messages;
        if (messages && messages.length > 0) {
            messages[messages.length - 1].scrollIntoView();
        }
    },
};
</script>

<style scoped>
.chat {
    width: 100%;
}
</style>
