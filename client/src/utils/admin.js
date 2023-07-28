import Cookie from 'js-cookie';

export const getUsers = async () => {
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/users/`;

    let response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};

export const getReportedComments = async () => {
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    let endpoint = `${url}/chat/reported`;

    let response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch reported comments');
    }
    return response.json();
};

export default {
    getUsers,
    getReportedComments,
};
