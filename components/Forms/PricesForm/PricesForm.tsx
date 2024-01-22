import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const PricesForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();
    return (
        <>
            <MainInput type="text" name="min_price" value={data.min_price} onChange={handleChange} placeholder={translate('placeholder.min_price')} required />
            <MainInput type="text" name="max_price" value={data.max_price} onChange={handleChange} placeholder={translate('placeholder.max_price')} required />
        </>
    )
}

export default PricesForm;