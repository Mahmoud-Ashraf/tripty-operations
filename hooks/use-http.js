import { useCallback, useState } from "react";
// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { useSession, getSession } from "next-auth/react"

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const lang = useSelector(state => state.lang.globalLang);
    const router = useRouter();

    const getSession = async () => {
        const sessionData = sessionStorage.getItem('userData');
        if (sessionData) {
            const parsedSessionData = JSON.parse(sessionData);
            return parsedSessionData;
        } else {
            return null;
        }
    }

    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        let token = '';
        const session = await getSession();
        token = session?.token;
        setIsLoading(true);
        setError(null);
        let url = baseUrl + requestConfig.url;
        // let contentTypeHeader = requestConfig.method === 'POST' && requestConfig.headers ? requestConfig.headers : {};
        let tokenHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
        console.log('token useHttp(): ', tokenHeader);
        // if (requestConfig.method === 'GET' || url.includes('/api/trip/create')) {
        const newUrl = new URL(url);
        newUrl.searchParams.set(`change_language`, `${router.locale || 'ar'}`);
        url = newUrl.toString();
        // }
        try {
            const response = await fetch(
                url,
                {
                    method: requestConfig.method,
                    headers: { ...tokenHeader, ...requestConfig.headers },
                    body: (requestConfig.method === 'POST' && requestConfig.headers && requestConfig.headers['Content-Type'] === 'application/json') ? JSON.stringify(requestConfig.body) : requestConfig.body

                    // body: requestConfig?.headers && requestConfig?.headers['Content-Type'] ? requestConfig?.body : JSON.stringify(requestConfig.body)
                }
            );
            if (!response.ok) {
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.message);
                } else {
                    throw new Error('Request Failed');
                }
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(`${data.message}  ${data.errors ? ('(' + data.errors.join(', ') + ')') : ''}`);
            }
            applyData(data);
        } catch (err) {
            setError(err.message);
            applyError(err.message);
        }
        setIsLoading(false);
    }, [router?.locale]);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;