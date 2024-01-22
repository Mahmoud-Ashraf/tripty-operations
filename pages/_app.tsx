import Layout from '@/components/layout/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps, router }: AppProps) {
  const routesWithoutLayout = ['/auth'];
  let shouldNotUseLayout = false;
  routesWithoutLayout.forEach(route => {
    if (router.pathname.includes(route)) {
      shouldNotUseLayout = true;
      return;
    }
  });
  
  return (
    <>
      {
        shouldNotUseLayout ?
          <Component {...pageProps} />
          :
          <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </>
  )

}
