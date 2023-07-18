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

export { logout, isAuthenticated };
