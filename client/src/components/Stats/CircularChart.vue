<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    name: 'PieChart', // Fixed the component name
    components: { Pie },
    computed: {
        chartData() {
            return {
                // Added return statement to return the chartData object
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'], // Fixed the labels array
                datasets: [
                    {
                        backgroundColor: [
                            '#41B883',
                            '#E46651',
                            '#00D8FF',
                            '#DD1B16',
                        ],
                        data: [40, 20, 80, 10],
                    },
                ],
            };
        },
        chartOptions() {
            return {
                // Added return statement to return the chartOptions object
                responsive: true,
            };
        },
    },
};
</script>
