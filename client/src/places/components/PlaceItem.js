import { useState, useContext } from 'react';

import styles from './PlaceItem.module.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = (props) => {
    const authCtx = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const mapHandler = () => {
        setShowMap(!showMap)
    }

    const deleteWarningHandler = () => {
        setShowConfirmModal(!showConfirmModal);
    }

    const confirmDeleteHandler = () => {
        console.log('DELETING...');
        setShowConfirmModal(false)
    }

    return (
        <>
            <Modal 
                show={showMap} 
                onCancel={mapHandler} 
                header={props.address} 
                contentClass={styles['place-item__modal-content']} 
                footerClass={styles['place-item__modal-actions']}
                footer={<Button onClick={mapHandler}>CLOSE</Button>}
            >
                <div className={styles['map-container']}>
                    <div className='google-map-code'>
                        <iframe 
                            title='map' 
                            src={`https://maps.google.com/maps?q=${props.coordinates.lat},${props.coordinates.long}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                            width='100%' 
                            height='350px' 
                            frameBorder='0' 
                            style={{borderRadius:'.5rem'}} 
                            allowFullScreen={true} 
                            aria-hidden={false} 
                            tabIndex='0'
                        />
                    </div>
                </div>
            </Modal>

            <Modal 
                show={showConfirmModal}
                onCancel={deleteWarningHandler}
                header='Are you sure?' 
                footerClass='place-item__modal-actions' 
                footer={
                    <>
                        <Button inverse onClick={deleteWarningHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place? Please note that it can not be undone thereafter!</p>
            </Modal>

            <li className={styles['place-item']}>
                <Card className={styles['place-item__content']}>
                    <div className={styles['place-item__image']}>
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className={styles['place-item__info']}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>

                    <div className={styles['place-item__actions']}>
                        <Button inverse onClick={mapHandler}>VIEW ON MAP</Button>
                        { authCtx.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button> }
                        { authCtx.isLoggedIn && <Button danger onClick={deleteWarningHandler}>DELETE</Button> }
                    </div>
                </Card>
            </li>
        </>
    )
}



export default PlaceItem;