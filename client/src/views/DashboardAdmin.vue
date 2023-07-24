<script>
import UserItem from '@/components/Users/UserItem.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { getUsers } from '@/utils/admin';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { Navbar, UserItem },
    methods: { getUsers },
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <UserItem />
        </main>
    </section>
</template>

<style scoped></style>
