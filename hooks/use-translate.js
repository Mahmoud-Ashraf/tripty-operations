import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux'

const useTranslate = (text) => {
    const router = useRouter();
    const translation = require(`@/assets/json/lang/${router.locale}.json`);
    // let translatedText = { ...translation };
    // const objDirArr = text?.split('.');
    // for (let i = 0; i < objDirArr?.length; i++) {
    //     if (!translatedText[objDirArr[i]]) {
    //         translatedText = text;
    //         break;
    //     }
    //     translatedText = translatedText[objDirArr[i]];
    // }
    // return translatedText;

    const translate = (text) => {
        let translatedText = { ...translation };
        const objDirArr = text?.split('.');
        for (let i = 0; i < objDirArr?.length; i++) {
            if (!translatedText[objDirArr[i]]) {
                translatedText = text;
                break;
            }
            translatedText = translatedText[objDirArr[i]];
        }
        return translatedText;
    };
    return { translate }
}

export default useTranslate;