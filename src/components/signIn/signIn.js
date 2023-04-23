import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { XCircleIcon, EyeIcon } from '@heroicons/react/24/solid';

import Spinner from '../../UI/spinner/spinner';

import './signIn.css';

function SignIn(props) {
    const [passwordType, setPasswordType] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailIsTouched, setEmailIsTouched] = useState('');
    const [passwordIsTouched, setPasswordIsTouched] = useState('');

    const [emailIsValid, setEmailIsValid] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', emailIsTouched && !emailIsValid ? 'border-redText' : 'border-blueSpecial'];

    const passwordClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', passwordIsTouched && !passwordIsValid ? 'border-redText' : 'border-blueSpecial'];

    useEffect(() => {
        if( emailIsValid && passwordIsValid) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [ emailIsValid, passwordIsValid]);

    const formValidationHandler = (type, value) => {
        switch(type) {
            case "email":
                setEmailIsTouched(true);
                if(value.includes('@') && value.length >= 5){
                    setEmailIsValid(true);
                } else {
                    setEmailIsValid(false);
                }
                break;
            case "password":
                setPasswordIsTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value) && value.toString().length >= 5){
                    setPasswordIsValid(true);
                } else {
                    setPasswordIsValid(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }

    const signInHandler = () => {
        setLoading(true);
    }

    return (
        <div className='viewShadow w-[100%] md:w-2/3 h-[100vh] bg-gradient-to-br from-darkClose to-blueLight p-[2rem] flex flex-col justify-center items-center space-y-7'>
            <h1 className='text-2xl md:text-4xl font-semibold'>Login to Your Account</h1>
            <div className='flex flex-col justify-start items-center h-[2rem] space-y-[0.1rem] py-[0.3rem] overflow-hidden font-sans slider text-md md:text-xl'>
                <h1 className='text-blueSpecial font-bold line'>Welcome to my Twitter Clone App</h1>
                <h1 className='text-darkClose font-bold line'>View tweets from famous people</h1>
                <h1 className='text-purple-600 font-bold line'>Get a reliable information</h1>
                <h1 className='text-gray-500 font-bold line'>Express your thoughts</h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className='p-[0.7rem] duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer'>
                    <FontAwesomeIcon icon={faTwitter} className='text-[2rem] text-iconsColor'/>
                </div>
            </div>
            {/* Email address */}
            <div className={emailClasses.join(' ')}>
                <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Your email' onChange={e => {
                    setEmail(e.target.value);
                    formValidationHandler('email', e.target.value);
                }} value={email} />
                { email ? <XCircleIcon className='w-[1.3rem] text-red-700' onClick={() => setEmail('')}/> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{emailError}</p>
            </div>
            {/* Password */}
            <div className={passwordClasses.join(' ')}>
                <input type={passwordType} className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Your Password' onChange={e => {
                    setPassword(e.target.value);
                    formValidationHandler('password', e.target.value);
                }} value={password} />
                { password ? <EyeIcon className='w-[1.3rem] text-gray-700' onClick={() => {
                    setPasswordType(passwordType === 'password'? 'text' : 'password');
                }}/> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{passwordError}</p>
            </div>
            <button className='px-[5rem] py-[0.5rem] rounded-full bg-blueSpecial text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75 disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed' disabled={!formIsValid} onClick={() => signInHandler()}>{ loading ? <Spinner/> : 'Sign In'}</button>
            <div className='md:hidden w-[80%] flex justify-between items-center'>
                <h3 className='text-md text-yellow-800' onClick={() => props.setInSignUp(true)}>Sign Up?</h3>
                <h3 className='text-md text-red-500'>Forgot password?</h3>
            </div>
                
        </div>
    );
}

export default SignIn;