<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="form.username" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="form.password" />
            </div>
            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                />
            </div>
            <div v-if="error" class="error-message">{{ error }}</div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
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

<style>
.error-message {
    color: red;
}
</style>
