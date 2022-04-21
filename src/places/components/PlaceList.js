import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import styles from './PlaceList.module.css';

const PlaceList = (props) => {
    return (
        <>
            {
                props.items.length === 0 &&
                <div className={`${styles['place-list']} center`}>
                    <Card>
                        <h2>No places found. Maybe create one?</h2>
                        <button>Share Place</button>
                    </Card>
                </div>
            }

            {
                props.items.length !== 0 && 
                <ul className={styles['place-list']}>
                    {
                        props.items.map((place) => (
                            <PlaceItem 
                                key={place.id} 
                                id={place.id} 
                                image={place.imageUrl}
                                title={place.title}
                                descrpition={place.descrpition}
                                address={place.address}
                                creatorId={place.creator}
                                coordinates={place.location}
                            />
                        ))
                    }
                </ul>
            }
        </>
    )
}

export default PlaceList;