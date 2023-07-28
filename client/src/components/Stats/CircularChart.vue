<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Title, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { getInfosPlayedParties } from '@/utils/stats';

ChartJS.register(Title, ArcElement, Tooltip, Legend);

export default {
    name: 'PieChart',
    components: { Pie },
    data() {
        return {
            blackCount: 0,
            whiteCount: 0,
        };
    },
    computed: {
        chartData() {
            return {
                labels: ['White Side', 'Black Side'],
                datasets: [
                    {
                        backgroundColor: ['#f5f5f5', '#000000'],
                        data: [this.whiteCount, this.blackCount],
                    },
                ],
            };
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Played Parties By Side',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                },
            };
        },
    },
    async mounted() {
        const data = await getInfosPlayedParties();
        this.blackCount = data.black || 0;
        this.whiteCount = data.white || 0;
    },
};
</script>
