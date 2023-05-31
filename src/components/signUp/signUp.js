import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../../UI/spinner/spinner';
import { XCircleIcon, EyeIcon, UserCircleIcon, UserIcon,  MapPinIcon, LinkIcon } from '@heroicons/react/24/solid';

import './signUp.css';
import axios from 'axios';

function SignUp(props) {
    const [passwordType, setPasswordType] = useState('password');
    const [confPType, setConfPType] = useState('password')

    const [coverPic, setCoverPic] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [fullName, setFullname] = useState('');
    const [tagName, setTagName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPass] = useState('');
    const [location, setLocation] = useState('');
    const [website, setwebsite] = useState('');

    const [more, setMore] = useState(false);

    const [fullNameIsTouched, setFullnameIsTouched] = useState('');
    const [tagNameIsTouched, setTagNameIsTouched] = useState('');
    const [emailIsTouched, setEmailIsTouched] = useState('');
    const [bioIsTouched, setBioIsTouched] = useState('');
    const [passwordIsTouched, setPasswordIsTouched] = useState('');
    const [confPasswordIsTouched, setConfPassIsTouched] = useState('');
    const [locationIsTouched, setLocationIsTouched] = useState('');
    const [websiteIsTouched, setWebsiteIsTouched] = useState('');

    const [fullNameIsValid, setFullNameIsValid] = useState(false);
    const [tagNameIsValid, setTagNameIsValid] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [bioIsValid, setBioIsValid] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState('');
    const [confPasswordIsValid, setConfPassIsValid] = useState('');
    const [locationIsValid, setLocationIsValid] = useState('');
    const [websiteIsValid, setWebsiteIsValid] = useState('');

    const [fullNameError, setFullNameError] = useState(false);
    const [tagNameError, setTagNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [bioError, setBioError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPasswordError, setConfPassError] = useState('');

    const [formIsValid, setFormValidity] = useState(false);
    const [loading, setLoading] = useState(false);

    const userProfileRef = useRef();
    const userCoverRef = useRef();

    const fullNameClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', fullNameIsTouched && !fullNameIsValid ? 'border-redText' : 'border-blueSpecial'];

    const tagNameClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', tagNameIsTouched && !tagNameIsValid ? 'border-redText' : 'border-blueSpecial'];

    const emailClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', emailIsTouched && !emailIsValid ? 'border-redText' : 'border-blueSpecial'];

    const bioClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', bioIsTouched && !bioIsValid ? 'border-redText' : 'border-blueSpecial'];

    const passwordClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', passwordIsTouched && !passwordIsValid ? 'border-redText' : 'border-blueSpecial'];

    const confPClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', confPasswordIsTouched && !confPasswordIsValid ? 'border-redText' : 'border-blueSpecial'];

    const locationClasses = ['relative w-[90%] md:w-[40%] bg-gray-900 bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', locationIsTouched && !locationIsValid ? 'border-redText' : 'border-blueSpecial'];

    const websiteClasses = ['relative w-[90%] md:w-[40%] bg-gray-900 bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', websiteIsTouched && !websiteIsValid ? 'border-redText' : 'border-blueSpecial'];

    useEffect(() => {
        if( coverPic && profilePic && fullNameIsValid && tagNameIsValid && bioIsValid && emailIsValid && passwordIsValid && confPasswordIsValid) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [coverPic, profilePic, fullNameIsValid, tagNameIsValid, bioIsValid, emailIsValid, passwordIsValid, confPasswordIsValid]);
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const formValidationHandler = (type, value) => {
        switch(type) {
            case "fullname":
                setFullnameIsTouched(true);
                if(value.length >= 5){
                    setFullNameIsValid(true);
                } else {
                    setFullNameIsValid(false);
                }
                break;
            case "tagName":
                setTagNameIsTouched(true);
                if(value.includes('@') && value.length >= 5){
                    setTagNameIsValid(true);
                } else {
                    setTagNameIsValid(false);
                }
                break;
            case "email":
                setEmailIsTouched(true);
                if(value.includes('@') && value.length >= 5){
                    setEmailIsValid(true);
                } else {
                    setEmailIsValid(false);
                }
                break;
            case "bio":
                setBioIsTouched(true);
                if(value.length >= 5){
                    setBioIsValid(true);
                } else {
                    setBioIsValid(false);
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
            case "confirmPass":
                setConfPassIsTouched(true);
                if(/[A-Z]/.test(value) && /^[A-Za-z0-9]*$/.test(value)  && value.toString().length >= 5){
                    setConfPassIsValid(true);
                } else {
                    setConfPassIsValid(false);
                }
                break;
            case "location":
                setLocationIsTouched(true);
                if(value.length >= 5){
                    setLocationIsValid(true);
                } else {
                    setLocationIsValid(false);
                }
                break;
            case "website":
                setWebsiteIsTouched(true);
                if(value.includes('http') && value.length >= 5){
                    setWebsiteIsValid(true);
                } else {
                    setWebsiteIsValid(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }
    
    const signUpHandler = () => {
        setLoading(true);
            const form = new FormData();
            form.append('photos', coverPic);
            form.append('photos', profilePic);
            form.append('fullName', fullName);
            form.append('tagName', tagName);
            form.append('email', email);
            form.append('bio', bio);
            form.append('password', password);
            form.append('confirmPass', confPassword);
            form.append('website', website);
            form.append('location', location);
        
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            setLoading(false);
            console.log(res.data.message);
            props.setInSignUp(false);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            const theMessage = err.response.data.message;
            if(theMessage.includes('fullname')) {
                setFullNameError(theMessage);
                setFullNameIsValid(false);
            } else if(theMessage.includes('tagName')) {
                setTagNameError(theMessage);
                setTagNameIsValid(false);
            } else if(theMessage.includes('email')) {
                setEmailError(theMessage);
                setEmailIsValid(false);
            } else if(theMessage.includes('bio')) {
                setBioError(theMessage);
                setBioIsValid(false);
            } else if(theMessage.includes('password')) {
                setPasswordError(theMessage);
                setPasswordIsValid(false);
            } else if(theMessage.includes('confirm')) {
                setConfPassError(theMessage);
                setConfPassIsValid(false);
            } else {
                alert(theMessage);
            }
        })
    }

    return (
        <div className='viewShadow w-[100%] md:w-2/3 h-[100vh] bg-gradient-to-br from-darkClose to-blueLight p-[2rem] flex flex-col justify-start items-center space-y-7 overflow-y-scroll'>
            <h1 className='text-2xl md:text-4xl font-semibold text-center'>Create an Account with us </h1>
            <input type='file' className='hidden' ref={userCoverRef} onChange={e => setCoverPic(e.target.files[0])}/>
            <input type='file' className='hidden' ref={userProfileRef} onChange={e => setProfilePic(e.target.files[0])}/>
            <div className='flex flex-col justify-center items-center bg-darkClose h-[10rem] w-[90%] md:w-[70%]rounded-lg'>
                <div className='w-[98%] h-[9rem] bg-gray-700 rounded-lg flex justify-between items-center p-1 md:p-3'>
                    <p>Your Cover Pic</p>
                    {/* Cover Picture */}
                     { !coverPic ? <UserIcon className='w-[5rem] md:w-[7rem]' onClick={() => userCoverRef.current.click()} title='Your Cover pic'/> :
                     <div className='relative w-[5rem] md:w-[7rem] h-[5rem] md:h-[7rem] rounded-full bg-darkClose overflow-hidden'>
                        <img src={ URL.createObjectURL(coverPic)} alt='' className='w-[100%] h-[100%] object-contain'/>
                        <XCircleIcon className='absolute bottom-1 right-6 w-[1.5rem] text-red-700 hover:text-red-300' title='remove?' onClick={() => setCoverPic('')}/>
                    </div>}
                </div>
                {/* Profile picture */}
                { !profilePic ?
                    <div className=' mt-[-2rem] md:mt-[-4rem] w-[5rem] md:w-[7rem] p-0'>
                        <UserCircleIcon className='w-[100%] text-iconsColor rounded-full hover:text-gray-500' onClick={() => userProfileRef.current.click()} title='click to choose picture' />
                    </div>
                :
                    <div className='relative mt-[-2rem] md:mt-[-4rem] w-[5rem] md:w-[7rem] h-[5rem] md:h-[7rem] rounded-full bg-darkClose overflow-hidden'>
                        <img src={ URL.createObjectURL(profilePic)} alt='' className='w-[100%] h-[100%] object-contain'/>
                        <XCircleIcon className='absolute bottom-1 right-6 w-[1.5rem] text-red-700 hover:text-red-300' title='remove?' onClick={() => setProfilePic('')}/>
                    </div>
                }
                <p>Your Profile</p>
                {/* <p className='text-sm text-red-700'>well well</p> */}
            </div>

            {/* User Full name */}
            <div className={fullNameClasses.join(' ')}>
                <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Your full name' onChange={e => {
                    setFullname(e.target.value);
                    formValidationHandler('fullname', e.target.value);
                }} value={fullName}/>
                { fullName ? <XCircleIcon className='w-[1.3rem] text-red-700' onClick={() => setFullname('')} /> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{fullNameError}</p>
            </div>

            {/* tagName */}
            <div className={tagNameClasses.join(' ')}>
                <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Tagname: @...' onChange={e => {
                    setTagName(e.target.value);
                    formValidationHandler('tagName', e.target.value);
                }} value={tagName} />
                { tagName ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setTagName('')}/> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{tagNameError}</p>
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
            {/* Bio */}
            <div className={bioClasses.join(' ')}>
                <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full' placeholder='Your Bio' onChange={e => {
                    setBio(e.target.value);
                    formValidationHandler('bio', e.target.value);
                }} value={bio} />
                { bio ? <XCircleIcon className='w-[1.3rem] text-red-700' onClick={() => setBio('')} /> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{bioError}</p>
            </div>
            
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

            { !more ?
                <p className='text-green-500 hover:text-green-100 cursor-pointer' onClick={() => setMore(true)}>More?</p>
            :
                <><div className=' w-[95%] md:w-[80%] flex flex-col md:flex-row space-y-4 justify-between items-center'>
                    {/* Location */}
                    <div className={locationClasses.join(' ')}>
                        <MapPinIcon className='w-[1.3rem] text-gray-700' />
                        <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2' placeholder='Your location' onChange={e => {
                            setLocation(e.target.value);
                            formValidationHandler('location', e.target.value);
                        }} value={location}/>
                    </div>

                    {/* personal website */}
                    <div className={websiteClasses.join(' ')}>
                        <LinkIcon className='w-[1.3rem] text-gray-700' />
                        <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2' placeholder='Your website' onChange={e => {
                            setwebsite(e.target.value);
                            formValidationHandler('website', e.target.value);
                        }} value={website}/>
                    </div>
                </div>
                <p className='text-green-500 hover:text-green-100 cursor-pointer' onClick={() => setMore(false)}>Hide Section?</p></>
            }
            

            <button className='px-[5rem] py-[0.5rem] rounded-full bg-blueSpecial text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75 disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed' disabled={!formIsValid || loading} onClick={() => signUpHandler()}>{ loading ? <Spinner/> : 'Sign Up'}</button>
            <div className='md:hidden w-[80%] flex justify-between items-center'>
                <h3 className='text-md text-yellow-800' onClick={() => props.setInSignUp(false)}>Sign In?</h3>
                <h3 className='text-md text-red-500' onClick={() => props.setInForgotPassword(true)}>Forgot password?</h3>
            </div>
                
        </div>
    );
}

export default SignUp;