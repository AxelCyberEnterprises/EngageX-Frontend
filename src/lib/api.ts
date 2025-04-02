import axios, { Axios, AxiosError } from "axios";
import { API_BASE_URL } from "./constants";
import { convertArrayToString, tokenManager } from "./utils";
import store from "../store"; // Import Redux store directly
import { logout } from "../store/slices/authSlice";

const api = axios.create({
    baseURL: API_BASE_URL,
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

export const apiGet = <T = unknown>(...args: Parameters<Axios["get"]>) => api.get<T>(...args).then((r) => r.data);
export const apiPost = <T = unknown>(...args: Parameters<Axios["post"]>) => api.post<T>(...args).then((r) => r.data);
export const apiDelete = <T = unknown>(...args: Parameters<Axios["delete"]>) =>
    api.delete<T>(...args).then((r) => r.data);
export const apiPatch = <T = unknown>(...args: Parameters<Axios["patch"]>) => api.patch<T>(...args).then((r) => r.data);
export const apiRequest = <T = unknown>(...args: Parameters<Axios["request"]>) =>
    api.request<T>(...args).then((r) => r.data);

export default api;
