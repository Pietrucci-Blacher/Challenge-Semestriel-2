import Cookie from 'js-cookie';

export const logout = () => {
    if (!Cookie.get('userAccessToken')) return;

    fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
    }).then((data) => {
        Cookie.remove('userAccessToken');
        Cookie.remove('userRefreshToken');
    });
};

export const isAuthenticated = () => {
    return !!(Cookie.get('userAccessToken') && Cookie.get('userRefreshToken'));
};

export default {
    logout,
    isAuthenticated,
};
