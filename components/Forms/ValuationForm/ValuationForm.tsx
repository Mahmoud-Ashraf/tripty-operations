import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const ValuationForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();

    return (
        <>
            <MainInput type="text" name="valuation" value={data.valuation} onChange={handleChange} placeholder={translate('placeholder.valuation')} />
        </>
    )
}

export default ValuationForm;