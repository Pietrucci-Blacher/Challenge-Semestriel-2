<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Chat from '@/components/Chat.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import Notification from '@/views/Notification.vue';

const clientIdDiscord = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUriDiscord = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const responseTypeDiscord = 'code';
const scopeDiscord = 'identify email';
const LoginUrlDiscord = `https://discord.com/api/oauth2/authorize?client_id=${clientIdDiscord}&redirect_uri=${encodeURIComponent(
    redirectUriDiscord,
)}&response_type=${responseTypeDiscord}&scope=${encodeURIComponent(
    scopeDiscord,
)}`;

const clientIdGoogle = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUriGoogle = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const responseTypeGoogle = 'code';
const scopeGoogle = 'openid email profile';
const LoginUrlGoogle = `https://accounts.google.com/o/oauth2/v2/auth/userinfo.profile?client_id=${clientIdGoogle}&redirect_uri=${encodeURIComponent(
    redirectUriGoogle,
)}&response_type=${responseTypeGoogle}&scope=${encodeURIComponent(
    scopeGoogle,
)}`;
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <Notification
                type="success"
                title="Success"
                message="Your account was registered!"
            />
            <Login />
            <br />
            <Register />
            <Chat />
            <a :href="LoginUrlDiscord">Login with Discord</a>
            <br />
            <a :href="LoginUrlGoogle">Login with Google</a>
        </main>
    </section>
</template>
