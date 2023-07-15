<template>
    <div
        v-if="showNotification"
        :class="notificationClasses"
        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
        <div :class="iconClasses" class="flex items-center justify-center w-12">
            <font-awesome-icon
                v-if="type === 'success'"
                :icon="['fas', 'check-circle']"
                class="text-white"
            />
            <font-awesome-icon
                v-else-if="type === 'error'"
                :icon="['fas', 'exclamation-circle']"
                class="text-white"
            />
            <font-awesome-icon
                v-else
                :icon="['fas', 'info-circle']"
                class="text-white"
            />
        </div>
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span :class="titleClasses">{{ title }}</span>
                <p class="text-sm" :class="messageClasses">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheckCircle,
    faExclamationCircle,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faExclamationCircle, faInfoCircle);

export default {
    components: {
        FontAwesomeIcon,
    },
    props: {
        type: {
            type: String,
            required: true,
            validator: (value) =>
                ['success', 'error', 'information'].includes(value),
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showNotification: true,
        };
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        startTimer() {
            setTimeout(() => {
                this.dismissNotification();
            }, 5000);
        },
        dismissNotification() {
            this.showNotification = false;
        },
    },
    computed: {
        notificationClasses() {
            return {
                'bg-white': true,
                'dark:bg-gray-800': true,
                'rounded-lg': true,
                'shadow-md': true,
                flex: true,
                'w-full': true,
                'max-w-sm': true,
                'overflow-hidden': true,
            };
        },
        iconClasses() {
            const classes = {
                flex: true,
                'items-center': true,
                'justify-center': true,
                'w-12': true,
            };
            if (this.type === 'success') {
                classes['bg-emerald-500'] = true;
            } else if (this.type === 'error') {
                classes['bg-red-500'] = true;
            } else {
                classes['bg-blue-500'] = true;
            }
            return classes;
        },
        titleClasses() {
            const classes = {
                'font-semibold': true,
            };
            if (this.type === 'success') {
                classes['text-emerald-500'] = true;
                classes['dark:text-emerald-400'] = true;
            } else if (this.type === 'error') {
                classes['text-red-500'] = true;
                classes['dark:text-red-400'] = true;
            } else {
                classes['text-blue-500'] = true;
                classes['dark:text-blue-400'] = true;
            }
            return classes;
        },
        messageClasses() {
            return {
                'text-sm': true,
                'text-gray-600': true,
                'dark:text-gray-200': true,
            };
        },
    },
};
</script>
