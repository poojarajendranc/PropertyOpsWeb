import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getRefreshToken, getToken, removeAuthTokens, removeToken, saveToken } from "./authStorage";
import { refreshAccessToken } from "./authApi";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

let isRefreshing = false;

let pendingRequets: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void
}> = [];

const processPendingRequests = (error: unknown,
    token: string | null
) => {
    pendingRequets.forEach((request) => {
        if (error) {
            request.reject(error)
        } else if (token) {
            request.resolve(token)
        }
    })
    pendingRequets = []
}

api.interceptors.response.use((response) => response, async (error: AxiosError) => {

    const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
    }
    const isUnauthorised = error.response?.status === 401;
    const isLoginRequest = error.config?.url?.includes("/auth/login");
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (!isUnauthorised || isLoginRequest || isRefreshRequest) {
        return Promise.reject(error)
    }

    if (originalRequest._retry) {
        return Promise.reject(error)
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        removeToken();
        sessionStorage.setItem("auth_message", "Your session has expired. Please log in again.",)
        window.location.replace("/login");
        return Promise.reject(error);
    }

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            pendingRequets.push({
                resolve, reject
            })
        }).then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest)
        })

    }
    originalRequest._retry = true
    isRefreshing = true;

    try {
        const response = await refreshAccessToken(refreshToken);
        const newToken = response.accessToken;
        saveToken(newToken);
        processPendingRequests(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

    } catch (error) {
        processPendingRequests(error, null);
        removeAuthTokens();
        sessionStorage.setItem(
            "auth_message",
            "Your session has expired. Please log in again.",
        );
        window.location.replace("/login");

        return Promise.reject(error);
    } finally {
        isRefreshing = false;
    }

})

export default api;