import { MainInputProps } from '@/interfaces/MainInputProps';
import classes from './main-input.module.scss';

const MainInput = ({
    view = 'box',
    value,
    ...restProps
}: MainInputProps) => {
    return (
        <input className={`${classes.field} ${view === 'underline' ? classes.underline : classes.box}`} value={value || ''} {...restProps} />
    )
}

export default MainInput;