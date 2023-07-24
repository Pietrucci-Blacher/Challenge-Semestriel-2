<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Username</th>
                    <th scope="col" class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in users"
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
import { onMounted, ref, defineEmits } from 'vue';
import { getUsers } from '@/utils/admin';
import { userDataDelete } from '@/utils/user';

// Assuming you have a reactive ref for users data
const users = ref([]);

onMounted(async () => {
    users.value = await getUsers();
});

defineEmits(['delete', 'select']);

const handleEdit = (user) => {
    emit('select', user);
};

const handleDelete = async (userId) => {
    console.log(userId);
    // Assuming you have a method to delete the user with the given userId
    await userDataDelete(userId);
};
</script>
