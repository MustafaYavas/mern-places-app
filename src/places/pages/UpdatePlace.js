import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import styles from './PlaceForm.module.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const DUMMY_PLACES = [
    {
        id:'p1', 
        title:'Empire State Building', 
        description:'One of the most famous sky scrapers in the world!', 
        imageUrl:'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        address:'New York, 10001, United States of America',
        location:{
            lat: 40.7485492,
            long: -73.9879522
        },
        creator: 'u1'
    },
    {
        id:'p2', 
        title:'Empire State Building', 
        description:'One of the most famous sky scrapers in the world!', 
        imageUrl:'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        address:'New York, 10001, United States of America',
        location:{
            lat: 40.7485492,
            long: -73.9879522
        },
        creator: 'u2'
    }
]

const UpdatePlace = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams();
    
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
    
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId.placeId);

    useEffect(() => {
        if(identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                }, 
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
        }
        
        setIsLoading(false)
    }, [setFormData, identifiedPlace])

    

    const placeUpdateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs)
    }
    

    if(!identifiedPlace) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    if(isLoading) {
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        
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
    )
}

export default UpdatePlace;