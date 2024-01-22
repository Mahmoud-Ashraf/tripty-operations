import { MainInputProps } from '@/interfaces/MainInputProps';
import classes from './main-input.module.scss';

const MainInput = ({
    view = 'box',
    ...restProps
}: MainInputProps) => {
    return (
        <input className={`${classes.field} ${view === 'underline' ? classes.underline : classes.box}`} {...restProps} />
    )
}

export default MainInput;