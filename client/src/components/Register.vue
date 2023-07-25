<template>
        <div class="bloc-modale" v-if="showRegister">
            <div class="overlay flex justify-center" v-on:click="toggleModaleRegister">
                <div class="modale div-block-modale w-[963px] h-auto grid grid-cols-2" v-on:click.stop>
                    <div v-on:click="toggleModaleRegister" class="btn-modale cursor-pointer" >&times;</div>
                    <form novalidate @submit.prevent="submitForm">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 ">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-black  ">Créez votre compte</h3>
                        </div>
                        <div flex flex-col>
                            <div class="form-group flex justify-between items-center flex-row m-4">
                                <label for="username">Pseudo:</label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    name="username"
                                    placeholder="Entrer votre pseudo"
                                    v-model="form.username" />
                            </div>
                            <div class="form-group flex justify-between items-center flex-row m-4">
                                <label for="email">Email:</label>
                                <input 
                                    type="email"
                                    class="form-control" 
                                    id="email" 
                                    placeholder="Entrer votre Email"
                                    v-model="form.email" />
                            </div>
                            <div class="form-group flex justify-between items-center flex-row m-4">
                                <label for="password">Mot de Passe:</label>
                                <input 
                                    type="password" 
                                    class="form-control"
                                    id="password" 
                                    placeholder="Entrer votre Mot de Password"
                                    v-model="form.password" />
                            </div>
                            <div class="form-group flex justify-between items-center flex-row m-4">
                                <label for="confirmPassword">Confirmation Mot de Passe:</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="confirmPassword"
                                    placeholder="Entrer votre Confirmation Mot de Password"
                                    v-model="form.confirmPassword"
                                />
                            </div> 
                        </div>
                        <div v-if="error" class="error-message">{{ error }}</div>
                            <div class="flex justify-center">
                                <button type="submit" class="btn">Register</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
</template>






<script>
export default {

    name: 'ModaleRegister',
    props: ['showRegister', 'toggleModaleRegister'],

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


<style scope>

    .div-block-modale {
        display: flex; 
        flex-direction: column;
        background: url(../images/beams-home@95.jpg), lightgray 50% / cover no-repeat;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .form-control {
        width: 643px;
        height: 58px;
        border-radius: 10px;
        background: #FFF;
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px #D1D5DB inset, 0px 0px 0px 0px #FFF inset;
        padding: 1rem;
    }

    .btn {
        display: inline-flex;
        padding: 6px 169.86px 6px 168.14px;
        align-items: flex-start;
        border-radius: 6px;
        background: #1F2937;
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        color: white;
    }

  
</style>