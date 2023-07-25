<script setup>
defineProps(['isUserAuthenticated']);
import { defineComponent } from 'vue';
import Userinfo from '@/components/Users/Userinfos.vue';
import Navbar from '@/components/Navbar/Navbar.vue';

defineComponent({
    components: { Navbar, Userinfo },
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <Userinfo />
    </section>
</template>
