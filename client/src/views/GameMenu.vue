<script setup>
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <div>
            <div>
                <a href="/game">Local</a>
            </div>
            <div>
                <a href="">Online</a>
            </div>
        </div>
    </section>
</template>
