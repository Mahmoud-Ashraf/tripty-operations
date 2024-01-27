import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import SubHeading from '../UI/SubHeading/SubHeading';
import classes from './add-place.module.scss';
import Translate from '../helpers/Translate/Translate';
import Head from 'next/head';
import GeneralInfoForm from '../Forms/GeneralInfoForm/GeneralInfoForm';
import ContactLocationForm from '../Forms/ContactLocationForm/ContactLocationForm';
import CategoryForm from '../Forms/CategoryForm/CategoryForm';
import TimeForm from '../Forms/TimeForm/TimeForm';
import PricesForm from '../Forms/PricesForm/PricesForm';
import ValuationForm from '../Forms/ValuationForm/ValuationForm';
import MediaForm from '../Forms/MediaForm/MediaForm';
import useHTTP from '@/hooks/use-http';
import MenuForm from '../Forms/MenuForm/MenuForm';
import Loader from '../UI/Loader/Loader';
import { useRouter } from 'next/router';

const AddPlace = ({ place }: any) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const initialPlace = {
        name: '',
        name_ar: '',
        about_ar: '',
        about: '',
        tel: '',
        long: '',
        lat: '',
        location_url: '',
        city_id: '',
        main_category: [],
        sub_cats: [],
        tags: [],
        open_at: '',
        close_at: '',
        min_price: '',
        max_price: '',
        valuation: '',
        logo: [],
        featured_image: [],
        gallery: [],
        horizontal_video: [],
        vertical_video: [],
        menu_images: [],
        menu_url: ''
    }
    const [placeData, setPlaceData] = useState(initialPlace);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        const { name, value } = e.target;
        setPlaceData({ ...placeData, [name]: value });
    }
    // const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, files } = e.target;
    //     setPlaceData({ ...placeData, [name]: files });
    // }

    const addPlace = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (place) {
            await updatePlace();
        } else {
            await storePlace();
        }
    }

    const storePlace = async () => {
        const body = convertToFormData(placeData)
        await sendRequest(
            {
                url: `${baseUrl}admin/places`,
                method: 'POST',
                body
            },
            (data: any) => setPlaceData(initialPlace),
            (err: any) => console.error(err)
        )
    }

    const updatePlace = async () => {
        const body = convertToFormData(placeData)
        await sendRequest(
            {
                url: `${baseUrl}admin/places/${place?.id}`,
                method: 'POST',
                body
            },
            (data: any) => router.push('/'),
            (err: any) => console.error(err)
        )
    }

    const convertToFormData = (data: any) => {
        const formData = new FormData();

        // Iterate over the object properties
        for (const key in data) {
            // // Check if the value is a File object (from file input)
            // if (data[key] instanceof FileList) {
            //     // Append each file to the FormData
            //     if (data[key].length > 1) {
            //         for (let i = 0; i < data[key].length; i++) {
            //             formData.append(`${key}[${i}]`, data[key][i]);
            //         }
            //     } else {
            //         formData.append(key, data[key][0]);
            //     }
            // } else {
            //     if (data[key] instanceof Array) {
            //         for (let i = 0; i < data[key].length; i++) {
            //             formData.append(`${key}[${i}]`, data[key][i]);
            //         }
            //     } else if (key === 'categories') {
            //         formData.append(`${key}[0]`, data[key]);
            //     }
            //     else {
            //         // Append regular key-value pairs to the FormData
            //         formData.append(key, data[key]);
            //     }
            // }

            if (data[key] instanceof Array) {
                if (data[key].some((item: any) => item instanceof File)) {
                    if (key === 'gallery' || key === 'menu_images') {
                        for (let i = 0; i < data[key].length; i++) {
                            formData.append(`${key}[${i}]`, data[key][i]);
                        }
                    } else {
                        formData.append(`${key}`, data[key][0]);
                    }
                } else {
                    for (let i = 0; i < data[key].length; i++) {
                        formData.append(`${key}[${i}]`, data[key][i]);
                    }
                }
            } else {
                if (key === 'categories') {
                    formData.append(`${key}[0]`, data[key]);
                } else {
                    formData.append(`${key}`, data[key]);
                }
            }
        }
        return formData;
    };

    useEffect(() => {
        if (place)
            setPlaceData(place)
    }, [place])

    return (
        <div className={classes.container}>
            <Head>
                <title>Tripty - Operations - Add New Place</title>
            </Head>
            {isLoading && <Loader full />}
            <form ref={formRef} onSubmit={addPlace}>
                <SubHeading text="subheadings.generalInfo" />
                <GeneralInfoForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.contactAndLocation" />
                <ContactLocationForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.media" />
                <MediaForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.menu" />
                <MenuForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.categories" />
                <CategoryForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.time" />
                <TimeForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.prices" />
                <PricesForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.valuation" />
                <ValuationForm data={placeData} handleChange={handleInputChange} />

                <p className='text-error'>{error}</p>
                <button className="btn btn-main btn-lg w-100">{place ? <Translate id="buttons.updatePlace" /> : <Translate id="buttons.addPlace" />}</button>
            </form>

        </div>
    )
}

export default AddPlace;