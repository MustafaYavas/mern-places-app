import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PlaceForm.module.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const NewPlace = () => {
    const authCtx = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isVlaid: false,
        },
        description: {
            value: '',
            isVlaid: false,
        },
        address: {
            value: '',
            isVlaid: false,
        }
    }, false);

    const navigate = useNavigate();
    
    
    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: authCtx.userId
                }),
                { 'Content-Type': 'application/json' }
            )
            navigate('/');
        } catch (err) {}
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className={styles['place-form']} onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    id='title'
                    element='input' 
                    type='text' 
                    label='title' 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText='Please enter a valid title' 
                    onInput={inputHandler}
                />

                <Input 
                    id='description'
                    element='textarea' 
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]} 
                    errorText='Please enter a valid description (at least 5 characters)' 
                    onInput={inputHandler}
                />

                <Input 
                    id='address'
                    element='input' 
                    label='Address' 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText='Please enter a valid address' 
                    onInput={inputHandler}
                />

                <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </>
    )
}

export default NewPlace;