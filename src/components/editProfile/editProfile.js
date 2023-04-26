import React, { useEffect, useRef, useState } from 'react';
import RightMenu from '../../containers/rightMenu/rightMenu';
import BottomMenu from '../../containers/bottomMenu/bottomMenu';
import { ArrowLeftIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import LeftMenu from '../../containers/leftMenu/leftMenu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apic from '../../images/apic.jpg';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';
import { KEEPAUTHENTICATED } from '../../store/authenticate';

function EditProfile(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const coverUrl = useSelector(state => state.authenticate.coverUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const tagName = useSelector(state => state.authenticate.tagName);
    const bio = useSelector(state => state.authenticate.bio);
    const email = useSelector(state => state.authenticate.email);
    const website = useSelector(state => state.authenticate.website);
    const location = useSelector(state => state.authenticate.location);

    const profileRef = useRef();
    const coverRef = useRef();

    const [newCover, setNewCover] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    const [newFullName, setNewFullname] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [NewEmail, setNewEmail] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newWebsite, setNewWebsite] = useState('');

    const [fullNameIsTouched, setFullnameIsTouched] = useState('');
    const [tagNameIsTouched, setTagNameIsTouched] = useState('');
    const [emailIsTouched, setEmailIsTouched] = useState('');
    const [bioIsTouched, setBioIsTouched] = useState('');
    const [locationIsTouched, setLocationIsTouched] = useState('');
    const [websiteIsTouched, setWebsiteIsTouched] = useState('');

    const [fullNameIsValid, setFullNameIsValid] = useState(false);
    const [tagNameIsValid, setTagNameIsValid] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [bioIsValid, setBioIsValid] = useState('');
    const [locationIsValid, setLocationIsValid] = useState('');
    const [websiteIsValid, setWebsiteIsValid] = useState('');

    const [fullNameError, setFullNameError] = useState(false);
    const [tagNameError, setTagNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [bioError, setBioError] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [locationError, setLocationError] = useState('');

    const [loading, setLoading] = useState(false);
    const [formIsValid, setFormValidity] = useState(false);

    const fullNameClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', fullNameIsTouched && !fullNameIsValid ? 'border-redText' : 'border-blueSpecial'];

    const tagNameClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', tagNameIsTouched && !tagNameIsValid ? 'border-redText' : 'border-blueSpecial'];

    const emailClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', emailIsTouched && !emailIsValid ? 'border-redText' : 'border-blueSpecial'];

    const bioClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', bioIsTouched && !bioIsValid ? 'border-redText' : 'border-blueSpecial'];

    const locationClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', locationIsTouched && !locationIsValid ? 'border-redText' : 'border-blueSpecial'];

    const websiteClasses = ['relative w-[75%] bg-transparent bg-opacity-50 flex justify-between items-center px-1 border-b-[5px]', websiteIsTouched && !websiteIsValid ? 'border-redText' : 'border-blueSpecial'];

    useEffect(() => {
        if( newProfile || newCover || newFullName || newTagName || NewEmail || newBio || newLocation || newWebsite) {
            setFormValidity(true);
        } else {
            setFormValidity(false);
        }
    }, [newProfile, newCover, newFullName, newTagName, NewEmail, newBio, newLocation, newWebsite]);

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

    const updateInfo = () => {
        setLoading(true);

        const theData = new FormData();
        if(newCover) {
            theData.append('photos', newCover);
        }
        if(newProfile) {
            theData.append('photos', newProfile);
        }
        if(newFullName) {
            theData.append('fullname', newFullName);
        }
        if(newTagName) {
            theData.append('tagName', newTagName);
        }
        if(NewEmail) {
            theData.append('email', NewEmail);
        }
        if(newBio) {
            theData.append('bio', newBio);
        }
        if(newLocation) {
            theData.append('location', newLocation);
        }
        if(newWebsite) {
            theData.append('website', newWebsite);
        }
        if(newCover && !newProfile) {
            theData.append('isCover', true);
        }
        if(!newCover && newProfile) {
            theData.append('isProfile', true);
        }
        if(newCover && newProfile) {
            theData.append('bothPics', true);
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/updateuser`, theData, {
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            setLoading(false);
            // console.log(res.data.userData);
            localStorage.setItem('profileUrl', res.data.userData.profileUrl);
            localStorage.setItem('coverUrl', res.data.userData.coverUrl);
            localStorage.setItem('tagName', res.data.userData.tagName);
            localStorage.setItem('fullname', res.data.userData.fullname);
            localStorage.setItem('bio', res.data.userData.bio);
            localStorage.setItem('email', res.data.userData.email);
            localStorage.setItem('profileUrl', res.data.userData.profileUrl);
            localStorage.setItem('createdAt', res.data.userData.createdAt);
            if(res.data.userData.website) {
                localStorage.setItem('website', res.data.userData.website);
            } 
            if(res.data.userData.location) {
                localStorage.setItem('location', res.data.userData.location);
            }
            dispatch(KEEPAUTHENTICATED());
            navigate(`/main/${userId}`);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            let theMessage = err.response.data.message;
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
            } else if(theMessage.includes('location')) {
                setLocationError(theMessage);
                setLocationIsValid(false);
            } else if(theMessage.includes('website')) {
                setWebsiteError(theMessage);
                setWebsiteIsValid(false);
            } else {
                alert('something went wrong server-side');
            }
        })

    }
 
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            <div className='userIdent relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start text-iconsColor bg-primary backdrop-blur-md bg-opacity-80'>
                {/* Header */}
                { window.innerWidth > 500 ?  
                    <div className='sticky top-0 left-0 bg-primary bg-opacity-80 w-[100%] z-10 md:flex justify-between items-center space-x-2 md:space-x-4 px-2 border-b-[1px] border-darkClose'>
                        <div className='flex justify-start items-center space-y-2'>
                            <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent' onClick={() => navigate('/main')}>
                                <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                            </div>
                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'> Edit Profile</h3>
                            </div>
                        </div>
                    </div>
                : null}
                
                {/* first slice */}
                <div className='relative w-[100%] h-[5rem] md:h-[12rem] bg-gray-700'>
                    {/* Cover image */}
                    <div className='absolute bg-darkClose bg-opacity-50 top-0 left-0 w-[100%] h-[100%] flex justify-center items-center'>
                        <PencilSquareIcon className='text-iconsColor w-[1.5rem] md:w-[2rem]' onClick={() => coverRef.current.click()}/>
                    </div>
                    <input type='file' className='hidden' ref={coverRef} onChange={e => setNewCover(e.target.files[0])}/>
                    
                    <img src={ newCover ? URL.createObjectURL(newCover) : coverUrl ? coverUrl : apic} alt='' className='w-[100%] h-[100%] object-contain'/>
                    {/* Small screens up menu */}
                    { window.innerWidth <= 500 ?
                        <div className='fixed top-0 left-0 flex justify-between items-center w-[100%] px-2 py-1'>
                            <div className='flex cursor-pointer text-iconsColor justify-start items-center space-x-2' title='Back'>
                                <div className=' bg-primary bg-opacity-50 p-1 rounded-full' onClick={() => navigate('/main')}>
                                    <ArrowLeftIcon className='w-[1rem]' />
                                </div>
                            </div>
                        </div>
                    : null}
                                    
                    {/* Profile page */}
                    <div className='absolute border-[2px] md:border-[5px] border-primary bg-gray-700 overflow-hidden rounded-full h-[5rem] w-[5rem] md:w-[10rem] md:h-[10rem] ml-[3%] top-[2.3rem] md:top-[7rem]'>
                        <div className='absolute bg-darkClose bg-opacity-50 top-0 left-0 w-[100%] h-[100%] flex justify-center items-center'>
                            <PencilSquareIcon className='text-iconsColor w-[1.5rem] md:w-[2rem]' onClick={() => profileRef.current.click()}/>
                        </div>
                        <input type='file' className='hidden' ref={profileRef} onChange={e => setNewProfile(e.target.files[0])}/>
                        <img src={newProfile ? URL.createObjectURL(newProfile) : profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                    </div>                
                </div>
                {/* Second Slice */}
                <div className='w-[100%] flex flex-col justify-start items-start mt-[2.2rem] md:mt-[5rem] px-2'>
                    {/* Full name */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center'>
                            <label className='text-sm md:text-md'>Full Name</label>
                            <div className={fullNameClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-normal' placeholder={fullname} onChange={e => {
                                    setNewFullname(e.target.value);
                                    formValidationHandler('fullname', e.target.value);
                                }} value={newFullName}/>
                                { newFullName ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewFullname('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{fullNameError}</p>
                            </div>
                    </div>
                    {/* Tag Name */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center space-y-[1em] md:space-y-[2em]'>
                            <label className='text-sm md:text-md'>Tag Name</label>
                            <div className={tagNameClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-md' placeholder={tagName} onChange={e => {
                                    setNewTagName(e.target.value);
                                    formValidationHandler('tagName', e.target.value);
                                }} value={newTagName}/>
                                { newTagName ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewTagName('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{tagNameError}</p>
                            </div>
                    </div>
                    {/* email address */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center space-y-[1em] md:space-y-[2em]'>
                            <label className='text-sm md:text-md'>Email address</label>
                            <div className={emailClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-md' placeholder={email} onChange={e => {
                                    setNewEmail(e.target.value);
                                    formValidationHandler('email', e.target.value);
                                }} value={NewEmail}/>
                                { NewEmail ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewEmail('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{emailError}</p>
                            </div>
                    </div>
                    {/* bio */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center space-y-[1em] md:space-y-[2em]'>
                            <label className='text-sm md:text-md'>Bio</label>
                            <div className={bioClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-md' placeholder={bio} onChange={e => {
                                    setNewBio(e.target.value);
                                    formValidationHandler('bio', e.target.value);
                                }} value={newBio}/>
                                { newBio ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewBio('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{bioError}</p>
                            </div>
                    </div>
                    {/* location */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center space-y-[1em] md:space-y-[2em]'>
                            <label className='text-sm md:text-md'>Location</label>
                            <div className={locationClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-md' placeholder={location} onChange={e => {
                                    setNewLocation(e.target.value);
                                    formValidationHandler('location', e.target.value);
                                }} value={newLocation}/>
                                { newLocation ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewLocation('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{locationError}</p>
                            </div>
                    </div>
                    {/* website */}
                    <div className='w-[90%] md:w-[70%] flex justify-between items-center space-y-[1em] md:space-y-[2em]'>
                            <label className='text-sm md:text-md'>website</label>
                            <div className={websiteClasses.join(' ')}>
                                <input className='h-[2rem] w-[95%] bg-transparent focus:outline-none text-iconsColor px-2 text-sm md:text-md' placeholder={website} onChange={e => {
                                    setNewWebsite(e.target.value);
                                    formValidationHandler('website', e.target.value);
                                }} value={newWebsite}/>
                                { newWebsite ? <XCircleIcon className='w-[1.3rem] text-red-700'  onClick={() => setNewWebsite('')}/> :null}
                                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{websiteError}</p>
                            </div>
                    </div>
                    {/* Control */}
                    <button className=' mx-auto my-5 px-[3rem] md:px-[5rem] py-[0.5rem] rounded-full bg-blueSpecial text-md md:text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75 disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed' disabled={!formIsValid} onClick={() => updateInfo()}>{ loading ? <Spinner/> : 'Update'}</button>
                </div>
            </div>
        <RightMenu/>
        <BottomMenu/>
    </div>
    );
}

export default EditProfile;