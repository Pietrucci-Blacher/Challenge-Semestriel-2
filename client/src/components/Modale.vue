<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay flex justify-center" v-on:click="toggleModale">
            <div class="modale div-block-modale w-[963px] h-auto grid grid-cols-2" v-on:click.stop>
                <div v-on:click="toggleModale" class="btn-modale cursor-pointer" >&times;</div>
                <form novalidate @submit.prevent="submitForm">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 ">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-black  ">Connectez-vous à votre compte</h3>
                    </div>
                    <div flex flex-col>
                        <div class="form-group flex justify-around items-center flex-row m-4">
                            <label for="email">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                name="email"
                                placeholder="Entrez-votre email"
                                v-model="email"
                            />
                        </div>
                        <div class="form-group flex justify-around items-center flex-row m-4">
                            <label for="password">Mot de Passe</label>
                            <input
                                type="password"
                                class="form-control"
                                name="password"
                                placeholder="Mot de passe"
                                v-model="password"
                            />
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit" class="btn">
                            Connexion
                        </button>
                    </div>
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
