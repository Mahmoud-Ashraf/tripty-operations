import useTranslate from "../../../hooks/use-translate";

export const Translate = (props: any) => {
    const { translate } = useTranslate()
    return translate(props.id);

}

export default Translate;