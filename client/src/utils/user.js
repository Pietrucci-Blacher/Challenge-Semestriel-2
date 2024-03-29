import { isAuthenticated } from '@/utils/misc';
import Cookie from 'js-cookie';

export const getUserData = async (redirect = true) => {
    if (redirect && !isAuthenticated()) {
        window.location.href = '/';
    }
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/users/me`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
};

export const userDataUpdate = async (userId, userData) => {
    if (!isAuthenticated()) {
        window.location.href = '/';
    }
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/users/${userId}`;
    await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
        body: JSON.stringify(userData),
    });
};

export const userDataDelete = async (userId, reload = false) => {
    if (!isAuthenticated()) {
        window.location.href = '/';
    }
    let userToken = Cookie.get('userAccessToken');
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/users/${userId}`;
    await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
        },
    });
    if (reload) {
        Cookie.remove('userAccessToken');
        Cookie.remove('userRefreshToken');
        window.location.href = '/';
    }
};

export const isUserAdminRole = async () => {
    let userinfos = await getUserData(false);
    return userinfos.role === 'admin';
};

export const UserChangePassword = async (oldPassWord, newPassword) => {
    if (!isAuthenticated()) {
        window.location.href = '/';
    }
    let userToken = Cookie.get('userAccessToken');
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/users/me/password`;
    const data = {
        oldPassword: oldPassWord.value,
        newPassword: newPassword.value,
    };
    await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
    });
};

export const getGameForUserId = async () => {
    if (!isAuthenticated()) {
        window.location.href = '/';
    }

    let userToken = Cookie.get('userAccessToken');
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/game/user/me`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
};

export default {
    getUserData,
    userDataUpdate,
    userDataDelete,
    isUserAdminRole,
    UserChangePassword,
};
