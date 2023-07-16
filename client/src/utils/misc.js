import Cookie from 'js-cookie';

const logout = () => {
    if (!isAuthenticated()) {
        return;
    }

    fetch('http://localhost:3000/auth/logout', {
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
