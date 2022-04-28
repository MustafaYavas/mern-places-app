import { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import styles from './Auth.module.css';
import Button from '../../shared/components/FormElements/Button';

const Auth = () => {
    const authCtx = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
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

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
        authCtx.login();
    }

    const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    return (
        <Card className={styles.authentication}>
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
                    validators={[VALIDATOR_MINLENGTH(7)]} 
                    errorText='Please enter a valid password, at least 7 characters'
                    onInput={inputHandler}
                />

                <Button type='submit' disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>

            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
        </Card>
    )
}

export default Auth;