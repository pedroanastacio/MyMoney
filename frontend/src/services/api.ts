import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.response.use(response => {
    return response;
}, function (error) {
    if (typeof error.response?.data?.message !== 'undefined') {
		return Promise.reject(error.response.data.message.toString());
    }

    return Promise.reject('Algo deu errado!');
});

export default api;

