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




    
};
</script>
