<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Stripe from '@/views/Stripe.vue';
import Success from '@/views/Success.vue';
import Error from '@/views/Error.vue';
import Chat from "@/components/Chat.vue";
import Chat from '@/components/Chat.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import Stripe from '@/views/Stripe.vue';
import Success from '@/views/Success.vue';
import Error from '@/views/Error.vue';
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <Login />
            <Login />
            <br />
            <Register />
            <br />
            <Stripe />
            <br />
            <Success />
            <br />
            <Error />
            <Chat />
                <br />
            <Stripe />
            <br />
            <Success />
            <br />
            <Error />
        </main>
    </section>

</template>
