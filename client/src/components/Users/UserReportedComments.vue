<script setup>
import { computed, onMounted, ref } from 'vue';
import { getReportedComments } from '@/utils/admin';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowUp, faArrowDown);

const reportedComments = ref([]);

onMounted(async () => {
    reportedComments.value = await getReportedComments();
});

const sortProperty = ref('_id');
const sortOrder = ref(1);

const sortComments = (property) => {
    if (sortProperty.value === property) {
        sortOrder.value *= -1;
    } else {
        sortProperty.value = property;
        sortOrder.value = 1;
    }
};

const sortIcon = (property) => {
    if (sortProperty.value === property) {
        return sortOrder.value === 1 ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    }
    return '';
};

const itemsPerPage = 10;
const currentPage = ref(1);

const totalItems = computed(() => reportedComments.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const sorted = sortCommentsArray(
        reportedComments.value,
        sortProperty.value,
        sortOrder.value,
    );
    return sorted.slice(start, end);
});

const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
};

const sortCommentsArray = (comments, property, order) => {
    const sorted = [...comments];
    sorted.sort((a, b) => {
        if (a[property] < b[property]) return -1 * order;
        if (a[property] > b[property]) return order;
        return 0;
    });
    return sorted;
};
</script>

<template>
    <h2 class="text-2xl font-semibold p-3">Liste des commentaires signalés</h2>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-3 py-3">
                        <button @click="sortComments('_id')">
                            Id signalement
                            <font-awesome-icon
                                v-if="sortProperty === '_id'"
                                :icon="sortIcon('_id')"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-3 py-3">
                        <button @click="sortComments('gameId')">
                            Id Game
                            <font-awesome-icon
                                v-if="sortProperty === 'gameId'"
                                :icon="sortIcon('gameId')"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-3 py-3">
                        <button @click="sortComments('sender')">
                            Username
                            <font-awesome-icon
                                v-if="sortProperty === 'sender'"
                                :icon="sortIcon('sender')"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortComments('text')">
                            Message
                            <font-awesome-icon
                                v-if="sortProperty === 'text'"
                                :icon="sortIcon('text')"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-3 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="reportedComment in paginatedComments"
                    :key="reportedComment._id"
                    class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                    <td class="px-6 py-4">
                        {{ reportedComment._id }}
                    </td>
                    <td class="px-6 py-4">
                        {{ reportedComment.gameId }}
                    </td>
                    <td class="px-6 py-4">
                        {{ reportedComment.sender }}
                    </td>
                    <td class="px-6 py-4">
                        {{ reportedComment.text }}
                    </td>
                    <td class="px-6 py-4">
                        <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            @click="handleEdit(reportedComment.sender)"
                            >Bannir</a
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <nav v-if="totalPages > 1" class="flex items-center justify-between mt-4">
        <div>
            <button
                class="px-3 mr-5 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
            >
                Précédent
            </button>

            <button
                class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
            >
                Suivant
            </button>
        </div>

        <div class="text-sm font-semibold text-gray-700">
            Page {{ currentPage }} sur {{ totalPages }}
        </div>
    </nav>
</template>
