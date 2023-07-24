<script setup>
import UserItem from '@/components/Users/UserItem.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-sreen">
            <UserItem user="" />
        </main>
    </section>
</template>

<style scoped></style>
