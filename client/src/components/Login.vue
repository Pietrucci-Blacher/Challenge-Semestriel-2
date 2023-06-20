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

import Modale from './Modale.vue'

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




    
};
</script>
