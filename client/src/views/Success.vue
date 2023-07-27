
<template>
    <div class="success-page">
        <div class="success-content">
            <h1 class="success-title">Félicitations !</h1>
            <p class="success-message">
                Votre paiement a été effectué avec succès.
            </p>
            <p class="success-message">Merci pour votre achat !</p>
            <p>Price ID: {{ priceId }}</p>
            <p>Skin ID: {{ skinId }}</p>
            <p class="redirect-message">
                Vous serez redirigé vers la boutique dans
                {{ countdown }} secondes.
            </p>
        </div>
    </div>
</template>


<script>

export default {
  name: 'Success',
  data() {
    return {
      logs: [],
      countdown: 5,
      priceId: null,
      skinId: null,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    
    this.priceId = urlParams.get('priceId');
    this.skinId = urlParams.get('skinId');
  },
  methods: {
    // redirect() {
    //   if (this.countdown > 0) {
    //     setTimeout(() => {
    //       this.countdown -= 1;
    //       this.redirect();
    //     }, 1000);
    //   } else {
    //     this.$router.push({ name: 'Shop' });
    //   }
    // },
  },
};
</script>


<style>
.success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6;
}

.success-content {
    text-align: center;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.success-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333333;
}

.success-message {
    font-size: 18px;
    margin-bottom: 8px;
    color: #555555;
}
</style>
