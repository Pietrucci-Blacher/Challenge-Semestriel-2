
<template>
    <div class="success-page">
        <div class="success-content">
            <h1 class="success-title">Félicitations !</h1>
            <p class="success-message">
                Votre paiement a été effectué avec succès.
            </p>
            <p class="success-message">Merci pour votre achat !</p>
            <p>Price ID: {{ priceId }}</p>
            <p>Article ID: {{ articleId }}</p>
            <p class="redirect-message">
                Vous serez redirigé vers la boutique dans
                {{ countdown }} secondes.
            </p>
        </div>
    </div>
</template>


<script>
import Cookie from 'js-cookie';

export default {
  name: 'Success',
  data() {
    return {
      logs: [],
      countdown: 5,
      priceId: null,
      articleId: null,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.priceId = urlParams.get('priceId');
    this.articleId = urlParams.get('articleId');

    this.verifyPayment();
  },
  methods: {
    verifyPayment() {
      const paymentVerificationURL = 'http://localhost:3000/payment/verify'; 

      fetch(paymentVerificationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Données reçues depuis le back-end:', data);
          const paymentIntent = data.paymentIntent;
          console.log('Informations de paiement:', paymentIntent);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête fetch:', error);
        });
    },
  },
};
</script>

<!-- <script>
  import Cookie from 'js-cookie';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Success',
    data() {
        return {
            logs: [],
            countdown: 5,
            priceId: null,
            articleId: null,
        };
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.priceId = urlParams.get('priceId');
        this.articleId = urlParams.get('articleId');
        console.log('Price ID:', this.priceId);
        console.log('Article ID:', this.articleId);
        fetch('http://localhost:3000/payment/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Données reçues depuis le back-end:', data);
                const paymentIntent = data.paymentIntent;
                console.log('Informations de paiement:', paymentIntent);
            })
            
            .catch((error) => {
                console.error('Erreur lors de la requête fetch:', error);
            });
        // this.startCountdown();
    },
};
</script> -->

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
