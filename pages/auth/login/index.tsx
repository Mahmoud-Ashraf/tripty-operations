import Head from 'next/head';
import classes from './login.module.scss';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import MainInput from '@/components/UI/MainInput/MainInput';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.svg';
import useHTTP from '@/hooks/use-http';
import { useRouter } from 'next/router';

const Login = () => {
    const { translate } = useTranslate();
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHTTP();
    const [loginError, setLoginError] = useState('');
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const formRef = useRef<HTMLFormElement>(null);

    const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let loginDataMissing = '';
        const values: string[] = Object.values(loginData);

        // Loop through the values
        values.forEach(value => {
            if (!value) {
                loginDataMissing = 'complete missing data';
            }
        });

        if (loginDataMissing) {
            setLoginError(loginDataMissing);
        } else {
            sendRequest(
                {
                    url: '/api/auth/login',
                    method: 'POST',
                    body: loginData,
                    headers: {
                        "Content-Type": 'application/json'
                    }
                },
                (data: any) => {
                    setLoginError('');
                    sessionStorage.setItem('userData', JSON.stringify(data?.data));
                    router.push('/');
                },
                (err: any) => setLoginError(err)
            )
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            if (parsedUserData) {
                router.push('/');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Head>
                <title>Tripty - Operations - Login</title>
            </Head>
            <form className={classes.form} ref={formRef} onSubmit={handleSignIn}>
                <div className={classes.formTop}>
                    <Link href={'/'} className={classes.logo}>
                        <Image loading='lazy' alt='Tripty Logo' src={logo} />
                    </Link>
                    <h1>
                        <Translate id='auth.login' />
                    </h1>
                    <MainInput view="underline" name="email" type="email" placeholder={translate('placeholder.email')} value={loginData.email} onChange={handleInputChange} required />
                    <MainInput view="underline" name="password" type="password" placeholder={translate('placeholder.password')} value={loginData.password} onChange={handleInputChange} required />
                    {loginError && <p className={'text-error'}>{loginError}</p>}
                </div>
                {/* <Form.Group className="d-flex justify-content-between">
                    <Link href={'/auth/forget-password'}><Translate id='auth.forgetPassword' /></Link>
                </Form.Group> */}
                <div className={`${classes.submit}`}>
                    <button type='submit' className='btn btn-main w-100 btn-lg'>
                        {/* {
                            isLoading ?
                                <Loader />
                                : */}
                        <Translate id='buttons.login' />
                        {/* } */}
                    </button>
                </div>
            </form>

            {/* <Link href={'/auth/register'} className={classes.register}><Translate id='auth.registerWithMail' /></Link> */}
        </>
    )
}

export default Login;