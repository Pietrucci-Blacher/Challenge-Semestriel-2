<script setup>
import BarChart from '@/components/Stats/CircularChart.vue';

defineProps(['isUserAuthenticated']);
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import PlayerStats from '@/components/Stats/PlayerStats.vue';

defineComponent({
    components: { Navbar },
});
</script>

<template>
    <section class="flex flex-row h-screen">
        <Navbar :isUserAuthenticated="isUserAuthenticated" />
        <main>
            <PlayerStats />
            <BarChart />
        </main>
    </section>
</template>
