import { useNavigate } from 'react-router-dom';

import Button from '../FormElements/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();
    
    const navigateMainPageHandler = () => {
        navigate('/')
    }

    return (
        // <img className={`center ${styles.img}`} src={img} alt='404' />
        <>
            <div className={styles.container}>
                <div className={styles['container__error-code']}>
                    <p id='p1'>4</p>
                    <p id='p2'>0</p>
                    <p id='p3'>4</p>
                </div>
                
                <div className={styles['container__error-text']}>
                    <p>There's nothing to see here!</p>
                    <Button type='button' onClick={navigateMainPageHandler}>
                        Go Back
                    </Button>
                </div>
            </div>
            
        </>
    )
}

export default NotFound;