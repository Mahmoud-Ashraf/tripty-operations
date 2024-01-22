import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";

const store = configureStore({
    reducer: { lang: langReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;