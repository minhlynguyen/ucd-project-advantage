/*
This file define a new axios instance to intercept requests and responses
to check user authentication and refresh token automatically.
*/
import axios from 'axios';
import { notify } from './utils/notify';
import { toast } from 'react-toastify';

// create axios instance with baseURL, timeout and AUTH header    
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 500000,//50 secs
    headers: {
      Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
});

// config axios instance
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, simply return it.
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        // If the error response is undefined, it might be a CORS or network issue, show error to users.
        if (typeof error.response === 'undefined') {
            alert(
                'A server/network error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.'
            );
            return Promise.reject(error);
        }

        // If the response status is 401 (Unauthorized) and the URL matches the refresh token endpoint,
		// it means previous operation of refreshing token failed, show error to users and
        // redirect the user to the login page.
        if (
            error.response.status === 401 &&
            originalRequest.url === axios + 'api/user/login/refresh/'
        ) {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        // If the error code indicates an invalid token, and the status and statusText match 401 Unauthorized,
        // attempt to refresh the token.
        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = localStorage.getItem('refresh_token');

            // If a refresh token exists in local storage, attempt to refresh the access token.
            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // Convert the current time to seconds (since the token's expiration is in seconds).
                const now = Math.ceil(Date.now() / 1000);

                // If the refresh token hasn't expired, attempt to get a new access token.
                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('/api/user/login/refresh/', { refresh: refreshToken })
                        .then((response) => {
                            // Store the new tokens in local storage.
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            // Update the default and original request headers with the new access token.
                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'JWT ' + response.data.access;

                            // Retry the original request with the new token.
                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
							notify(err.message || "An unexpected error occurred", "error");
                        });
                } else {
                    // If the refresh token is expired,
					// prompt users, log the expiration and redirect to login.
					notify("Login has expired, please log in again", 'error');
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                // If there's no refresh token in local storage, redirect to login.
                window.location.href = '/login/';
            }
        }

        // If none of the above conditions are met, reject the promise with the error.
        // Specific error handling can be done elsewhere.
        return Promise.reject(error);
    }
);



export default axiosInstance;