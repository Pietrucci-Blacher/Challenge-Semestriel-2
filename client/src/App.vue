<script setup>
import { ref, computed } from 'vue';
import Home from '@/views/Home.vue';
import NotFound from '@/views/errors/404.vue';

const routes = {
    '/': Home,
};

const currentPath = ref(window.location.pathname);
window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname;
});

const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound;
});
</script>

<template>
    <component :is="currentView || NotFound" />
</template>
