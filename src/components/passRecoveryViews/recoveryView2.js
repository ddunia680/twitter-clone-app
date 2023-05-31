import React, { useEffect, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/solid';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';

function RecoveryView2(props) {

    const [passwordType, setPasswordType] = useState('password');
    const [confPType, setConfPType] = useState('password')
    const [password, setPassword] = useState('');
    const [confPassword, setConfPass] = useState('');
    const [passwordIsTouched, setPasswordIsTouched] = useState('');
    const [confPasswordIsTouched, setConfPassIsTouched] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState('');
    const [confPasswordIsValid, setConfPassIsValid] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPasswordError, setConfPassError] = useState('');
    const [mainError, setMainError] = useState('');

    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);

    const passwordClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px] mb-[1rem]', passwordIsTouched && !passwordIsValid ? 'border-redText' : 'border-blueSpecial'];

    const confPClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px] mb-[1rem]', confPasswordIsTouched && !confPasswordIsValid ? 'border-redText' : 'border-blueSpecial'];

    useEffect(() => {
        if(passwordIsValid && confPasswordIsValid) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [passwordIsValid, confPasswordIsValid]);

    const formValidationHandler = (type, value) => {
        switch(type) {
            case "password":
                setPasswordIsTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value) && value.toString().length >= 5){
                    setPasswordIsValid(true);
                } else {
                    setPasswordIsValid(false);
                }
                break;
            case "confirmPass":
                setConfPassIsTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value)  && value.toString().length >= 5){
                    setConfPassIsValid(true);
                } else {
                    setConfPassIsValid(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }

    const savePassword = () => {
         setLoading(true);
        const data = {
            userId: props.tempUser,
            password: password,
            confirmPass: confPassword
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/updatePass`, data)
        .then(res => {
            setLoading(false);
            props.setInSignUp(false);
            props.setInForgotPassword(false);
        })
        .catch(err => {
            setLoading(false);
            const theErr = err.response.data.message;
            if(theErr === 'wrong password') {
                setPasswordError(theErr);
            } else if(theErr === 'wrong confirm password') {
                setConfPassError(theErr);
            } else {
                setMainError(theErr);
            }
        })

    }

    return (
        <div className='w-[100%] flex flex-col justify-center items-center'>
            { mainError ? <p className='h-[1rem] text-sm text-red-600 px-[1rem]'>{mainError}</p> : null}
            <h1 className='text-blueSpecial font-bold'>Enter New Password</h1>
            {/* Password */}
            <div className={passwordClasses.join(' ')}>
                <input type={passwordType} className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Your Password' onChange={e => {
                    setPassword(e.target.value);
                    formValidationHandler('password', e.target.value);
                }} value={password} />
                { password ? <EyeIcon className='w-[1.3rem] text-gray-700' onClick={() => {
                    setPasswordType(passwordType === 'password'? 'text' : 'password');
                }} /> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{passwordError}</p>
            </div>

            {/* Confirm Password */}
            <div className={confPClasses.join(' ')}>
                <input type={confPType} className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Confirm Password' onChange={e => {
                    setConfPass(e.target.value);
                    formValidationHandler('confirmPass', e.target.value);
                }} value={confPassword}/>
                { confPassword ? <EyeIcon className='w-[1.3rem] text-gray-700' onClick={() => {
                    setConfPType(confPType === 'password'? 'text' : 'password');
                }} /> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{confPasswordError}</p>
            </div>
            <button className='px-[5rem] py-[0.5rem] rounded-full bg-blueSpecial text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75 disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed' disabled={!formIsValid || loading} onClick={() => savePassword()}>{ loading ? <Spinner/> : 'Save'}</button>
        </div>
    );
}

export default RecoveryView2;