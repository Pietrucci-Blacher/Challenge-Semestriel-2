import Cookie from 'js-cookie';

export const getInfosPlayedParties = async () => {
    let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
    const endpoint = `${url}/users/me/statsGame`;
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
    return response.json();
};

export default { getInfosPlayedParties };
