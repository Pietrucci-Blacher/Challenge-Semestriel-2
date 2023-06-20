<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" v-on:click="toggleModale">
            <div class="modale">
                <div v-on:click="toggleModale" class="btn-modale cursor-pointer" >&times;</div>

                <form novalidate @submit.prevent="submitForm">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            placeholder="Enter email"
                            v-model="email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            v-model="password"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Sign in
                    </button>
                </form>

            </div>
        </div>
    </div>
    
</template>

<script>

import { ref } from 'vue';


    export default {
        name: 'Modale',
        props: ['revele', 'toggleModale'],


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
            fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async (response) => {
              if (response.ok) {
                // Successful login
                const {accessToken, refreshToken} = JSON.parse(await response.text());

                document.cookie = `userAccessToken=${accessToken}`;
                document.cookie = `userRefreshToken=${refreshToken}`;
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

<style scoped>

    .bloc-modale {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }
    
    .modale {
       background: #f1f1f1;
       color: #333;
       padding: 50px;
       position: fixed;
       top: 30%;
    }
    
    .btn-modale {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        background: white;
    }

</style>