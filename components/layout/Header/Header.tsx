import { useEffect, useState } from 'react';
import classes from './header.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import Translate from '@/components/helpers/Translate/Translate';
import Link from 'next/link';
import Dropdown from '@/components/UI/Dropdown/Dropdown';
import useHTTP from '@/hooks/use-http';

const Header = ({ place }: any) => {
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHTTP();
    const [selectedLang, setSlectedLang] = useState(router.locale);
    const [userData, setUserData] = useState<any>();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const changeLanguage = async (lang: string) => {
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

    // const getUserData = () => {
    //     getSession();
    // }

    const getNotifications = () => {
        sendRequest(
            {
                url: '/api/notifications',
                method: 'GET'
            },
            (data: any) => {
                setNotifications(sortNotifications(data));
                setUnreadCount(data?.filter((notification: any) => !notification.read_at)?.length)
            },
            (err: any) => console.error(err)
        )
    }
    const getSession = () => {
        const sessionData = sessionStorage.getItem('userData');
        if (sessionData) {
            const parsedSessionData = JSON.parse(sessionData);
            return parsedSessionData;
        } else {
            return null;
        }
    }

    const handleNotificationClick = async (notification: any) => {
        await sendRequest(
            {
                url: `/api/notifications/${notification.id}`,
                method: 'GET'
            },
            (data: any) => getNotifications(),
            (err: any) => console.error(err)
        )
        router.push(`/editplace/${notification.place_id}`);
    }

    const sortNotifications = (notifications: any) => {
        const sortedData = notifications.sort((a: any, b: any) => {
            const dateA = a.read_at ? new Date(a.read_at) : null;
            const dateB = b.read_at ? new Date(b.read_at) : null;
            if (!dateA && !dateB) {
                return 0;
            }
            if (!dateB) {
                return -1;
            }
            if (!dateA) {
                return 1;
            }
            return dateA.getTime() - dateB.getTime();
        });
        return sortedData;
    }

    useEffect(() => {
        setUserData(getSession());
        getNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <header className={classes.container}>
            <div className={classes.icons}>
                <div className={classes.start}>
                    <svg onClick={() => router.back()} style={{ transform: router.locale === 'ar' ? 'rotate(180deg)' : '' }} xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49">
                        <g id="Group_250" data-name="Group 250" clipPath='url(#clip-path)' transform="translate(49.656 48.736) rotate(180)">
                            <path id="Path_313" data-name="Path 313" fillRule='evenodd' fill='#FFF' d="M325,560.924a.692.692,0,0,1,.691-.692h13.831a.692.692,0,1,1,0,1.383H325.691A.691.691,0,0,1,325,560.924Z" transform="translate(-307.749 -536.557)" />
                            <path id="Path_314" data-name="Path 314" fillRule='evenodd' fill='#FFF' d="M331.794,556.077a.692.692,0,0,1,.937-.28l-.327.609.327-.609h.006l.014.007.05.028.186.1c.157.09.382.221.65.386a23.782,23.782,0,0,1,1.977,1.352,12.462,12.462,0,0,1,2.032,1.9,3.271,3.271,0,0,1,0,4.762,12.415,12.415,0,0,1-2.032,1.9,23.535,23.535,0,0,1-1.977,1.354c-.268.165-.493.3-.65.387l-.186.1-.05.027-.014.007,0,0h0s0,0-.328-.607l.328.607a.691.691,0,1,1-.658-1.216h0l0,0,.011,0,.043-.023.168-.1c.148-.084.359-.208.613-.364a22.187,22.187,0,0,0,1.859-1.273,11.113,11.113,0,0,0,1.8-1.679,1.939,1.939,0,0,0,0-3.011,11.056,11.056,0,0,0-1.8-1.678,22.126,22.126,0,0,0-1.859-1.271c-.254-.157-.466-.28-.613-.365-.073-.042-.13-.074-.168-.095l-.043-.023-.01-.006h0m-.282-.937a.692.692,0,0,0,.282.937Z" transform="translate(-306.208 -537.594)" />
                        </g>
                    </svg>
                </div>
                <div className={classes.end}>

                    <Dropdown direction={'ste'} trigger={
                        <div className={'position-relative'}>
                            <svg data-name="Group 4" xmlns="http://www.w3.org/2000/svg" width="24.233" height="27.903" viewBox="0 0 24.233 27.903">
                                <defs>
                                    <clipPath id="ewq3roboga">
                                        <path data-name="Rectangle 5" fill="#fff" d="M0 0h24.233v27.903H0z" />
                                    </clipPath>
                                </defs>
                                <g data-name="Group 3" clipPath="url(#ewq3roboga)">
                                    <path data-name="Path 8" d="M12.072 23.175H.6c-.324 0-.476-.1-.565-.348a.483.483 0 0 1 .089-.5c.285-.336.581-.662.869-1 .264-.307.521-.62.783-.929.2-.233.4-.459.593-.7a.409.409 0 0 0 .092-.235q.007-4.092 0-8.184c0-.242-.019-.486 0-.727A11.7 11.7 0 0 1 2.988 7.8a8.585 8.585 0 0 1 .769-1.67 9.932 9.932 0 0 1 1.277-1.722 9.531 9.531 0 0 1 1.858-1.562A9.332 9.332 0 0 1 9.1 1.795a8.487 8.487 0 0 1 1.685-.382.271.271 0 0 0 .041-.013c.092-.026.22-.024.265-.084s.014-.185.009-.28a1.008 1.008 0 0 1 .722-1 1.038 1.038 0 0 1 1.222.558 1.288 1.288 0 0 1 .088.521c0 .263 0 .267.255.3A9.764 9.764 0 0 1 17.7 3.09a8.906 8.906 0 0 1 1.561 1.38 9.228 9.228 0 0 1 1.751 2.75 12.489 12.489 0 0 1 .476 1.4 7.568 7.568 0 0 1 .216 1.236c.052.533.078 1.07.079 1.605q.011 3.918 0 7.835a.751.751 0 0 0 .193.555c.284.31.558.629.831.949.332.387.658.779.988 1.168.084.1.171.2.258.294a.527.527 0 0 1 .145.571.513.513 0 0 1-.534.341H12.072m.546-20.311c-.063-.092-.137-.067-.214-.021h-.725l-.062.022a6.321 6.321 0 0 0-1.461.218 7.358 7.358 0 0 0-1.516.531 8.242 8.242 0 0 0-1.856 1.219 8.327 8.327 0 0 0-1.292 1.417A8.049 8.049 0 0 0 4.013 10.2c-.031.316-.023.636-.024.955v8.3a.337.337 0 0 1-.038.183 115.172 115.172 0 0 1-1.484 1.991h19.306c-.046-.054-.078-.086-.1-.121-.426-.575-.846-1.154-1.283-1.721a.558.558 0 0 1-.126-.369v-8.274c0-.141 0-.283-.007-.424v-.035c-.01-.112-.021-.225-.028-.337a8.139 8.139 0 0 0-.294-1.621 7.8 7.8 0 0 0-.885-2.021 7.982 7.982 0 0 0-1.585-1.863 7.709 7.709 0 0 0-1.635-1.105 7.968 7.968 0 0 0-1.409-.554 8.531 8.531 0 0 0-1.8-.321" fill="#fff" />
                                    <path data-name="Path 9" d="M32.231 112.09h1.515a1.824 1.824 0 0 0 1.056 1.416 4.711 4.711 0 0 0 1.85.6 5.909 5.909 0 0 0 1.606-.051 4.726 4.726 0 0 0 1.406-.435 2.258 2.258 0 0 0 1.086-.913 5.444 5.444 0 0 0 .245-.617h1.455a1.948 1.948 0 0 1-.112.812 3.185 3.185 0 0 1-1.03 1.469 5.36 5.36 0 0 1-1.793.955 5.017 5.017 0 0 1-1.227.265c-.383.03-.768.062-1.151.06a6.144 6.144 0 0 1-1.882-.29 5.6 5.6 0 0 1-1.695-.852 3.288 3.288 0 0 1-1.244-1.751 4.588 4.588 0 0 1-.084-.671" transform="translate(-25.232 -87.751)" fill="#fff" />
                                    <path data-name="Path 10" d="m57.338 12.962-.214-.021c.076-.046.151-.071.214.021" transform="translate(-44.72 -10.099)" fill="#fff" />
                                    <path data-name="Path 11" d="m53.56 13.087-.062.022.062-.022" transform="translate(-41.882 -10.245)" fill="#fff" />
                                    <path data-name="Path 12" d="m93.2 49.249-.023-.01.022-.025v.035" transform="translate(-72.942 -38.528)" fill="#fff" />
                                </g>
                            </svg>
                            {unreadCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-error">
                                {unreadCount}
                                <span className="visually-hidden">unread notifications</span>
                            </span>}
                        </div>
                    }>
                        {
                            notifications?.map((notification: any) => {
                                return (
                                    <div key={notification?.id} className={classes.notification} onClick={() => handleNotificationClick(notification)}>
                                        {!notification.read_at && <div className={classes.unread} />}<span>{notification?.message}</span>
                                    </div>
                                )
                            })
                        }
                        {/* <Link href="/home">
                            <Translate id={'header.home'} />
                        </Link>
                        <Link href="/about">
                            <Translate id={'header.about'} />
                        </Link>
                        <Link href="/places">
                            <Translate id={'header.places'} />
                        </Link>
                        <Link href="/tourism-packages">
                            <Translate id={'header.tourismPackages'} />
                        </Link>
                        <Link href="" onClick={openModal}>
                            <Translate id='buttons.startTrip' />
                        </Link> */}

                    </Dropdown>
                    <select className={classes.lang} value={selectedLang} onChange={(e) => changeLanguage(e.target.value)}>
                        <option value={'ar'} key={'ar'}>{'ar'}</option>
                        <option value={'en'} key={'en'}>{'en'}</option>
                    </select>
                </div>
            </div >
            <div className={classes.welcome}>
                <h3><Translate id="header.hello" /></h3>
                <h6>{userData?.user?.name}</h6>
            </div>
            {
                place ?
                    <div className={classes.place}>
                        <p className={classes.placeName}>{place.name}</p>
                        <p className={`${classes.placeStatus} ${classes[place.status]}`}><Translate id={`tabs.${place.status}`} /></p>
                    </div>
                    :
                    <div className={classes.actions}>
                        {
                            router.pathname.includes('newplace') ?
                                <p><Translate id="buttons.addPlace" /></p>
                                :
                                <Link href={'/newplace'} className='btn btn-white w-100 btn-lg text-main'><Translate id="buttons.addPlace" /></Link>
                        }
                    </div>
            }

        </header >
    )
};

export default Header;