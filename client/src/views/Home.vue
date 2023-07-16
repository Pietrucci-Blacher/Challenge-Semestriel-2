<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Chat from '@/components/Chat.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import Notification from '@/views/Notification.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <Notification
                type="success"
                title="Success"
                message="Your account was registered!"
            />
            <Login />
            <br />
            <Register />
            <Chat />
        </main>
    </section>
</template>
