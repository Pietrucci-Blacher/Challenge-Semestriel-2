<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>

    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
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
      publishableKey: 'pk_test_51NKyO4EmseH8PO1ILILyLLzhXsOeMH7FgHVnl6ojXW0SKM46a6aUUfXbXick1K0ileIrL8opfed9eNh8q4fwg9Ub00QihHchv1',
      loading: false,
      lineItems: [
        {
          price: 'price_1NNYXPEmseH8PO1I9tICV3Rj', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:5173/success',
      cancelURL: 'http://localhost:5173/error',
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
</style>