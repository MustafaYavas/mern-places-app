import Button from '../../shared/components/FormElements/Button';
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
                        <Button to='/places/new'>Share Place</Button>
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
                                image={place.image}
                                title={place.title}
                                description={place.description}
                                address={place.address}
                                creatorId={place.creator}
                                coordinates={place.location}
                                onDelete={props.onDeletePlace}
                            />
                        ))
                    }
                </ul>
            }
        </>
    )
}

export default PlaceList;