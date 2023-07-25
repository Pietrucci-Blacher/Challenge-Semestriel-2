<template>
    <div class="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col space-y-4">
            <div
                class="bg-white rounded-lg text-center shadow transform transition-all p-5"
            >
                <h3 class="text-sm leading-6 font-medium text-gray-400">
                    Total Players
                </h3>
                <p class="text-3xl font-bold text-black">{{ getNbUsers() }}</p>
            </div>
            <div
                class="bg-white rounded-lg text-center shadow transform transition-all p-5"
            >
                <h3 class="text-sm leading-6 font-medium text-gray-400">
                    Avg. Open Rate
                </h3>
                <p class="text-3xl font-bold text-black">58.16%</p>
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
import { getNbUsers } from '@/utils/stats';
</script>
