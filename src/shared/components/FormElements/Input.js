import { useReducer, useEffect } from 'react';

import styles from './Input.module.css';
import { validate } from '../../util/validators'

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE' :
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH' :
            return {
                ...state,
                isTouched: true
            }
        default:
            return state; 
    }
}

const initialState = {
    value: '',
    isValid: false,
    isTouched: false
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialState);

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [onInput, id, value, isValid])

    const textChangeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            val: e.target.value,
            validators: props.validators
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ? 
    <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placehlder} 
        onChange={textChangeHandler}
        onBlur={touchHandler}
        value={inputState.value} 
    /> : 
    
    <textarea 
        id={props.id} 
        rows={props.rows || 3} 
        onChange={textChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
    />

    return (
        <div className={`${styles['form-control']} ${!inputState.isValid && inputState.isTouched && styles['form-control--invalid']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;