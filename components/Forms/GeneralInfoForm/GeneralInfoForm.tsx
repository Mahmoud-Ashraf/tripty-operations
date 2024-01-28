import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const GeneralInfoForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();
    return (
        <>
            <MainInput type="text" name="name" value={data.name} onChange={handleChange} placeholder={translate('placeholder.name')} required />
            <MainInput type="text" name="name_ar" value={data.name_ar} onChange={handleChange} placeholder={translate('placeholder.name_ar')} required />
            <MainInput type="text" name="about_ar" value={data.about_ar} onChange={handleChange} placeholder={translate('placeholder.about_ar')} required />
            <MainInput type="text" name="about" value={data.about} onChange={handleChange} placeholder={translate('placeholder.about')} required />
            <MainInput type="text" name="booking_link" value={data.booking_link} onChange={handleChange} placeholder={translate('placeholder.booking_link')} />
        </>
    )
}

export default GeneralInfoForm;