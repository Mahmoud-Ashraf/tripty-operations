import { useRouter } from 'next/router';
// import classes from './new-place.module.scss';
import AddPlace from '@/components/AddPlace/AddPlace';
import useHTTP from '@/hooks/use-http';
import { useEffect, useState } from 'react';

const EditPlace = () => {
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHTTP();
    const { placeId } = router.query;
    const [place, setPlace] = useState();


    const getPlace = () => {
        sendRequest(
            {
                url: `/api/places/${placeId}`,
                method: 'GET'
            },
            (data: any) => {
                console.log({ ...data, city_id: data.city.id, categories: data.category.id, logo: [data.logo], featured_image: [data.featured_image], horizontal_video: [data.horizontal_video], vertical_video: [data.vertical_video] })
                setPlace({ ...data, city_id: data.city.id, categories: data.category.id, logo: [data.logo], featured_image: [data.featured_image], horizontal_video: [data.horizontal_video], vertical_video: [data.vertical_video] })
            },
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        if (placeId)
            getPlace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeId])
    return (
        <div>
            <AddPlace place={place} />
        </div>
    )
}

export default EditPlace;