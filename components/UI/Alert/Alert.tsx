import ReactDOM from "react-dom";
import classes from './alert.module.scss';
import { useEffect, useState } from "react";
import Translate from "@/components/helpers/Translate/Translate";

interface Props {
    // title?: string,
    message: string,
    style: 'success' | 'error' | 'warning' | 'info',
    timeOut?: number
}
const Alert = ({ message, style }: Props) => {
    // const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setVisible(false);
    //     }, timeOut);

    //     return () => clearTimeout(timer);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []); // This effect runs once when the component mounts
    return (
        ReactDOM.createPortal(
            <div className={`${classes.container}`}>
                <div className={`${classes.content} ${classes[style]}`}>
                    <h3>
                        {style === 'success' && <span>&#x2713;</span>}
                        <Translate id={`alerts.${style}`} />
                    </h3>
                    <p>{message}</p>
                </div>
            </div>,
            document.body
        )
    );
}

export default Alert;