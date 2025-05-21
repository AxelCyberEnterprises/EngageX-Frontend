/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import store from "../store"; // Import Redux store directly
import { logout } from "../store/slices/authSlice";
import { API_BASE_URL, SECONDARY_API_BASE_URL } from "./constants";
import { convertArrayToString, tokenManager } from "./utils";

export const getAxiosInstance = (type: "default" | "secondary"): Axios => {
    const baseURL = type === "secondary" ? SECONDARY_API_BASE_URL : API_BASE_URL;

    const api = axios.create({
        baseURL: baseURL,
        headers: { "Content-Type": "application/json" },
    });

    api.interceptors.request.use((config) => {
        const accessToken = tokenManager.getToken();

        if (accessToken) {
            config.headers.Authorization = `Token ${accessToken}`;
        }

        return config;
    });

    api.interceptors.response.use(
        (res) => {
            if (res.data?.errorMessage) {
                const errorMessage = res.data?.errorMessage || convertArrayToString(res.data?.message);
                const error = new Error(errorMessage) as AxiosError;
                error.response = res;
                throw error;
            }
            return res;
        },
        (error) => {
            if (error instanceof AxiosError) {
                const message =
                    error.response?.data?.errorMessage ||
                    convertArrayToString(error.response?.data?.message) ||
                    error.response?.data?.error ||
                    error.message;
                error.message = message;

                if (error.response?.status === 401) {
                    handleAuthError();
                }
            }

            throw error;
        },
    );

    function handleAuthError() {
        const dispatch = store.dispatch;
        dispatch(logout());
    }

    return api;
};

export const apiGet = async <T>(url: string, type: "default" | "secondary" = "default") => {
    const client = getAxiosInstance(type);
    const res = await client.get<T>(url);
    return res.data;
};

export const apiPost = async <T>(
    url: string,
    data?: any,
    type: "default" | "secondary" = "default",
    config?: AxiosRequestConfig,
) => {
    const client = getAxiosInstance(type);
    const res = await client.post<T>(url, data, config);
    return res.data;
};

export const apiDelete = async <T>(url: string, type: "default" | "secondary" = "default") => {
    const client = getAxiosInstance(type);
    const res = await client.delete<T>(url);
    return res.data;
};

export const apiPatch = async <T>(url: string, data?: any, type: "default" | "secondary" = "default") => {
    const client = getAxiosInstance(type);
    const res = await client.patch<T>(url, data);
    return res.data;
};

export const apiPut = async <T>(url: string, data?: any, type: "default" | "secondary" = "default") => {
    const client = getAxiosInstance(type);
    const res = await client.put<T>(url, data);
    return res.data;
};

export const apiRequest = async <T>(
    config: Parameters<Axios["request"]>[0],
    type: "default" | "secondary" = "default",
) => {
    const client = getAxiosInstance(type);
    const res = await client.request<T>(config);
    return res.data;
};
