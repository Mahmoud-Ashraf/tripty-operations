import { useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import classes from './layout.module.scss';
import { useRouter } from 'next/router';

const Layout = ({ children }: any) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(true);;

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            router.push('/auth/login');
        } else {
            setIsloading(false);
        }
    }, []);
    return (
        !isLoading &&
        <div className={`${classes.container} mb-4`}>
            <Header />
            <div className={classes.content}>
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;