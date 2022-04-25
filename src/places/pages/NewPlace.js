import { useCallback, useReducer } from 'react';

import styles from './NewPlace.module.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';


const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs) {
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            } 
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        default: 
            return state;
    }
}

const initialState = {
    inputs: {
        title: {
            value: '',
            isVlaid: false,
        },
        description: {
            value: '',
            isVlaid: false,
        },
    },
    isValid: false
}


const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, [dispatch]);

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