<script setup>
import Navbar from '@/components/Navbar/Navbar.vue';
import Socket from '@/utils/socket.js';

const socket = Socket.connect();
console.log('socket', socket.id);
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <div>
            <div><a href="/game/local">Local</a></div>
            <div><a href="/game/zoieurzelkjsdfhozeir">Online</a></div>
        </div>
    </section>
</template>
