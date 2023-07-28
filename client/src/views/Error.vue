<template>
    <div class="error-page">
      <div class="error-content">
        <h1 class="error-title">Erreur !</h1>
        <p class="error-message">Une erreur s'est produite lors du paiement.</p>
        <p class="error-message">Veuillez réessayer ultérieurement.</p>
        <p class="redirect-message">Vous serez redirigé vers la boutique dans {{ countdown }} secondes.</p>
        <!-- Vous pouvez ajouter d'autres éléments ici en fonction de vos besoins -->
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'Error',
    data() {
      return {
        countdown: 5,
      };
    },
    created() {
      this.startCountdown();
    },
    methods: {
      startCountdown() {
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(timer);
            this.$router.push({ name: 'Shop' });
          }
        }, 1000);
      },
    },
  };
  </script>

<style>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}
.error-content {
  text-align: center;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.error-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333333;
}
.error-message {
  font-size: 18px;
  margin-bottom: 8px;
  color: #555555;
}
</style>