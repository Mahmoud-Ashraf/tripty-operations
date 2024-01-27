import Header from '@/components/layout/Header/Header';
import classes from './new-place.module.scss';
import AddPlace from '@/components/AddPlace/AddPlace';

const NewPlace = () => {
    return (
        <div className={classes.container}>
            <Header />
            <div className="container">
                <AddPlace />
            </div>
        </div>
    )
}

export default NewPlace;