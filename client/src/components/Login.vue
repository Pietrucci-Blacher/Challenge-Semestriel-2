<template>
    <Modal title="">
        <div
            class="flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-[50vh]"
        >
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2
                    class="mt-6 text-3xl font-extrabold text-center text-neutral-600"
                >
                    Sign in to your account
                </h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="px-4 py-8 sm:px-10">
                    <form
                        novalidate
                        class="space-y-6"
                        @submit.prevent="submitForm"
                    >
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div class="mt-1">
                                <input
                                    v-model="email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    required
                                    class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div class="mt-1">
                                <input
                                    v-model="password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                    class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';
import Modal from '@/components/Modal.vue';

export default {
    components: { Modal },
    setup() {
        const email = ref('');
        const password = ref('');

        function submitForm() {
            // Prepare request data
            const data = {
                email: email.value,
                password: password.value,
            };
            // Send login request
            let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
            let endpoint = `${url}/auth/login`;
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(async (response) => {
                    if (response.ok) {
                        // Successful login
                        const { accessToken, refreshToken } = JSON.parse(
                            await response.text(),
                        );

                        // Set the access token cookie with HttpOnly and Secure flags
                        Cookie.set('userAccessToken', accessToken, {
                            secure: true,
                            expires: 7,
                        });
                        // Set the refresh token cookie with HttpOnly and Secure flags
                        Cookie.set('userRefreshToken', refreshToken, {
                            secure: true,
                            expires: 7,
                        });

                        window.location.reload();
                    } else {
                        // Failed login
                        console.error('Failed to log in');
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });

            // Reset form fields
            email.value = '';
            password.value = '';
        }

        return {
            email,
            password,
            submitForm,
        };
    },
};
</script>
