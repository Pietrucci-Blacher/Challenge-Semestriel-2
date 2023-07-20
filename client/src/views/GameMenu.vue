<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />

        <div class="w-full fade-in-container" v-if="showContent">
            <div
                class="flex flex-col items-center mt-16 text-4xl font-bold mb-8"
            >
                Select a Game Mode
            </div>

            <div class="mb-4 link-button">
                <font-awesome-icon :icon="['fas', 'dumbbell']" class="mr-2" />
                <router-link
                    to="/game/local"
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                    Local
                </router-link>
            </div>

            <div class="link-button">
                <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
                <router-link
                    to="/game/zoieurzelkjsdfhozeir"
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                    Online
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import Socket from '@/utils/socket.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the icons you need
import { faDumbbell, faGlobe } from '@fortawesome/free-solid-svg-icons';

library.add(faGlobe, faDumbbell);
const socket = Socket.connect();
const isUserAuthenticated = true; // Replace with your actual authenticated state logic

const showContent = ref(false);

onMounted(() => {
    // Trigger the fade-in effect after a short delay
    setTimeout(() => {
        showContent.value = true;
    }, 100);
});
</script>

<style>
.fade-in-container {
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.fade-in-container.fade-in-active {
    opacity: 1;
}

.link-button {
    display: flex;
    align-items: center;
}

/* Adjust the font-size and color of the icons */
.link-button .icon {
    font-size: 18px;
    color: white;
    width: 24px;
    text-align: center;
}
</style>
