import Link from 'next/link';
import classes from './no-data.module.scss';
import Translate from '@/components/helpers/Translate/Translate';
import Lottie from 'lottie-react';
import noData from '@/public/assets/lottie/emptyComponent.json';

const NoData = () => {
    return (
        <div className="col-12">
            <div className={classes.noData}>
                <Lottie
                    animationData={noData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '300px', height: '300px' }} // Adjust the size as needed
                />
                {/* {showHomeBtn && <Link href={'/home'} className='btn btn-main'><Translate id="buttons.goToHome" /></Link>} */}
            </div>
        </div>
    )
}

export default NoData;
