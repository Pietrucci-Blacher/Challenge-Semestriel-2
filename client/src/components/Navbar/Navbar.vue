<template>
    <aside class="h-screen">
        <div
            class="flex flex-col items-center justify-between h-full overflow-hidden text-gray-400"
            :class="{ 'bg-gray-900': isDarkTheme, 'bg-gray-100': !isDarkTheme }">
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
            <div
                class="flex flex-col items-center border-t transition-all"
                :class="{
                    'border-gray-700': isDarkTheme,
                    'border-gray-300': !isDarkTheme,
                }"
                :style="{ width: showMenu ? '10rem' : '3rem' }"
                :key="showMenu">
                <template v-if="showMenu">
                    <router-link
                        v-for="item in filteredMenuItems"
                        :key="item.name"
                        :to="item.route"
                        class="flex items-center justify-center h-12 mt-2 hover:bg-gray-700 hover:text-gray-300 transition-[900ms]"
                        :class="{
                            'w-12': !showMenu,
                            'w-28': showMenu,
                        }"
                        @click="handleItemClick(item)">
                        <font-awesome-icon :icon="item.icon" />
                        <span class="ml-2">{{ item.name }}</span>
                    </router-link>
                </template>
                <template v-else>
                    <router-link
                        v-for="item in filteredMenuItems"
                        :key="item.name"
                        :to="item.route"
                        class="flex items-center justify-center w-12 h-12 mt-4 hover:bg-gray-700 hover:text-gray-300"
                        @click="handleItemClick(item)">
                        <font-awesome-icon :icon="item.icon" />
                        <span class="ml-2" v-show="showMenu">{{
                            item.name
                        }}</span>
                    </router-link>
                </template>
            </div>
        </div>
    </aside>
</template>

<script>
import { ref, reactive } from 'vue';
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
    faCartShopping,
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
    faCartShopping,
);

import {
    logout,
    isAuthenticated,
    toggleTheme,
    toggleMenu,
    getThemeMode,
} from '@/utils/misc';

export default {
    components: {
        FontAwesomeIcon,
        RouterLink,
    },
    setup() {
        const isDarkTheme = ref(getThemeMode() === 'dark');
        const showMenu = ref(false);
        const menuItems = reactive(menuContent);

        // Restore theme mode and menu state from localStorage
        isDarkTheme.value = localStorage.getItem('themeMode') === 'dark';

        showMenu.value = localStorage.getItem('menuState') === 'open';

        return {
            isDarkTheme,
            showMenu,
            menuItems,
            toggleTheme: () => toggleTheme(isDarkTheme),
            toggleMenu: () => toggleMenu(showMenu),
        };
    },
    computed: {
        filteredMenuItems() {
            if (!isAuthenticated()) {
                return this.menuItems.filter((item) => !item.check);
            }
            return this.menuItems;
        },
    },

    methods: {
        handleItemClick(item) {
            if (item.onclick && typeof this[item.onclick] === 'function') {
                this[item.onclick]();
            }
        },
        logout() {
            logout();
        },
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
    transition: height 0.3s ease;
}

.menu-toggle-enter,
.menu-toggle-leave-to {
    height: 0;
    opacity: 0;
    overflow: hidden;
}
</style>
