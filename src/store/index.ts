import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["dynamicDialog/openDialog"],
                ignoredPaths: ["dynamicDialog.data.children"],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
