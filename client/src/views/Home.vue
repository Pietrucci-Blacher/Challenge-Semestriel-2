<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Chat from '@/components/Chat.vue';
import Navbar from '@/components/Navbar/Navbar.vue';

import { ref, onMounted, defineExpose } from 'vue';

const isUserAuthenticated = ref(false);

const checkAuthentication = async () => {
    try {
        const response = await fetch('/api/check-authentication');
        const data = await response.json();
        data.isAuthenticated = undefined;
        isUserAuthenticated.value = data.isAuthenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
};

onMounted(checkAuthentication);

defineExpose({
    isUserAuthenticated,
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <Login />
            <br />
            <Register />
            <Chat />
        </main>
    </section>
</template>
