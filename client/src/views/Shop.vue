<template>
  <div>
    <!-- Loader pour l'affichage pendant le chargement -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span class="absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>

    <!-- Votre contenu principal de la page -->
    <div class="container max-w-full">
      <h2 class="text-5xl font-normal leading-normal mt-0 mb-2 flex justify-center">Boutique</h2>
      <div class="col-md-6 mt-5 mx-auto flex justify-center">
        <div class="div-block-home w-[963px] h-[679px] grid">
          <section >
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div class="grid gap-8 lg:grid-cols-2">
                <!-- ... Votre contenu d'articles ici ... -->
                <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex justify-center items-center items-center mb-5 text-gray-500">
                    <img src="../../src/images/blue-king.jpg" alt="blue-king" class="w-40 h-25">
                  </div>
                  <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Pions Bleu</a></h2>
                  <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Changez votre skin de pion</p>
                  <div class="flex justify-around items-center">
                    <div class="flex items-center space-x-4">
                      <button class="div-button-shop flex items-center justify-center w-[150px] h-[50px] p-6 md:p-[6px 10px]" @click="submit">
                        <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Acheter</p>
                      </button>
                      <button class="div-button-shop flex items-center justify-center w-[150px] h-[50px] p-6 md:p-[6px 10px]" @click="toggleModaleRegister">
                        <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Détail</p>
                      </button>
                      <!-- StripeCheckout component pour le paiement -->
                      <stripe-checkout
                        ref="checkoutRef"
                        mode="payment"
                        :pk="publishableKey"
                        :line-items="lineItems"
                        :success-url="successURL"
                        :cancel-url="cancelURL"
                        @loading="v => loading = v"
                      />
                    </div>
                  </div>
                </article>
                <!-- ... Autres articles ici ... -->
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  components: {
    StripeCheckout
  },
  data() {
    return {
      publishableKey: 'pk_test_51NHLQLJ6Q5BZS72KVkdWCzDVWs2svIZoMdrvawZ2LMP7PpHPe46OUtJt1mPdwbJHkyeU5mITFwqeOX1K6Iq1xgYV00VGwsaNiQ',
      loading: false,
      lineItems: [
        {
          price: 'price_1NV8qDJ6Q5BZS72KyAM6DIBZ', // L'identifiant du prix unique que vous avez créé dans votre tableau de bord Stripe
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:5173/success', // URL de redirection après un paiement réussi
      cancelURL: 'http://localhost:5173/error', // URL de redirection si l'utilisateur annule le paiement
    };
  },
  methods: {
    submit() {
      this.loading = true; // Active le pageloader

      // Vous serez redirigé vers la page de paiement sécurisée de Stripe
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
  
<style>
body {
  background: url(../images/beams-home@95.jpg), lightgray 50% / cover no-repeat;
}

.div-block-home {
  background: url(../images/beams-home@95.jpg), lightgray 50% / cover no-repeat;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.div-button-home {
  border-radius: 6px;
  background: #1F2937;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.div-button-shop {
  border-radius: 6px;
  border: 1px solid #FFF;
  background: #0C141E;
  box-shadow: 0px 
}
</style>
