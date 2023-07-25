<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <img
            class="emoji-404"
            loading="lazy"
            src="/images/svg/knight.svg"
            alt="Logo"
            width="226"
            height="249.135"
        />
        <div class="mt-12 text-center leading-4">
            <span class="text-gray-500 text-6xl block"><span>4 0 4</span></span>
            <br />
            <span class="text-gray-500 text-xl"
                >Sorry, We couldn't find what you are looking for!</span
            >
        </div>
        <div class="mt-6 text-center">
            <router-link
                to="/"
                class="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
                >Go back</router-link
            >
        </div>
    </div>
</template>

<script></script>

<style scoped>
.emoji-404 {
    position: relative;
    transform-origin: center;
    transition: transform 0.3s ease-in-out;
    animation:
        revertRotation 3s ease-out,
        neutralMove 3s infinite ease-in-out;
}

.emoji-404:hover {
    animation: bounceAndSpin 5s infinite ease-in-out;
}

@keyframes bounceAndSpin {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(720deg);
    }
    50% {
        transform: rotate(1440deg);
    }
    75% {
        transform: rotate(2160deg);
    }
    100% {
        transform: rotate(2880deg);
    }
}

@keyframes neutralMove {
    0% {
        transform: translateY(0);
    }
    33% {
        transform: translateY(20px);
    }
    66% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
