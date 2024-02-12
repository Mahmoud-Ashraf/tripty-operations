import { Children, Fragment, cloneElement, useEffect, useRef, useState } from 'react';
import classes from './dropdown.module.scss';


// interface Props {
//     trigger: 
// }
const Dropdown = ({ trigger, children, align, direction = 'ets' }: any) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [dropdownRef]);

    return (
        <div className={classes.container} ref={dropdownRef}>
            <div className={classes.toggle}>
                {cloneElement(trigger, {
                    onClick: handleOpen,
                })}
            </div>
            {open ? (
                <div className={`${classes.menu} ${direction === 'ste' ? 'ar-right' : ''}`} style={{ alignItems: align ? `flex-${align}` : 'center' }}>
                    {Children.map(children, (menuItem: any, index: number) => (
                        <Fragment key={index}>
                            {cloneElement(menuItem, {
                                onClick: (e: any) => {
                                    // e.stopPropgation();
                                    menuItem.props.onClick ? menuItem.props.onClick() : null;
                                    setOpen(false);
                                },
                            })}
                        </Fragment>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Dropdown;