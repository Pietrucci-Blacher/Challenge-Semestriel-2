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
                        <button @click="sortUsers('id')">
                            Id signalement
                            <font-awesome-icon
                                v-if="sortProperty === 'id'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-3 py-3">
                        <button @click="sortUsers('email')">
                            Username
                            <font-awesome-icon
                                v-if="sortProperty === 'email'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortUsers('username')">
                            Message
                            <font-awesome-icon
                                v-if="sortProperty === 'username'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-3 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in sortedUsers"
                    :key="user.id"
                    class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {{ user.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.username }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.role }}
                    </td>
                    <td class="px-6 py-4">
                        <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            @click="handleEdit(user)"
                            >Edit</a
                        >
                        <button
                            class="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                            @click="handleDelete(user.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { getReportedComments } from '@/utils/admin';
let reportedComments = ref([]);
let sortProperty = ref('id');

reportedComments.value = await getReportedComments();
console.log(reportedComments);
</script>
