<template>
    <h2 class="text-2xl p-3 font-semibold">Liste des Utilisateurs</h2>
    <br />
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortUsers('id')">
                            Id
                            <font-awesome-icon
                                v-if="sortProperty === 'id'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortUsers('email')">
                            Email
                            <font-awesome-icon
                                v-if="sortProperty === 'email'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortUsers('username')">
                            Username
                            <font-awesome-icon
                                v-if="sortProperty === 'username'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <button @click="sortUsers('role')">
                            Role
                            <font-awesome-icon
                                v-if="sortProperty === 'role'"
                                :icon="sortIcon"
                            />
                        </button>
                    </th>
                    <th scope="col" class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in paginatedUsers"
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
                    <Modal v-if="showModalEdit" title="User Edit">
                        <hr />
                        <br />
                        <div class="flex flex-col space-y-10">
                            <div class="flex items-center gap-x-8">
                                <label class="font-bold" for="username"
                                    >Username</label
                                >
                                <input
                                    type="text"
                                    v-model="userEdit.username"
                                    class="border border-gray-300 p-2 rounded-lg w-31"
                                />
                            </div>
                            <br />
                            <div class="flex items-center gap-x-14">
                                <label class="font-bold" for="email"
                                    >Email</label
                                >
                                <input
                                    type="text"
                                    v-model="userEdit.email"
                                    class="border border-gray-300 p-2 rounded-lg w-31"
                                />
                            </div>
                            <br />
                            <div class="flex items-center gap-x-8">
                                <label class="font-bold" for="firstname"
                                    >Firstname</label
                                >
                                <input
                                    type="text"
                                    v-model="userEdit.firstname"
                                    class="border border-gray-300 p-2 rounded-lg w-31"
                                />
                            </div>
                            <br />
                            <div class="flex items-center gap-x-8">
                                <label class="font-bold" for="lastname"
                                    >Lastname</label
                                >
                                <input
                                    type="text"
                                    v-model="userEdit.lastname"
                                    class="border border-gray-300 p-2 rounded-lg w-31"
                                />
                            </div>
                            <br />
                            <div class="flex items-center gap-x-14">
                                <label class="font-bold" for="email"
                                    >Email</label
                                >
                                <input
                                    type="text"
                                    v-model="userEdit.email"
                                    class="border border-gray-300 p-2 rounded-lg w-31"
                                />
                            </div>
                            <br />
                            <div class="flex flex-row justify-end space-x-4">
                                <button
                                    @click="handleSubmit(user)"
                                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Validate
                                </button>

                                <button
                                    @click="hideModal"
                                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                </tr>
            </tbody>
        </table>
    </div>
    <nav v-if="totalPages > 1" class="flex items-center justify-between mt-4">
        <div>
            <button
                class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getUsers } from '@/utils/admin';
import { userDataDelete, userDataUpdate } from '@/utils/user';
import Modal from '@/components/Modal.vue';
import Notification from '@/components/Notification.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowUp, faArrowDown);
const sortProperty = ref('id');
const sortOrder = ref(1);

const users = ref([]);
const showNotificationUpdateDatas = ref(false);
const showNotificationUserDelete = ref(false);
const userEdit = ref(null);

onMounted(async () => {
    users.value = await getUsers();
});

const showModalEdit = ref(false);

const handleEdit = (user) => {
    showModalEdit.value = true;
    userEdit.value = { ...user };
};

const handleSubmit = async (user) => {
    await userDataUpdate(user.id, userEdit);
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

const sortUsers = (property) => {
    if (sortProperty.value === property) {
        sortOrder.value *= -1;
    } else {
        sortProperty.value = property;
        sortOrder.value = 1;
    }
};

const sortIcon = computed(() => {
    return sortOrder.value === 1 ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
});

const sortedUsers = computed(() => {
    const property = sortProperty.value;
    const order = sortOrder.value;

    // Clone the users array to avoid modifying the original data
    const sorted = [...users.value];

    // Perform sorting based on the selected property and order
    sorted.sort((a, b) => {
        if (a[property] < b[property]) return -1 * order;
        if (a[property] > b[property]) return order;
        return 0;
    });

    return sorted;
});

const itemsPerPage = 8;
const currentPage = ref(1);

const totalItems = computed(() => users.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedUsers.value.slice(start, end);
});

const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
};
</script>
