import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const TimeForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();

    return (
        <>
            <MainInput type="time" name="open_at" step="1" value={data.open_at} onChange={handleChange} placeholder={translate('placeholder.open_at')} required />
            <MainInput type="time" name="close_at" step="1" value={data.close_at} onChange={handleChange} placeholder={translate('placeholder.close_at')} required />
        </>
    )
}

export default TimeForm;