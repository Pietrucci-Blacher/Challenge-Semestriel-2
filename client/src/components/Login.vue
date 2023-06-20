<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                

            <modal 
            v-bind:revele="revele"
            v-bind:toggleModale="toggleModale">
            </modal>
            <div v-on:click="toggleModale" class="btn">Ouvre modale</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';

export default {
    name: 'Login', 
    data(){
        return {
            revele: false
        }
    },
    components: {
        'modal': Modale
    },
    methods: {
        toggleModale: function(){
            this.revele = !this.revele;
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
