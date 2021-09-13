import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginSucces } from '../../components/#store/actions/auth';
import Input from '../../components/UI/Input/Input'

import './Login.css'

export default function Login() {
    const [valid, setValid] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    const [formControls, setFormControls] = React.useState({
        username: {
            value: "",
            errorMessage: "invalid username",
            label: "Username",
            placeholder:"write username here",
            type:"text",
            name: 'username',
            valid: false,
            validation:{
                required: true,
                minLength: 3
            }
        },
        password: {
            value: "",
            errorMessage: "not valid password",
            label: "Password",
            placeholder:"password",
            type:"password",
            name: 'password',
            valid: false,
            validation:{
                required: true,
                minLength: 3
            }
        },
        subdomain: {
            value: "",
            errorMessage: "not valid subdomain",
            label: "Subdomain",
            placeholder:"subdomain",
            type:"text",
            name: 'subdomain',
            valid: false,
            validation:{
                required: true,
                minLength: 3
            }
        }
    });

    function formValidation(value, validation){
        if(!validation){
            return true
        }

        let valid = true;
        if(validation.required){
            valid = value.trim() !== 0 && valid
        }

        if(validation.minLength){
            valid = value.length >= validation.minLength && valid
        }

        return valid
    }

    function onChangeHandler(e, controlName){
        let controls = {...formControls};
        let control = {...controls[controlName]};
        // console.log(controls);

        control.value = e.target.value;
        control.valid = formValidation(control.value, control.validation);
        
        let formValid = true;

        Object.keys(controls).forEach(key => {
            formValid = controls[key].valid && formValid
            
        })
        controls[controlName] = control;
        
        setValid(formValid);
        setFormControls(controls);
    }

    async function authHandler(e){
        e.preventDefault();
        const params  = {
            _username: formControls.username.value,
            _password: formControls.password.value,
            _subdomain: formControls.subdomain.value
        }

        // ! application/x-www-form-urlencoded format
        const Data = Object.keys(params)
            .map((key) => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try{
            const resp = await axios.post(`https://${params._subdomain}.ox-sys.com/security/auth_check`,
                Data,
                {
                    headers: headers
                }
            )
            localStorage.setItem('subdomain',params._subdomain);
            localStorage.setItem('token',resp.data.token);
            dispatch(loginSucces(resp.data.token))
        }catch(e){
            console.log(e);
            setError(true);
        }
        
        if(localStorage.getItem('token')){
            history.push('/products')
        }
    }

    return (
        <div className='center'>
            <form className='form' onSubmit={(e) => authHandler(e)}>
                {
                    !error ? 
                    <div>
                        <h2 className='form-title'>LOGIN</h2>
                        {
                            Object.keys(formControls).map((name, index) => {
                                const control = formControls[name];
                                return <Input 
                                    key={index}
                                    type={control.type}
                                    placeholder={control.placeholder}
                                    label={control.label}
                                    value={control.value}
                                    onChange={e => onChangeHandler(e, name)}
                                />
                            })
                        }
                        <button 
                            disabled={!valid}
                            className='form-btn' 
                            type="submit" 
                        >
                            Submit
                        </button>
                    </div>
                    : <div className="error">
                        <h3>Invalid accaunt</h3>
                        <button onClick={() => setError(!error)}>Return</button>
                    </div>
                }
            </form>
        </div>
    )
}
