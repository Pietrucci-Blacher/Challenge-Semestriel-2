<script>
const isUserAuthenticated = ref(false);
import { defineComponent, ref } from 'vue';
import Userinfo from '@/components/Users/Userinfo.vue';
import Navbar from '@/components/Navbar/Navbar.vue';

export default defineComponent({
    components: { Navbar, Userinfo },
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <Userinfo />
        <section></section>
    </section>
</template>
