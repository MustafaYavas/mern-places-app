import { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import styles from './Auth.module.css';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
    const authCtx = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false)

    const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault();

        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login', 
                    'POST', 
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    { 'Content-Type': 'application/json' }
                )  
                authCtx.login(responseData.userId, responseData.token);
            } catch (err) {}
                          
        } else {
            try {  
                const formData = new FormData();  
                formData.append('name', formState.inputs.name.value);                    
                formData.append('email', formState.inputs.email.value);                    
                formData.append('password', formState.inputs.password.value);    
                formData.append('image', formState.inputs.image.value)                
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    formData
                )
                
                authCtx.login(responseData.userId, responseData.token);
            } catch (err) {}
        }
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className={styles.authentication}>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login required!</h2>
                <form onSubmit={authSubmitHandler}>
                    {
                        !isLoginMode && 
                        <Input 
                            element='input' 
                            id='name' 
                            type='text' 
                            label='Name' 
                            validators={[VALIDATOR_REQUIRE()]} 
                            errorText='Please enter a name'
                            onInput={inputHandler}
                        />
                    }
                    {!isLoginMode && 
                        <ImageUpload center id='image' onInput={inputHandler} errorText='Please provide an image' />
                    }
                    <Input 
                        element='input' 
                        id='email' 
                        type='email' 
                        label='E-mail' 
                        validators={[VALIDATOR_EMAIL()]} 
                        errorText='Please enter a valid email address'
                        onInput={inputHandler}
                    />

                    <Input 
                        element='input' 
                        id='password' 
                        type='password' 
                        label='Password' 
                        validators={[VALIDATOR_MINLENGTH(6)]} 
                        errorText='Please enter a valid password, at least 6 characters'
                        onInput={inputHandler}
                    />

                    <Button type='submit' disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>

                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </Card>
        </>
    )
}

export default Auth;