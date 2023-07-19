<script setup>
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <div>
            <div><a href="/game/local">Local</a></div>
            <div @click="findGame">Online</div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'GameMenu',
    methods: {
        findGame() {
            console.log('find game');
        },
    },
};
</script>
