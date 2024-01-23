import classes from './loader.module.scss';

interface Props {
    full?: boolean
}
const Loader = ({ full = false }: Props) => {
    return (
        <div className={`${classes.container} ${full ? classes.full : ''}`}>
            <div className={classes.spinner} />
        </div>
    )
}

export default Loader;