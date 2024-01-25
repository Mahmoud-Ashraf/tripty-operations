import MainInput from "@/components/UI/MainInput/MainInput";
import MainSelect from "@/components/UI/MainSelect/MainSelect";
import useHTTP from "@/hooks/use-http";
import useTranslate from "@/hooks/use-translate";
import { useEffect, useState } from "react";

const ContactLocationForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();
    const { isLoading, error, sendRequest } = useHTTP();
    const [cities, setCities] = useState<any>([]);
    const [currentLocation, setCuurentLocation] = useState<any>();
    const getCities = () => {
        sendRequest(
            {
                url: '/api/cities',
                method: 'GET'
            },
            (data: any) => setCities(data),
            (err: any) => console.error(err)
        )
    }

    const getCurrentLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Retrieve the latitude and longitude from the position object
                    console.log('coords: ', position.coords);
                    const { latitude, longitude } = position.coords;
                    data.lat = latitude;
                    data.long = longitude;
                    // setCuurentLocation({ lat: latitude, long: longitude });
                },
                (error) => {
                    // Handle any errors that occur while retrieving the location
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    useEffect(() => {
        getCities();
        getCurrentLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <MainInput type="text" name="tel" value={data.tel} onChange={handleChange} placeholder={translate('placeholder.tel')} required />
            <MainInput type="text" name="long" value={data.long} onChange={handleChange} placeholder={translate('placeholder.long')} required />
            <MainInput type="text" name="lat" value={data.lat} onChange={handleChange} placeholder={translate('placeholder.lat')} required />
            <MainInput type="text" name="location_url" value={data.location_url} onChange={handleChange} placeholder={translate('placeholder.location_url')} required />
            <MainSelect value={data.city || data.city_id || null} options={cities.map((city: any) => { return { value: city.id, label: city.name } })} name="city_id" onChange={handleChange} placeholder={translate('placeholder.city')} required />
        </>
    )
}

export default ContactLocationForm;