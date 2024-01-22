import Translate from "@/components/helpers/Translate/Translate";
import classes from './sub-heading.module.scss';
interface SubHeadingProps {
    text: string
}
const SubHeading = ({ text }: SubHeadingProps) => {
    return (
        <h4 className={classes.data}><Translate id={text} /></h4>
    )
}

export default SubHeading;