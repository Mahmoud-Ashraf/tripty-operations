import { useRouter } from 'next/router';
import classes from './place.module.scss';
import AddPlace from '@/components/AddPlace/AddPlace';
import useHTTP from '@/hooks/use-http';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header/Header';
import Loader from '@/components/UI/Loader/Loader';

const EditPlace = () => {
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHTTP();
    const { placeId } = router.query;
    const [place, setPlace] = useState<any>();


    const getPlace = () => {
        sendRequest(
            {
                url: `/api/places/${placeId}`,
                method: 'GET'
            },
            (data: any) => {
                console.log({ ...data, tags: data.tags.map((tag: any) => tag.id), sub_cats: data.sub_cats.map((sub_cat: any) => sub_cat.id), city_id: data.city.id, main_category: data.category.id, logo: [data.logo], featured_image: [data.featured_image], horizontal_video: [data.horizontal_video], vertical_video: [data.vertical_video] })
                setPlace({ ...data, tags: data.tags.map((tag: any) => tag.id), sub_cats: data.sub_cats.map((sub_cat: any) => sub_cat.id), city_id: data.city.id, main_category: data.category.id, logo: [data.logo], featured_image: [data.featured_image], horizontal_video: [data.horizontal_video], vertical_video: [data.vertical_video] })
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
            <Header place={place} />
            {isLoading && <Loader full />}
            <div className="container">
                {
                    place?.status === 'rejected' && place?.admin_comment &&
                    <div className={classes.rejected}>
                        <p className='text-error'>{place?.admin_comment}</p>
                    </div>
                }
                <AddPlace place={place} />
            </div>
        </div>
    )
}

export default EditPlace;