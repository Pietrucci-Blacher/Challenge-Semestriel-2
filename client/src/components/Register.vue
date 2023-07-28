<template>
    <Modal title="" @click="handleModalClick">
        <div
            class="flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-[60vh]"
        >
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2
                    class="mt-6 text-3xl font-extrabold text-center text-neutral-600"
                >
                    Sign up for an account
                </h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="px-4 py-8 sm:px-10">
                    <form class="space-y-6" @submit.prevent="submitForm">
                        <div>
                            <label
                                for="username"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <div class="mt-1">
                                <input
                                    v-model="form.username"
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div class="mt-1">
                                <input
                                    v-model="form.email"
                                    id="email"
                                    name="email"
                                    type="email"
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
                                    v-model="form.password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="confirmPassword"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div class="mt-1">
                                <input
                                    v-model="form.confirmPassword"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
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
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
    <Notification
        v-if="registrationSuccessful"
        type="success"
        title="Registration successful"
        message="You can now log in."
    />
</template>

<script setup>
import Notification from '@/components/Notification.vue';
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';

const registrationSuccessful = ref(false);
const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
});
const error = ref('');

async function submitForm() {
    const { confirmPassword, ...requestData } = form.value;

    if (requestData.password !== confirmPassword) {
        error.value = 'Password and Confirm Password do not match.';
        return;
    }
    try {
        let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
        let endpoint = `${url}/auth/register`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            // Registration successful, handle the response
            registrationSuccessful.value = true;
            // Reset form fields after successful registration if needed
            form.value.username = '';
            form.value.email = '';
            form.value.password = '';
            form.value.confirmPassword = '';
        } else {
            const errorData = await response.json();
            error.value = errorData.message || 'Registration failed';
        }
    } catch (error) {
        // Network error or API request failed
        error.value = 'Registration failed';
        console.error(error);
    }
}
</script>
<style scoped>
.error-message {
    color: red;
}
</style>
