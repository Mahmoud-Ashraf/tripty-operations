import { createSlice } from '@reduxjs/toolkit';

// let localLang = localStorage.getItem('lang');
// if (!localLang) {
const localLang = 'en'
// }
const initialLangState = { globalLang: localLang, translation: require(`../../assets/json/lang/${localLang}.json`) }


const langSlice = createSlice({
    name: 'lang',
    initialState: initialLangState,
    reducers: {
        translation(state, action) {
            const rootEle = document.getElementById("root-html");
            if (rootEle) {
                if (action.payload.lang === "ar") {
                    rootEle.setAttribute("dir", "rtl");
                }
                if (action.payload.lang === "en") {
                    rootEle.setAttribute("dir", "ltr");
                }
                rootEle.setAttribute("lang", action.payload.lang);
                localStorage.setItem("lang", action.payload.lang);
            }
            state.globalLang = action.payload.lang || state.globalLang;
            state.translation = require(`../../assets/json/lang/${action.payload.lang || state.globalLang}.json`);
        }
    }
})



export const langActions = langSlice.actions;

export default langSlice.reducer;