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

// Add this to your api.ts file - using fetch instead of axios
export const apiPostFileFetch = async <T>(
    url: string,
    formData: FormData,
    type: "default" | "secondary" = "default",
): Promise<T> => {
    const baseURL = type === "secondary" ? SECONDARY_API_BASE_URL : API_BASE_URL;
    const fullUrl = `${baseURL}${url}`;
    const accessToken = tokenManager.getToken();
    
    console.log('📤 Fetch File Upload Debug:');
    console.log('Method: POST');
    console.log('Full URL:', fullUrl);
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
    }
    console.log('Auth token present:', !!accessToken);

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                ...(accessToken && { Authorization: `Token ${accessToken}` }),
                // Don't set Content-Type - let browser set it for FormData
            },
            body: formData,
        });

        console.log('✅ Fetch response status:', response.status);
        console.log('✅ Fetch response ok:', response.ok);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.log('❌ Error response data:', errorData);
            
            if (response.status === 401) {
                const dispatch = store.dispatch;
                dispatch(logout());
            }
            
            const errorMessage = errorData.errorMessage || 
                                convertArrayToString(errorData.message) || 
                                errorData.error || 
                                `Request failed with status ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        if (data?.errorMessage) {
            const errorMessage = data.errorMessage || convertArrayToString(data.message);
            throw new Error(errorMessage);
        }
        
        return data;
    } catch (error) {
        console.log('❌ Fetch failed:', error);
        throw error;
    }
};

export const apiDelete = async <T>(url: string, type: "default" | "secondary" = "default") => {
    const client = getAxiosInstance(type);
    const res = await client.delete<T>(url);
    return res.data;
};

export const apiPatch = async <T>(
    url: string,
    data?: any,
    type: "default" | "secondary" = "default",
    config?: AxiosRequestConfig,
) => {
    const client = getAxiosInstance(type);
    const res = await client.patch<T>(url, data, config);
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
