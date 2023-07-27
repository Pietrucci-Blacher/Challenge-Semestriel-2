<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Chat from '@/components/Chat.vue';
import VueTypedJs from 'vue-typed-js';
import VueWriter from 'vue-writer';

import Navbar from '@/components/Navbar/Navbar.vue';
import { onMounted, ref, toRefs } from 'vue';

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

const isUserAuthenticated = ref(false);
const showLoginModal = ref(false);

onMounted(() => {
    document.addEventListener('click', closeModalOnBackgroundClick);
});

function closeModalOnBackgroundClick(event) {
    console.log('event', event);
    const modalBg = document.querySelector('.modal-bg');
    if (modalBg && !modalBg.contains(event.target)) {
        showLoginModal.value = false;
    }
}
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main class="w-full h-screen">
            <section>
                <div
                    class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24"
                >
                    <div class="flex flex-wrap items-center mx-auto max-w-7xl">
                        <div class="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                            <div>
                                <div class="relative w-full max-w-lg">
                                    <div
                                        class="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                                    ></div>

                                    <div
                                        class="absolute rounded-full bg-[#f3f4f6] -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                                    ></div>
                                    <div class="relative">
                                        <img
                                            class="object-cover object-center mx-auto rounded-lg shadow-2xl"
                                            alt="hero"
                                            src="/images/board.webp"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0"
                        >
                            <span
                                class="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase"
                            >
                                Pas qu'un simple site d'échecs
                            </span>
                            <h1
                                class="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl"
                            >
                                Chess . io
                            </h1>
                            <p
                                class="mb-8 text-base leading-relaxed text-left text-gray-500"
                            >
                                <vue-writer
                                    class="font-semibold"
                                    :array="[
                                        'Un site incroyable par une communauté de passionés',
                                        'Des parties de folies',
                                        'Des joueurs de haut niveau',
                                    ]"
                                    :interval="500"
                                    :typeSpeed="400"
                                ></vue-writer>
                            </p>
                            <div class="mt-0 lg:mt-6 max-w-7xl sm:flex gap-x-5">
                                <div class="mt-3 rounded-lg sm:mt-0">
                                    <button
                                        class="items-center block px-10 py-4 text-base font-medium text-center text-black transition duration-500 ease-in-out transform bg-white shadow-md rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Register
                                    </button>
                                </div>
                                <div class="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                                    <button
                                        @click="showLoginModal = true"
                                        class="items-center block px-10 py-4 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform bg-white shadow-md rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <!--        <Login
                    :showModal="showLoginModal"
                    @closeModal="showLoginModal = false"
                />-->

        <!--        <Register />-->
    </section>
</template>
