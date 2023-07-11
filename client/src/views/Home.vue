<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Chat from '@/components/Chat.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
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
