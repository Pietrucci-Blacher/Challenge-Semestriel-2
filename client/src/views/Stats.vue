<script setup>
defineProps(['isUserAuthenticated']);
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar/Navbar.vue';

defineComponent({
    components: { Navbar },
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
    </section>
</template>
