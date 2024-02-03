import MainInput from "@/components/UI/MainInput/MainInput";
import Translate from "@/components/helpers/Translate/Translate";
import useTranslate from "@/hooks/use-translate";

const ValuationForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();

    const handleCheckChange = (e: any) => {
        handleChange({ target: { value: e.target.checked ? 1 : 0, name: e.target.name } });
    }

    return (
        <>
            <MainInput type="text" name="overall_rating" value={data.overall_rating} onChange={handleChange} placeholder={translate('placeholder.valuation')} />
            <input type="checkbox" name="trend_now" checked={!!data.trend_now} onChange={handleCheckChange} /> <Translate id='placeholder.trendNow' />
        </>
    )
}

export default ValuationForm;