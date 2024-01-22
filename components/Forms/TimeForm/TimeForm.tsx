import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const TimeForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();

    return (
        <>
            <MainInput type="text" name="open_at" value={data.open_at} onChange={handleChange} placeholder={translate('placeholder.open_at')} required />
            <MainInput type="text" name="close_at" value={data.close_at} onChange={handleChange} placeholder={translate('placeholder.close_at')} required />
        </>
    )
}

export default TimeForm;