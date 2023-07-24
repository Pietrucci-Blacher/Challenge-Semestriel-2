import { isAuthenticated } from '@/utils/misc';
import Cookie from 'js-cookie';

export const getUserData = async () => {
    if (!isAuthenticated()) {
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
        console.error('Failed to fetch user data');
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

export const userDataDelete = async (userId) => {
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
    Cookie.remove('userAccessToken');
    Cookie.remove('userRefreshToken');
    window.location.href = '/';
};

export const isUserAdminRole = async () => {
    let userinfos = await getUserData();
    if (userinfos.role === 'admin') {
        return true;
    }
};

export default { getUserData, userDataUpdate, userDataDelete, isUserAdminRole };
