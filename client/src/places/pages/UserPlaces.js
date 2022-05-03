import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = (props) => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const params = useParams();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading &&
                <div className='center'>
                    <LoadingSpinner />
                </div>
            }
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </>
    )
}

export default UserPlaces;