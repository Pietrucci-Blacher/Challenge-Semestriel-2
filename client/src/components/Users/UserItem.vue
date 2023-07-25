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
                    <Modal v-if="showModalEdit" title="User Edit">
                        <hr />
                        <br />
                        <div class="flex flex-col space-between">
                            <input
                                type="text"
                                v-model="user.username"
                                class="border border-gray-300 p-2 rounded-lg w-full"
                            />
                            <br />
                            <input
                                type="text"
                                v-model="user.email"
                                class="border border-gray-300 p-2 rounded-lg w-full"
                            />
                            <br />
                            <div>
                                <button
                                    @click="handleSubmit(user)"
                                    class="border border-gray-300 p-2 rounded-lg w-full mt-4"
                                >
                                    Edit
                                </button>

                                <button @click="hideModal">Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </tr>
            </tbody>
        </table>
        <Notification
            v-if="showNotificationUpdateDatas"
            title="Update"
            message="User updated"
            type="success"
            @close="showNotificationUpdateDatas = false"
        />
        <Notification
            v-if="showNotificationUserDelete"
            title="Delete"
            type="success"
            message="User deleted"
            @close="showNotificationUserDelete = false"
        />
        <Notification title="Delete" message="User deleted" />
    </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import { getUsers } from '@/utils/admin';
import { userDataDelete, userDataUpdate } from '@/utils/user';
import Modal from '@/components/Modal.vue';
import Notification from '@/components/Notification.vue';

const users = ref([]);
const showNotificationUpdateDatas = ref(false);
const showNotificationUserDelete = ref(false);

onMounted(async () => {
    users.value = await getUsers();
});

const showModalEdit = ref(false);

defineEmits(['delete', 'select']);

const handleEdit = (user) => {
    showModalEdit.value = true;
};

const handleSubmit = async (user) => {
    await userDataUpdate(user.id, user);
    hideModal();
    showNotificationUpdateDatas.value = true;
};

const hideModal = () => {
    showModalEdit.value = false;
};

const handleDelete = async (userId) => {
    await userDataDelete(userId);
    const index = users.value.findIndex((user) => user.id === userId);
    if (index !== -1) {
        users.value.splice(index, 1);
    }
    showNotificationUserDelete.value = true;
};
</script>
