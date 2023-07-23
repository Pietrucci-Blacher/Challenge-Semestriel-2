import Cookie from 'js-cookie';

const logout = () => {
    if (!isAuthenticated()) {
        return;
    }
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/auth/logout`;
    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
    }).then(() => {
        Cookie.remove('userAccessToken');
        Cookie.remove('userRefreshToken');
        window.location.href = '/';
    });
};

const isAuthenticated = () => {
    return !!(Cookie.get('userAccessToken') && Cookie.get('userRefreshToken'));
};

const toggleTheme = (isDarkTheme) => {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem('themeMode', isDarkTheme.value ? 'dark' : 'light');
};

const toggleMenu = (showMenu) => {
    showMenu.value = !showMenu.value;
    localStorage.setItem('menuState', showMenu.value ? 'open' : 'closed');
};

const getThemeMode = () => {
    return localStorage.getItem('themeMode') || 'dark'; // You can set a default value here if needed
};

export { logout, isAuthenticated, toggleTheme, toggleMenu, getThemeMode };
