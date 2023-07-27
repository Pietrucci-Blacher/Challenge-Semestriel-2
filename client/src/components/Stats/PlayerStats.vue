<template>
    <div class="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col space-y-4">
            <div
                class="bg-white rounded-lg text-center shadow transform transition-all p-5"
            >
                <h3 class="text-sm leading-6 font-medium text-gray-400">
                    Total Played parties
                </h3>
                <p class="text-3xl font-bold text-black">{{ parties.total }}</p>
            </div>

            <div
                class="bg-white rounded-lg text-center shadow transform transition-all p-5"
            >
                <h3 class="text-sm leading-6 font-medium text-gray-400">
                    Win Rate
                </h3>
                <p class="text-3xl font-bold text-black">
                    {{ formattedWinRate }}
                </p>
            </div>

            <div
                class="bg-white rounded-lg text-center shadow transform transition-all p-5"
            >
                <h3 class="text-sm leading-6 font-medium text-gray-400">
                    Avg. Click Rate
                </h3>
                <p class="text-3xl font-bold text-black">24.57%</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { getInfosPlayedParties } from '@/utils/stats';

// Define reactive object
const parties = reactive({ total: 0, win: 0 });

// Fetch the data after the component is mounted
onMounted(async () => {
    const data = await getInfosPlayedParties();
    Object.assign(parties, data);
});

// Computed property to calculate and format the winRate
const formattedWinRate = computed(() => {
    if (!parties.win) {
        return '0.00%';
    }

    const winRate = (parties.win / parties.total) * 100;
    return winRate.toFixed(2) + '%';
});
</script>
