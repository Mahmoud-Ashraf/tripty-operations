import { useState } from 'react';
import classes from './header.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import Translate from '@/components/helpers/Translate/Translate';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();
    const [selectedLang, setSlectedLang] = useState(router.locale);

    const changeLanguage = async (lang: string) => {
        console.log(lang);
        try {
            const replace = await router.replace(router.asPath, router.asPath, { locale: lang });
            if (replace) {
                setSlectedLang(lang);
                router.reload();
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <header className={classes.container}>
            <div className={classes.icons}>
                <svg onClick={() => router.back()} style={{ transform: router.locale === 'ar' ? 'rotate(180deg)' : '' }} xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49">
                    <g id="Group_250" data-name="Group 250" clipPath='url(#clip-path)' transform="translate(49.656 48.736) rotate(180)">
                        <path id="Path_313" data-name="Path 313" fillRule='evenodd' fill='#FFF' d="M325,560.924a.692.692,0,0,1,.691-.692h13.831a.692.692,0,1,1,0,1.383H325.691A.691.691,0,0,1,325,560.924Z" transform="translate(-307.749 -536.557)" />
                        <path id="Path_314" data-name="Path 314" fillRule='evenodd' fill='#FFF' d="M331.794,556.077a.692.692,0,0,1,.937-.28l-.327.609.327-.609h.006l.014.007.05.028.186.1c.157.09.382.221.65.386a23.782,23.782,0,0,1,1.977,1.352,12.462,12.462,0,0,1,2.032,1.9,3.271,3.271,0,0,1,0,4.762,12.415,12.415,0,0,1-2.032,1.9,23.535,23.535,0,0,1-1.977,1.354c-.268.165-.493.3-.65.387l-.186.1-.05.027-.014.007,0,0h0s0,0-.328-.607l.328.607a.691.691,0,1,1-.658-1.216h0l0,0,.011,0,.043-.023.168-.1c.148-.084.359-.208.613-.364a22.187,22.187,0,0,0,1.859-1.273,11.113,11.113,0,0,0,1.8-1.679,1.939,1.939,0,0,0,0-3.011,11.056,11.056,0,0,0-1.8-1.678,22.126,22.126,0,0,0-1.859-1.271c-.254-.157-.466-.28-.613-.365-.073-.042-.13-.074-.168-.095l-.043-.023-.01-.006h0m-.282-.937a.692.692,0,0,0,.282.937Z" transform="translate(-306.208 -537.594)" />
                    </g>
                </svg>
                <select className={classes.lang} value={selectedLang} onChange={(e) => changeLanguage(e.target.value)}>
                    <option value={'ar'} key={'ar'}>{'ar'}</option>
                    <option value={'en'} key={'en'}>{'en'}</option>
                </select>
            </div>
            <div className={classes.welcome}>
                <h3><Translate id="header.hello" /></h3>
                <h6>Mahmoud Taha</h6>
            </div>
            <div className={classes.actions}>
                <Link href={'/new-place'} className='btn btn-white w-100 btn-lg text-main'><Translate id="buttons.addPlace" /></Link>
            </div>

        </header>
    )
};

export default Header;