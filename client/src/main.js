import '@/assets/style.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import routesData from './routes.json';
import App from './App.vue';

const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
});

const updateDocumentTitle = (to) => {
    const appName = import.meta.env.VITE_APP_NAME;
    document.title = to.name ? `${appName} - ${to.name}` : appName;
};

const routes = routesData.map((route) => ({
    path: route.path,
    name: route.name,
    component: () => import(`@/views/${route.component}.vue`),
}))

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    updateDocumentTitle(to);

    // Check if the route exists in routes.json
    const exists = routesData.some((route) => route.path === to.path);
    if (!exists) {
        next('/404'); // Redirect to /404 if the route doesn't exist
    } else {
        next();
    }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
