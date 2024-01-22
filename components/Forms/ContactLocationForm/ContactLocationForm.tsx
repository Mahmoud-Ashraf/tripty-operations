import MainInput from "@/components/UI/MainInput/MainInput";
import MainSelect from "@/components/UI/MainSelect/MainSelect";
import useHTTP from "@/hooks/use-http";
import useTranslate from "@/hooks/use-translate";
import { useEffect, useState } from "react";

const ContactLocationForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();
    const { isLoading, error, sendRequest } = useHTTP();
    const [cities, setCities] = useState<any>([]);
    const getCities = () => {
        sendRequest(
            {
                url: 'front/cities',
                method: 'GET'
            },
            (data: any) => setCities(data.data),
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        getCities();
    }, [])
    return (
        <>
            <MainInput type="text" name="tel" value={data.tel} onChange={handleChange} placeholder={translate('placeholder.tel')} required />
            <MainInput type="text" name="long" value={data.long} onChange={handleChange} placeholder={translate('placeholder.long')} required />
            <MainInput type="text" name="lat" value={data.lat} onChange={handleChange} placeholder={translate('placeholder.lat')} required />
            <MainSelect options={cities.map((city: any) => { return { value: city.id, label: city.name } })} name="city_id" onChange={handleChange} placeholder={translate('placeholder.city')} required />
        </>
    )
}

export default ContactLocationForm;