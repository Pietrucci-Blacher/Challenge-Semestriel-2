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
                                    <svg
                                        class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path
                                            d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                                        />
                                        <path
                                            d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                                        />
                                    </svg>
                                    <span class="ml-3">Mon profil</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#notifications"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
                                        />
                                        <path
                                            d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
                                        />
                                        <path
                                            d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
                                        />
                                    </svg>
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
                                    <svg
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
                                        />
                                        <path
                                            d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
                                        />
                                        <path
                                            d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
                                        />
                                    </svg>
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
                                    <svg
                                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
                                        />
                                        <path
                                            d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
                                        />
                                        <path
                                            d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
                                        />
                                    </svg>
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
        <div class="flex flex-col overflow-auto">
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
                                type="button"
                                class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Profile
                            </button>
                        </div>
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
                                            <input
                                                id="triggerNotification"
                                                type="checkbox"
                                                class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                            />
                                        </div>
                                        <div class="ml-3 text-sm leading-5">
                                            <label
                                                for="triggerNotification"
                                                class="font-medium text-gray-700"
                                                >Trigger a test
                                                notification</label
                                            >
                                            <p class="text-gray-500">
                                                Check this box to trigger a test
                                                notification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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
                            <div
                                class="grid grid-cols-1 gap-4 sm:grid-cols-2 shadow-md"
                            >
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
                                            class="form-input block w-full sm:text-sm sm:leading-5"
                                            placeholder="Enter your old password"
                                        />
                                    </div>
                                </div>
                                <br />
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
                                            class="form-input block w-full sm:text-sm sm:leading-5"
                                            placeholder="Enter your new password"
                                        />
                                    </div>
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

<script>
import { getUserData, userDataDelete, userDataUpdate } from '@/utils/user';
import { onMounted, reactive } from 'vue';

export default {
    setup() {
        // Create a reactive object to hold user data
        const userInfos = reactive({
            id: '',
            email: '',
            username: '',
        });

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
                console.log('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }

        async function deleteUserProfile() {
            try {
                await userDataDelete(userInfos.id, true);
                console.log('Profile deleted successfully!');
            } catch (error) {
                console.error('Error deleting profile:', error);
            }
        }

        return { userInfos, updateUserProfile, deleteUserProfile };
    },
};
</script>
