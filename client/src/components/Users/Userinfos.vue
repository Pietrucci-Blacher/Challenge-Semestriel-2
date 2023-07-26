<script setup>
import {
    getUserData,
    UserChangePassword,
    userDataDelete,
    userDataUpdate,
} from '@/utils/user';
import { onMounted, reactive, ref } from 'vue';
import Notification from '@/components/Notification.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faUser,
    faLock,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faCheck, faLock, faTrash);

const showNotificationProfileUpdated = ref(false);
const showTestNotification = ref(false);
const userInfos = reactive({
    id: '',
    email: '',
    username: '',
});
const oldPassword = ref('');
const newPassword = ref('');

const handleTestNotification = () => {
    showTestNotification.value = true;
    setTimeout(() => {
        showTestNotification.value = false;
    }, 5000);
};

// Fetch user data when the component is mounted
onMounted(async () => {
    const userData = await getUserData();
    userInfos.id = userData.id;
    userInfos.firstname = userData.firstname;
    userInfos.lastname = userData.lastname;
    userInfos.email = userData.email;
    userInfos.username = userData.username;
});

async function updateUserProfile() {
    try {
        await userDataUpdate(userInfos.id, userInfos);
        showNotificationProfileUpdated.value = true;
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

async function userPasswordUpdate(oldPassword, newPassword) {
    try {
        await UserChangePassword(oldPassword, newPassword);
        showNotificationProfileUpdated.value = true;
    } catch (error) {
        console.error('Error updating password:', error);
    }
}

async function deleteUserProfile() {
    try {
        await userDataDelete(userInfos.id, true);
    } catch (error) {
        console.error('Error deleting profile:', error);
    }
}
</script>

<template>
    <section class="flex overflow-hidden">
        <div>
            <aside>
                <button
                    data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar"
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span class="sr-only">Open sidebar</span>
                    <svg
                        class="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>

                <aside
                    id="sidebar-multi-level-sidebar"
                    class="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div
                        class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
                    >
                        <ul class="space-y-2 font-medium">
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <font-awesome-icon
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        :icon="['fas', 'user']"
                                    ></font-awesome-icon>
                                    <span class="ml-3">Mon profil</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#notifications"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <font-awesome-icon
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        :icon="['fas', 'check']"
                                    ></font-awesome-icon>
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Notifications</span
                                    >
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#password"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <font-awesome-icon
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        :icon="['fas', 'lock']"
                                    ></font-awesome-icon>
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Mot de passe</span
                                    >
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#deleteAccount"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <font-awesome-icon
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        :icon="['fas', 'trash']"
                                    ></font-awesome-icon>
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Supression du compte</span
                                    >
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </aside>
        </div>
        <div class="flex flex-col overflow-auto w-screen">
            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div id="#profil" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Profile
                        </h3>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                            This information will be displayed publicly so be
                            careful what you share.
                        </p>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div class="mt-6">
                                <label
                                    class="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Photo
                                </label>
                                <div class="mt-2 flex items-center">
                                    <span
                                        class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                                    >
                                        <svg
                                            class="h-full w-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </span>
                                    <span class="ml-5 rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                                        >
                                            Change
                                        </button>
                                    </span>
                                </div>
                                <br />
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="first_name"
                                            class="block text-sm font-medium leading-5 text-gray-700"
                                            >First name</label
                                        >
                                        <input
                                            id="first_name"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            v-model="userInfos.firstname"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="last_name"
                                            class="block text-sm font-medium leading-5 text-gray-700"
                                            >Last name</label
                                        >
                                        <input
                                            id="last_name"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            v-model="userInfos.lastname"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label
                                            for="email_address"
                                            class="block text-sm font-medium leading-5 text-gray-700"
                                            >Email address</label
                                        >
                                        <input
                                            id="email_address"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                            v-model="userInfos.email"
                                            disabled
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label
                                            class="block text-sm font-medium leading-5 text-gray-700"
                                            >Username</label
                                        >
                                        <input
                                            id="username"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            v-model="userInfos.username"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="mt-6">
                            <button
                                @click="updateUserProfile"
                                class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Profile
                            </button>
                        </div>
                        <Notification
                            v-if="showNotificationProfileUpdated"
                            title="Profile message"
                            message="Your profile has been updated successfully."
                        />
                    </div>
                </div>
            </div>
            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div
                    id="notifications"
                    class="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Notifications
                        </h3>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                            This section is about the notification system.
                        </p>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <form>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div class="col-span-2">
                                    <label
                                        class="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Disable Notifications
                                    </label>
                                    <div class="mt-1 flex items-start">
                                        <div class="flex items-center h-5">
                                            <input
                                                id="disableNotifications"
                                                type="checkbox"
                                                class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                            />
                                        </div>
                                        <div class="ml-3 text-sm leading-5">
                                            <label
                                                for="disableNotifications"
                                                class="font-medium text-gray-700"
                                                >Yes, disable
                                                notifications</label
                                            >
                                            <p class="text-gray-500">
                                                If checked, you won't receive
                                                any notifications.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-2">
                                    <label
                                        class="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Trigger Notification
                                    </label>
                                    <div class="mt-1 flex items-start">
                                        <div class="flex items-center h-5">
                                            <button
                                                id="triggerNotification"
                                                type="button"
                                                class="h-6 w-6 rounded-full shadow-md text-white bg-black"
                                                @click="handleTestNotification"
                                            ></button>
                                        </div>
                                        <div class="ml-3 text-sm leading-5">
                                            <label
                                                class="font-medium text-gray-700"
                                                >Trigger a test notification
                                            </label>
                                            <p class="text-gray-500">
                                                Click on black button to trigger
                                                a test notification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Notification
                v-if="showTestNotification"
                type="success"
                title="Test message"
                message="This is a test notification."
            />

            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div
                    id="password"
                    class="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Change Password
                        </h3>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                            This section allows you to change your password.
                        </p>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <form>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-">
                                <div class="col-span-2">
                                    <label
                                        for="oldPassword"
                                        class="block text-sm font-medium leading-5 text-gray-700"
                                        >Old Password</label
                                    >
                                    <div class="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="oldPassword"
                                            type="password"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            placeholder="Enter your old password"
                                            v-model="oldPassword"
                                        />
                                    </div>
                                </div>
                                <div class="col-span-2">
                                    <label
                                        for="newPassword"
                                        class="block text-sm font-medium leading-5 text-gray-700"
                                        >New Password</label
                                    >
                                    <div class="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="newPassword"
                                            type="password"
                                            class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-522"
                                            placeholder="Enter your new password"
                                            v-model="newPassword"
                                        />
                                    </div>
                                    <br />
                                    <button
                                        class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        @click="
                                            userPasswordUpdate(
                                                oldPassword,
                                                newPassword,
                                            )
                                        "
                                    >
                                        Mettre à jour le mot de passe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div
                    id="deleteAccount"
                    class="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Delete your account
                        </h3>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                            This section is about account deletion
                        </p>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <button
                            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="deleteUserProfile"
                        >
                            Delete my account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
