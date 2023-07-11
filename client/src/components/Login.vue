<template>
    <div class="container max-w-full">
      <h2 class="text-5xl font-normal leading-normal mt-0 mb-2 flex justify-center">ChessChallenger</h2>
      <div class="col-md-6 mt-5 mx-auto flex justify-center">
        <div class="div-block-home w-[963px] h-[679px] grid grid-cols-2">
          <div class="div-img-home p-5 flex content-center justify-center items-center">
            <img class="img-home p-5 flex content-center justify-center items-center" src="../images/standardboard.1d6f9426.jpg" alt="">
          </div>
          <div class="flex flex-col justify-center items-center space-y-24">
            <div>
              <button class="div-button-home flex items-center justify-center w-[284px] h-[70px] p-6 md:p-[6px 10px]">
                <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Jouer</p>
              </button>
            </div>
            <div>
                <button class="div-button-home flex items-center justify-center w-[284px] h-[70px] p-6 md:p-[6px 10px]" @click="toggleModale">
                    <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Se connecter</p>
                </button>
                <modal v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modal>
            </div>
            <div>
                <button class="div-button-home flex items-center justify-center w-[284px] h-[70px] p-6 md:p-[6px 10px]" @click="toggleModaleRegister">
                    <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">S'inscrire</p>
                </button>
                <modalRegister v-bind:showRegister="showRegister" v-bind:toggleModaleRegister="toggleModaleRegister"></modalRegister>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Cookie from 'js-cookie';

import Modale from './Modale.vue'
import ModaleRegister from './Register.vue'
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
      toggleModale() {
        this.revele = !this.revele;
      },
      toggleModaleRegister() {
        this.showRegister = !this.showRegister;
      },
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
