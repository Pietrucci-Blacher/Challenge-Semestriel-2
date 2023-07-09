<template>
    <aside
        class="min-h-screen flex flex-col justify-between"
        :class="{ 'bg-gray-900': isDarkTheme, 'bg-gray-100': !isDarkTheme }"
    >
        <div class="flex flex-col items-center overflow-hidden text-gray-400">
            <div>
                <router-link to="/">
                    <img
                        :src="
                            isDarkTheme
                                ? '/images/svg/knight-white.svg'
                                : '/images/svg/knight.svg'
                        "
                        alt="Chess"
                        class="mt-4 mb-2 w-8 h-8"
                    />
                </router-link>
            </div>
            <div
                class="flex flex-col items-center border-t transition-all"
                :class="{
                    'border-gray-700': isDarkTheme,
                    'border-gray-300': !isDarkTheme,
                }"
                :style="{ width: showMenu ? '10rem' : '3rem' }"
                :key="showMenu"
            >
                <template v-if="showMenu">
                    <router-link
                        v-for="item in menuItems"
                        :key="item.name"
                        :to="item.route"
                        class="flex items-center justify-center h-12 mt-2 hover:bg-gray-700 hover:text-gray-300"
                        :class="{
                            'w-12': !showMenu,
                            'w-28': showMenu,
                        }"
                    >
                        <font-awesome-icon :icon="item.icon" />
                        <span class="ml-2">{{ item.name }}</span>
                    </router-link>
                </template>
                <template v-else>
                    <router-link
                        v-for="item in menuItems"
                        :key="item.name"
                        :to="item.route"
                        class="flex items-center justify-center w-12 h-12 mt-4 hover:bg-gray-700 hover:text-gray-300"
                    >
                        <font-awesome-icon :icon="item.icon" />
                        <span class="ml-2" v-show="showMenu">{{
                            item.name
                        }}</span>
                    </router-link>
                </template>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <button class="transition-all" @click="toggleTheme">
                <transition name="theme-toggle">
                    <template v-slot:default>
                        <font-awesome-icon
                            :icon="isDarkTheme ? 'sun' : 'moon'"
                        />
                    </template>
                </transition>
            </button>
            <button class="transition-all" @click="toggleMenu">
                <transition name="arrow-toggle">
                    <template v-slot:default>
                        <font-awesome-icon
                            :icon="showMenu ? 'chevron-left' : 'chevron-right'"
                        />
                    </template>
                </transition>
            </button>
        </div>
    </aside>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChessBoard,
    faCog,
    faEnvelope,
    faSignOutAlt,
    faSun,
    faMoon,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import menuContent from './navbar-content.json';
import { RouterLink } from 'vue-router';

library.add(
    faChessBoard,
    faCog,
    faEnvelope,
    faSignOutAlt,
    faSun,
    faMoon,
    faChevronLeft,
    faChevronRight,
);

export default {
    components: {
        FontAwesomeIcon,
        RouterLink,
    },
    setup() {
        const isDarkTheme = ref(true);
        const showMenu = ref(false);
        const menuItems = reactive(menuContent);

        const toggleTheme = () => {
            isDarkTheme.value = !isDarkTheme.value;
            localStorage.setItem(
                'themeMode',
                isDarkTheme.value ? 'dark' : 'light',
            );
        };

        const toggleMenu = () => {
            showMenu.value = !showMenu.value;
            localStorage.setItem(
                'menuState',
                showMenu.value ? 'open' : 'closed',
            );
        };

        // Watch window resize event
        watch(() => {
            window.addEventListener('resize', toggleMenu);
            return () => {
                window.removeEventListener('resize', toggleMenu);
            };
        });

        // Restore theme mode and menu state from localStorage
        isDarkTheme.value = localStorage.getItem('themeMode') === 'dark';
        showMenu.value = localStorage.getItem('menuState') === 'open';

        return {
            isDarkTheme,
            showMenu,
            menuItems,
            toggleTheme,
            toggleMenu,
        };
    },
};
</script>

<style scoped>
.arrow-toggle-enter-active,
.arrow-toggle-leave-active {
    transition: transform 0.3s ease;
}

.arrow-toggle-enter,
.arrow-toggle-leave-to {
    transform: rotateZ(180deg);
}

button {
    background: none;
    border: none;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.theme-toggle-enter-active .fa-sun,
.theme-toggle-leave-active .fa-moon {
    transform: rotateY(180deg);
}

.theme-toggle-enter-active .fa-moon,
.theme-toggle-leave-active .fa-sun {
    transform: rotateY(0deg);
}
</style>
