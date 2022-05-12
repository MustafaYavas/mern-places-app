import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import styles from './UserPlaces.module.css';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const params = useParams();
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${params.userId}`);
                setLoadedPlaces(responseData.places)
            } catch (err) { }
        }
        fetchPlaces();
    }, [sendRequest, params.userId])

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter((place) => place.id !== deletedPlaceId))
    }

    return (
        <> 
            {
                isLoading &&
                <div className='center'>
                    <LoadingSpinner />
                </div>
            }
            {
                !loadedPlaces && !isLoading &&
                <Card className={`center ${styles['content-width']}`}>
                    User does not have a post
                </Card>
            }
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </>
    )
}

export default UserPlaces;