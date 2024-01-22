import classes from './new-place.module.scss';
import AddPlace from '@/components/AddPlace/AddPlace';

const NewPlace = () => {
    return (
        <div className={classes.container}>
            <AddPlace />
        </div>
    )
}

export default NewPlace;