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
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            error: '',
        };
    },
    methods: {
        async submitForm() {
            const { confirmPassword, ...requestData } = this.form;

            if (requestData.password !== confirmPassword) {
                this.error = 'Password and Confirm Password do not match.';
                return;
            }

            try {
                const response = await fetch(
                    'http://localhost:3000/auth/register',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    },
                );

                if (response.ok) {
                    // Registration successful, handle the response
                    console.log('Registration successful');
                    // Reset form fields after successful registration if needed
                    this.form = {
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    };
                } else {
                    // Registration failed, handle the error
                    const errorData = await response.json();
                    this.error = errorData.message || 'Registration failed';
                }
            } catch (error) {
                // Network error or API request failed
                this.error = 'Registration failed';
                console.error(error);
            }
        },
    },
};
</script>

<style>
.error-message {
    color: red;
}
</style>