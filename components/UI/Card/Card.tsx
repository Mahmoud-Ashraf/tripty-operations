import { useRouter } from 'next/router';
import classes from './card.module.scss';

const Card = ({ place, ...restProps }: any) => {
    const router = useRouter();
    return (
        <div className={`${classes.container} ${classes[place.status]}`} {...restProps}>
            <h3>{router.locale === 'ar' ? place.name_ar : place.name}</h3>
            <div className={classes.details}>
                <span>{place.city.name}</span>
                <span>{place.category.name}</span>
            </div>
        </div>
    )
}

export default Card;