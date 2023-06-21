<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                

            <modal 
            v-bind:revele="revele"
            v-bind:toggleModale="toggleModale">
            </modal>

            <modalRegister
                v-bind:showRegister="showRegister"
                v-bind:toggleModaleRegister="toggleModaleRegister">
            </modalRegister>
            
            <div v-on:click="toggleModale" class="btn">Ouvre modale Login</div>
            <div v-on:click="toggleModaleRegister" v-onclick="console.log(showRegister)" class="btn">Ouvre modale Register</div>

            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';

import Modale from './Modale.vue'
import ModaleRegister from './Register.vue'

export default {
    name: 'Login', 
    data(){
        return {
            revele: false,
            showRegister: false
        }
    },
    components: {
        'modal': Modale,
        'modalRegister': ModaleRegister
    },
    methods: {
        toggleModale: function(){
            this.revele = !this.revele;
        },
        toggleModaleRegister: function(){
            this.showRegister = !this.showRegister;
        }
        
    },

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
    },
};
</script>
