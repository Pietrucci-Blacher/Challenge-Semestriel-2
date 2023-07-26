<template>
    <div>
        <div v-if="showNotification" :class="notificationClasses">
            <div class="toast-content">
                <div :class="iconClasses">
                    <font-awesome-icon
                        v-if="type === 'success'"
                        class="text-white"
                        :icon="['fas', 'check-circle']"
                    ></font-awesome-icon>
                    <font-awesome-icon
                        v-else-if="type === 'error'"
                        class="text-white"
                        :icon="['fas', 'exclamation-circle']"
                    ></font-awesome-icon>
                    <font-awesome-icon
                        v-else
                        class="text-white"
                        :icon="['fas', 'info-circle']"
                    ></font-awesome-icon>
                </div>
                <div class="message">
                    <p class="font-semibold" :class="titleClasses">
                        {{ title }}
                    </p>
                    <p class="text">{{ message }}</p>
                </div>
                <div class="close" @click="dismissNotification">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
            <div class="progress" :class="{ active: timerIsActive }"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';

const { type, title, message } = defineProps(['type', 'title', 'message']);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheckCircle,
    faExclamationCircle,
    faInfoCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faExclamationCircle, faInfoCircle, faTimes);

const showNotification = ref(false);
const timerIsActive = ref(false);
let timer1;
let timer2;

const notificationClasses = computed(() => ({
    toast: true,
    active: showNotification.value,
}));

const iconClasses = computed(() => {
    const classes = {
        check: true,
    };

    if (type === 'success') {
        classes['bg-emerald-500'] = true;
    } else if (type === 'error') {
        classes['bg-red-500'] = true;
    } else {
        classes['bg-blue-500'] = true;
    }

    return classes;
});

const titleClasses = computed(() => {
    const classes = {
        'font-semibold': true,
    };

    if (type === 'success') {
        classes['text-emerald-500'] = true;
        classes['dark:text-emerald-400'] = true;
    } else if (type === 'error') {
        classes['text-red-500'] = true;
        classes['dark:text-red-400'] = true;
    } else {
        classes['text-blue-500'] = true;
        classes['dark:text-blue-400'] = true;
    }

    return classes;
});

const showToast = () => {
    showNotification.value = true;
    timerIsActive.value = true;

    timer1 = setTimeout(() => {
        dismissNotification();
    }, 5000);

    timer2 = setTimeout(() => {
        timerIsActive.value = false;
    }, 5300);
};

const dismissNotification = () => {
    showNotification.value = false;

    setTimeout(() => {
        timerIsActive.value = false;
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
};

// Show the toast when the component is mounted
onMounted(() => {
    showToast();
});
</script>

<style>
@keyframes progress {
    100% {
        right: 100%;
    }
}

.toast {
    position: absolute;
    width: 20%;
    top: 25px;
    right: 30px;
    border-radius: 12px;
    padding: 10px 20px 10px 15px;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #f5f5f5;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast.active {
    transform: translateX(0%);
}

.toast .toast-content {
    display: flex;
    align-items: center;
}

.toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 35px;
    font-size: 20px;
    border-radius: 50%;
}

.toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}

.message .text {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
}

.message .text.text-1 {
    font-weight: 600;
    color: #333;
}

.toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
}

.toast .close:hover {
    opacity: 1;
}

.toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
}

.toast .progress:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #4070f4;
}

.progress.active:before {
    animation: progress 5s linear forwards;
}

@media (max-width: 768px) {
    .toast {
        width: 80%; /* Adjust the width for smaller screens */
        right: 10px; /* Adjust the position for smaller screens */
    }

    .toast .toast-content {
        flex-direction: column;
    }

    .toast-content .message {
        margin: 10px 0;
    }

    .toast .close {
        top: 5px; /* Adjust the position for smaller screens */
        right: 5px; /* Adjust the position for smaller screens */
    }
}
</style>
