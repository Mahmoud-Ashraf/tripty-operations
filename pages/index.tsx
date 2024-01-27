/* eslint-disable react-hooks/exhaustive-deps */
import Card from '@/components/UI/Card/Card'
import useHTTP from '@/hooks/use-http';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import classes from '@/styles/Home.module.scss';
import Translate from '@/components/helpers/Translate/Translate';
import NoData from '@/components/UI/NoData/NoData';
import Loader from '@/components/UI/Loader/Loader';
import Header from '@/components/layout/Header/Header';

export default function Home() {
  const { isLoading, error, sendRequest } = useHTTP();
  const router = useRouter();
  const [places, setPlaces] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [tabs, setTabs] = useState<any>([]);
  const [tabPlaces, setTabPlaces] = useState<any>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getPlaces = () => {
    sendRequest(
      {
        url: `/api/places`,
        method: 'GET'
      },
      (data: any) => {
        const placesKeys = Object.keys(data);
        setPlaces(data);
        setTabs(placesKeys);
        setSelectedTab(placesKeys[0]);
      },
      (err: any) => console.error(err)
    )
  }

  useEffect(() => {
    getPlaces();
  }, [router.locale]);

  useEffect(() => {
    setTabPlaces(places[selectedTab]);
  }, [selectedTab])
  return (
    <>
      <Head>
        <title>Tripty - Operations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isLoading && <Loader full />}
      <div className="container">

        <div className="row">
          <div className="col-12">
            <div className={classes.tabs}>
              {
                tabs?.map((tab: any) => {
                  return (
                    <div key={tab} className={`${classes.tab} ${selectedTab === tab ? classes.selected : ''}`} onClick={() => setSelectedTab(tab)}>
                      <Translate id={`tabs.${tab}`} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-12">
            {
              tabPlaces?.length > 0 ?
                tabPlaces?.map((place: any) => {
                  return (
                    <Card key={place.id} place={place} onClick={() => router.push(`/editplace/${place.id}`)} />
                  )
                })
                :
                <NoData />
            }
          </div>
        </div>
      </div>
    </>
  )
}
