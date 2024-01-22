import { ChangeEvent, useEffect, useRef, useState } from 'react';
import SubHeading from '../UI/SubHeading/SubHeading';
import classes from './add-place.module.scss';
// import MainInput from '../UI/MainInput/MainInput';
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

const AddPlace = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const formRef = useRef<HTMLFormElement>(null);
    // const contactFormRef = useRef<HTMLFormElement>(null);
    const [placeData, setPlaceData] = useState({
        name: '',
        name_ar: '',
        about_ar: '',
        about: '',
        tel: '',
        long: '',
        lat: '',
        city_id: '',
        categories: [],
        subCategories: [],
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
    });
    // const [infoFormData, setInfoFormData] = useState({ ['english-name']: '', ['arabic-name']: '' });
    // const [contactFormData, setContactFormData] = useState({ ['english-name']: '', ['arabic-name']: '' });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        // if (typeof (placeData[name as keyof typeof placeData]) !== 'string') {
        //     console.log('type not string')
        // }
        // if (placeData[name])
        // if (!selectedValues.includes(selectedValue)) {
        //     setSelectedValues([...selectedValues, selectedValue]);
        //   }
        setPlaceData({ ...placeData, [name]: value });
    }
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setPlaceData({ ...placeData, [name]: files });
    }

    const addPlace = () => {
        storePlace();
        // const form = formRef.current;
        // console.log(form?.elements);
        // if (form) {
        //     const formData = new FormData(form);
        //     const form1Values = Object.fromEntries(formData.entries());
        //     console.log(form1Values);
        // }
    }

    const storePlace = () => {
        const body = convertToFormData(placeData)
        sendRequest(
            {
                url: 'admin/places',
                method: 'POST',
                body,
                // headers: {
                //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                // },
            },
            (data: any) => console.log(data),
            (err: any) => console.error(err)
        )
    }

    const convertToFormData = (data: any) => {
        const formData = new FormData();
        console.log(data);

        // Iterate over the object properties
        for (const key in data) {
            // if (data.hasOwnProperty(key)) {
            // Check if the value is a File object (from file input)
            if (data[key] instanceof FileList) {
                // Append each file to the FormData
                if (data[key].length > 1) {
                    for (let i = 0; i < data[key].length; i++) {
                        formData.append(`${key}[${i}]`, data[key][i]);
                    }
                } else {
                    formData.append(key, data[key][0]);
                }
            } else {
                if (data[key] instanceof Array) {
                    for (let i = 0; i < data[key].length; i++) {
                        formData.append(`${key}[${i}]`, data[key][i]);
                    }
                } else if (key === 'categories') {
                    formData.append(`${key}[0]`, data[key]);
                }
                else {
                    // Append regular key-value pairs to the FormData
                    formData.append(key, data[key]);
                }
            }
            // }
        }
        console.log(formData);
        return formData;
    };

    useEffect(() => {
        console.log(placeData);
    }, [placeData])
    return (
        <div className={classes.container}>
            <Head>
                <title>Tripty - Operations - Add New Place</title>
            </Head>
            <form ref={formRef}>
                <SubHeading text="subheadings.generalInfo" />
                <GeneralInfoForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.contactAndLocation" />
                <ContactLocationForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.media" />
                <MediaForm data={placeData} handleChange={handleFileInputChange} />

                <SubHeading text="subheadings.menu" />
                <MenuForm data={placeData} handleChange={handleInputChange} handleFileChange={handleFileInputChange} />

                <SubHeading text="subheadings.categories" />
                <CategoryForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.time" />
                <TimeForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.prices" />
                <PricesForm data={placeData} handleChange={handleInputChange} />

                <SubHeading text="subheadings.valuation" />
                <ValuationForm data={placeData} handleChange={handleInputChange} />

                <p className='text-error'>{error}</p>
                <button onClick={addPlace} className="btn btn-main btn-lg w-100"><Translate id="buttons.addPlace" /></button>
            </form>
        </div>
    )
}

export default AddPlace;