<template>
    <div
        class="flex flex-col items-center justify-between h-full overflow-hidden text-gray-400"
        :class="{ 'bg-gray-900': isDarkTheme, 'bg-gray-100': !isDarkTheme }"
    >
        <div>
            <router-link to="/">
                <img
                    :src="
                        isDarkTheme
                            ? '/images/svg/knight-white.svg'
                            : '/images/svg/knight.svg'
                    "
                    alt="Vue logo"
                    class="mt-4 w-8 h-8"
                />
            </router-link>
        </div>
        <transition name="menu-toggle">
            <div
                class="flex flex-col items-center border-t border-gray-700"
                v-show="showMenu"
            >
                <router-link
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.route"
                    class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                >
                    <font-awesome-icon :icon="['fas', item.icon]" />
                </router-link>
            </div>
        </transition>
        <button class="transition-all" @click="toggleMenu">
            <transition name="arrow-toggle">
                <template v-slot:default>
                    <font-awesome-icon
                        :icon="
                            showMenu
                                ? ['fas', 'chevron-left']
                                : ['fas', 'chevron-right']
                        "
                    />
                </template>
            </transition>
        </button>
        <button class="transition-all" @click="toggleTheme">
            <transition name="theme-toggle">
                <template v-slot:default>
                    <font-awesome-icon
                        :icon="isDarkTheme ? ['fas', 'sun'] : ['fas', 'moon']"
                    />
                    <span class="sr-only">
                        {{
                            isDarkTheme
                                ? 'Switch to Light Theme'
                                : 'Switch to Dark Theme'
                        }}
                    </span>
                </template>
            </transition>
        </button>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
        };

        const toggleMenu = () => {
            showMenu.value = !showMenu.value;
        };

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

.collapsed .rounded {
    display: none;
}

.menu-toggle-enter-active,
.menu-toggle-leave-active {
    transition: transform 0.3s ease;
}

.menu-toggle-enter,
.menu-toggle-leave-to {
    transform: translateY(100%);
}
</style>
