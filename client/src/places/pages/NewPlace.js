// import { useCallback, useReducer } from 'react';

import styles from './PlaceForm.module.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';



const NewPlace = () => {
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
    }, false)
    
    

    const placeSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);  // send this to the backend
    }


    return (
        <form className={styles['place-form']}>
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
    )
}

export default NewPlace;