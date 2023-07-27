<template>
    <div>
      <div v-if="loading" class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-opacity-80 bg-gray-500">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span class="absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
      
      <div class="container max-w-full">
        <h2 class="text-5xl font-normal leading-normal mt-0 mb-2 flex justify-center">Boutique</h2>
        <div class="col-md-6 mt-5 mx-auto flex justify-center">
          <div class="div-block-home w-[963px] h-[679px] grid">
            <section >
              <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6 flex flex-col">
                <h2 class="text-4xl font-normal leading-normal mt-0 mb-2 flex justify-center">Top skin vendu</h2>
                <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                  <Slide v-for="slide in 6" :key="slide">
  
                    <img :src="`images/chess-piece-color/image-${slide}.jpg`" alt="Image ${slide}" class="carousel__item" />
                  </Slide>
                </Carousel>
  
                <Carousel
                  id="thumbnails"
                  :items-to-show="4"
                  :wrap-around="true"
                  v-model="currentSlide"
                  ref="carousel"
                >
                  <Slide v-for="slide in 6" :key="slide">
  
                    <img :src="`/images/chess-piece-color/image-${slide}.jpg`" alt="Image ${slide}" class="carousel__item__choice" @click="slideTo(slide - 1)" />
                  </Slide>
                </Carousel>
  
                <div class="all_skin">
                  <h2 class="text-4xl font-normal leading-normal mt-0 mb-2 flex justify-center">Tout les skins</h2>
                  <div class="grid gap-8 lg:grid-cols-2">
  
                    <article v-for="article in articles" :key="article.id" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <div class="flex justify-center items-center items-center mb-5 text-gray-500">
                        <img :src="article.image" :alt="article.title" class="w-40 h-25">
                      </div>
                      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ article.title }}</h2>
                      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ article.description }}</p>
                      <div class="flex justify-around items-center">
                        <div class="flex items-center space-x-4">
                          <button class="div-button-shop flex items-center justify-center w-[150px] h-[50px] p-6 md:p-[6px 10px]" @click="submit(article)">
                            <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Acheter</p>
                          </button>
                          <button class="div-button-shop flex items-center justify-center w-[150px] h-[50px] p-6 md:p-[6px 10px]" @click="toggleModaleRegister">
                            <p class="text-white text-center text-base md:text-lg font-inter font-semibold leading-6 md:leading-7">Détail</p>
                          </button>
  
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
                  </div>
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
  import { Carousel, Slide } from 'vue3-carousel'
  import { loadStripe } from '@stripe/stripe-js';
  import routesData from '../routes.json';

  import 'vue3-carousel/dist/carousel.css'
  
  export default {
    name: 'Gallery',
    components: {
      Carousel,
      Slide,
      StripeCheckout
    },
    data() {
      return {
        currentSlide: 0,
        publishableKey: 'pk_test_51NHLQLJ6Q5BZS72KVkdWCzDVWs2svIZoMdrvawZ2LMP7PpHPe46OUtJt1mPdwbJHkyeU5mITFwqeOX1K6Iq1xgYV00VGwsaNiQ',
        loading: false,
        articles: [
          {
            id: 1,
            image: '/images/chess-piece-color/image-1.jpg',
            title: 'Pions Bleu',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NV8qDJ6Q5BZS72KyAM6DIBZ', 
            value: false,
          },
          {
            id: 2,
            image: '/images/chess-piece-color/image-2.jpg',
            title: 'Pions Rouge',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NV8rIJ6Q5BZS72KIOlLzSNt', 
          },
          {
            id: 3,
            image: '/images/chess-piece-color/image-3.jpg',
            title: 'Pions Vert',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NVZsWJ6Q5BZS72KrYf52jgK', 
          },
          {
            id: 4,
            image: '/images/chess-piece-color/image-4.jpg',
            title: 'Pions Violet',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NVZsyJ6Q5BZS72KovmNciHY', 
          },
                {
            id: 5,
            image: '/images/chess-piece-color/image-5.jpg',
            title: 'Pions Orange',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NVZtWJ6Q5BZS72Krs67ECV6', 
          },
          {
            id: 6,
            image: '/images/chess-piece-color/image-6.jpg',
            title: 'Pions Jaune',
            description: 'Changez votre skin de pion',
            priceId: 'price_1NVZuVJ6Q5BZS72KNeuFlNmK', 
          }
        ],
        successURL: import.meta.env.VITE_ENDPOINT_FRONT_URL + routesData.find(route => route.name === 'Success').path,
        cancelURL: 'http://localhost:5173/error', 
      };
    },
methods: {
    async slideTo(val) {
      this.currentSlide = val;
    },
    async submit(article) {
      this.loading = true;
      const priceId = article.priceId;
      const articleId = article.id;
      const stripe = await loadStripe(this.publishableKey);

      const paymentVerificationURL = 'http://localhost:3000/payment/verify';
      

      stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${this.successURL}?priceId=${priceId}&articleId=${articleId}`,
        cancelUrl: this.cancelURL,
      }).then((result) => {
        if (result.error) {
          this.loading = false;
          console.log("error");
        } 
        else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          fetch(paymentVerificationURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(result.paymentIntent), 
          })
          .then(response => response.json())
          .then(data => {
            console.log('Payment verification response from server:', data);
          })
          .catch(error => {
            console.error('Error while verifying payment:', error);
          });
        } else {
          window.location.href = this.cancelURL;
        }

      });

      },
    },
  };
  </script>
    
  <style>
  body {
    background: url(/images/chess-piece-color/beams-home@95.jpg), lightgray 50% / cover no-repeat;
  }
  
  .div-block-home {
    background: url(/images/chess-piece-color/beams-home@95.jpg), lightgray 50% / cover no-repeat;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: auto;
      margin: 20px;
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
  
   /* h1 and h2 */
    .text-4xl {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  
  .all_skin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  
  
  /* carousel */
  
  .carousel__item__choice {
    cursor: pointer;
    margin-top: 20px;
    /* background-color: #642afb; */
    font-size: 20px;
    border-radius: 8px;
    width: 100px;
  }
  .carousel__item {
    cursor: pointer;
    margin-top: 20px;
    /* background-color: #642afb; */
    font-size: 20px;
    border-radius: 8px;
    width: 250px;
  }
  
  #gallery {
    /* background-color: #642afb; */
    color: black;
    font-size: 20px;
    border-radius: 8px;
    transition: 0.5s;
  }
  
  
  </style>