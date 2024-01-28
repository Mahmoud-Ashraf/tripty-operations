import MainInput from "@/components/UI/MainInput/MainInput";
import Translate from "@/components/helpers/Translate/Translate";
import useTranslate from "@/hooks/use-translate";

const ValuationForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();

    return (
        <>
            <MainInput type="text" name="overall_rating" value={data.overall_rating} onChange={handleChange} placeholder={translate('placeholder.valuation')} />
            <input type="checkbox" name="trend_now" value={data.trend_now} onChange={handleChange}/> <Translate id='placeholder.trendNow' />
        </>
    )
}

export default ValuationForm;