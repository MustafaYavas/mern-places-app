import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import styles from './PlaceForm.module.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';


const UpdatePlace = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        }, 
        description: {
            value: '',
            isValid: false
        }
    }, false)
    
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    }, 
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true)
            } catch (err) {}

        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData])


    const placeUpdateSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authCtx.token 
                }
            )
            navigate(`/${authCtx.userId}/places`)
        } catch (err) {}
    }

    if(isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }
    

    if(!loadedPlace && !error) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {
                !isLoading && loadedPlace && 
                <form className={styles['place-form']} onSubmit={placeUpdateSubmitHandler}>
                    <Input 
                        id='title' 
                        element='input' 
                        type='text' 
                        label='Title'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a valid title'
                        onInput={inputHandler}
                        initialValue={formState.inputs.title.value}
                        initialValid={formState.inputs.title.isValid}
                    />

                    <Input 
                        id='description' 
                        element='textarea' 
                        label='Description'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid description (at least 5 characters)'
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value}
                        initialValid={formState.inputs.description.isValid}
                    />

                    <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
                </form>
            }
        </>    
    )
}

export default UpdatePlace;