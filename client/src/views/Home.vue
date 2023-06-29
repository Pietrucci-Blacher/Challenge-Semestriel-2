<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Stripe from '@/views/Stripe.vue';
import Success from '@/views/Success.vue';
import Error from '@/views/Error.vue';
</script>

<template>
    <Login />
    <br />
    <Register />
    <br />
    <Stripe />
    <br />
    <Success />
    <br />
    <Error />
</template>
