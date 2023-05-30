import React, { useEffect, useRef, useState } from 'react';
import './twitterInput.css';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GifIcon, PhotoIcon, QueueListIcon, FaceSmileIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import dog1 from '../../gifs/dog1.json';
import kid1 from '../../gifs/kid1.json';
import kids from '../../gifs/kids.json';
import people1 from '../../gifs/people1.json';
import people2 from '../../gifs/people2.json';
import people3 from '../../gifs/people3.json';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';
import { PUSHNEWTWEET } from '../../store/tweets';
import { useNavigate } from 'react-router-dom';
import io from '../../utility/socket';

function TwitterInput(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const focusInput = useSelector(state => state.uiStates.focusNewTweet);
    const token = useSelector(state => state.authenticate.token);
    const [onGif, setOnGif] = useState(false);
    const [theGif, setTheGif] = useState(null);
    const [gifName, setGifName] = useState('');
    const [isPickerVisible, setIsPickerVisibile] = useState(false);
    const [inputedText, setInputedText] = useState('');
    const [myLocation, setMyLocation] = useState('');
    const [showLocationView, setShowLocationView] = useState(false);
    const photosRef = useRef();

    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);
    const [photo4, setPhoto4] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(theGif) {
            theGif === dog1 ? setGifName('dog1') : 
            theGif === kid1 ? setGifName('kid1') : 
            theGif === kids ? setGifName('kids') : 
            theGif === people1 ? setGifName('people1') : 
            theGif === people2 ? setGifName('people2') : 
            theGif === people3 ? setGifName('people3') : setGifName('');
        }
    }, [theGif]);
    

    const sendTweetHandler = () => {
        setLoading(true);
        const data = new FormData();
        if(photo1) {data.append('photos', photo1)}
        if(photo2) {data.append('photos', photo2)}
        if(photo3) {data.append('photos', photo3)}
        if(photo4) {data.append('photos', photo4)}
        if(myLocation) {data.append('mylocation', myLocation)}
        if(gifName) {data.append('gif', gifName)}
        data.append('text', inputedText);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/tweet`, data, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(res => {
            setLoading(false);
            setPhoto1(null); setPhoto2(null); setPhoto3(null); setPhoto4(null);
            setInputedText(''); setMyLocation(''); setShowLocationView(false);
            setIsPickerVisibile(false);
            dispatch(PUSHNEWTWEET(res.data.tweet));
            if(window.innerWidth <= 500)  {
                navigate('/main');
            }
            if(io.getIO()) {
                const theIO = io.getIO();
                theIO.emit('newTweet', res.data.tweet);
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            alert(err.response.data.message);
        })
    }

    return (
        <div className='relative flex flex-col md:flex-row w-[100%] md:mt-[5.8rem] justify-start items-start border-b-[1px] border-darkClose py-3 px-2'>
            <div className='w-[100%] md:w-[5rem] flex justify-between items-center px-[0.5rem]'>
                <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700'>
                    <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div>
                { window.innerWidth <= 500 ? <XMarkIcon className='w-[1.5rem] bg-darkComponentVar text-iconsColor rounded-full hover:bg-darkClose' onClick={() => navigate(-1)}/> : null}
            </div>
            
            <div className='flex flex-col justify-start items-start py-1 px-2 space-y-2 w-[100%]'>
                <input type='text' placeholder="What's happening?" className='textarea h-[3rem] w-[85%] bg-transparent  focus:outline-none text-lg' onChange={e => setInputedText(e.target.value)} value={inputedText} autoFocus={focusInput}/>
                {/* Location */}
                { showLocationView ?
                    <div className='w-[100%] flex justify-start items-center'>
                        <input type='text' placeholder="Your location" className='h-[3rem] w-[50%] bg-transparent focus:outline-none text-md border-t-[2px] border-blueSpecial text-blue-600' onChange={e => setMyLocation(e.target.value)} value={myLocation}/>

                        { myLocation ? 
                            <XMarkIcon className='w-[1.2rem] bg-blue-600 text-iconsColor rounded-full hover:bg-blueSpecial' title='clear location' onClick={() => setMyLocation('')}/>
                        :null}
                    </div>
                :null}
                            
                {/* Only one photo */}
                { photo1 && !photo2 && !photo3 && !photo4 ?
                    <div className='relative w-[100%] p-2 bg-darkComponentVar rounded-xl'>
                        <img src={URL.createObjectURL(photo1)} alt='' className='w-[100%] object-contain rounded-xl'/>
                        <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto1(null)}/>
                    </div> 
                // Two pics
                : photo1 && photo2 && !photo3 && !photo4 ?
                    <div className='relative h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2 overflow-hidden'>
                        {/* image1 */}
                        <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                            <img src={URL.createObjectURL(photo1)} alt='' className=' h-[100%] w-[100%] object-contain rounded-xl'/>
                            <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto1(null)}/>
                        </div>
                        {/* image2 */}
                        <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                            <img src={URL.createObjectURL(photo2)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                            <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto2(null)}/>
                        </div>
                    </div>
                    // three pics entered
                : photo1 && photo2 && photo3 && !photo4 ?
                    <div className='relative h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2'>
                        {/* image1 */}
                        <div className='relative w-[50%] overflow-hidden rounded-xl bg-darkComponentVar'>
                            <img src={URL.createObjectURL(photo1)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                            <XMarkIcon className='absolute top-[0.5rem] left-[0.5rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto1(null)}/>
                        </div>
                        <div className='w-[50%] h-[100%] flex flex-col justify-start items-center space-y-2'>
                            {/* image2 */}
                            <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo2)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto2(null)}/>
                            </div>
                            {/* image3 */}
                            <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo3)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto3(null)}/>
                            </div>
                        </div>
                    </div>
                    // All four images are there
                : photo1 && photo2 && photo3 && photo4 ?
                    <div className='relative h-[20rem] w-[100%] p-2 rounded-xl flex flex-col justify-start items-center space-y-2'>
                        <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                            {/* image1 */}
                            <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo1)} alt='' className='h-[100%] w-[100%] object-contain'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto1(null)}/>
                            </div>
                            {/* image2 */}
                            <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo2)} alt='' className='h-[100%] w-[100%] object-contain'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto2(null)}/>
                            </div>
                        </div>

                        <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                            {/* image3 */}
                            <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo3)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto3(null)}/>
                            </div>
                            {/* image4 */}
                            <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={URL.createObjectURL(photo4)} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                <XMarkIcon className='absolute top-[0.2rem] left-[0.2rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto4(null)}/>
                            </div>
                        </div>
                    </div>
                :null}

                {/* Gif */}
                { theGif ?
                    <div className='relative w-[100%] p-2 rounded-xl bg-darkComponentVar'>
                        <Lottie animationData={theGif} className='w-[100%] object-contain rounded-xl'/>
                        <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setTheGif(null)}/>
                    </div> 
                :null}

                {/* Emoji Picker */}
                { isPickerVisible ? 
                    <div className='w-content md:absolute z-10 top-[3rem]'>
                        <Picker data={data} theme='dark' previewPostion='none' onEmojiSelect={e => {
                            setInputedText(inputedText + e.native);
                            setIsPickerVisibile(!isPickerVisible);
                        }} />
                    </div>
                :null}
    
                {onGif ?  
                    <div className='w-[100%] flex flex-col justify-start items-start'>
                        <div className='w-[100%] flex justify-between items-start'>

                            <Lottie animationData={dog1} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar hover:bg-darkComponentVar rounded-lg' onClick={() => {
                                setTheGif(dog1);
                                setOnGif(false);
                            } }/>

                            <Lottie animationData={kid1} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar hover:bg-darkComponentVar rounded-lg' onClick={() =>  {
                                setTheGif(kid1);
                                setOnGif(false);
                                }}/>
                        </div>
                        <div className='w-[100%] flex justify-between items-start'>

                            <Lottie animationData={kids} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar  hover:bg-darkComponentVar rounded-lg' onClick={() => {
                                setTheGif(kids);
                                setOnGif(false);
                                }}/>

                            <Lottie animationData={people1} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar hover:bg-darkComponentVar rounded-lg' onClick={() => {
                                setTheGif(people1);
                                setOnGif(false);
                                }}/>
                        </div>
                        <div className='w-[100%] flex justify-between items-start'>

                            <Lottie animationData={people2} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar hover:bg-darkComponentVar rounded-lg' onClick={() => setTheGif(people2)}/>

                            <Lottie animationData={people3} className='bg-1/2 px-[3px] border-[1px] border-darkComponentVar hover:bg-darkComponentVar rounded-lg' onClick={() => setTheGif(people3)}/>
                        </div>
                    </div>
                :null}
                <div className='flex justify-between items-center px-1 w-[100%] border-t-[1px] border-darkComponentVar py-[0.5rem]'>
                    <div className='w-[50%] flex justify-evenly items-center'>
                        <input type='file' multiple className='hidden' ref={photosRef} onChange={e => {
                            setPhoto1(e.target.files[0]);
                            setPhoto2(e.target.files[1]);
                            setPhoto3(e.target.files[2]);
                            setPhoto4(e.target.files[3]);
                            }}/>
                        <PhotoIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Photos' onClick={() => photosRef.current.click()}/>

                        <GifIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Gif' onClick={() => setOnGif(!onGif)}/>
                        <QueueListIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='List'/>
                        <FaceSmileIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Emojis' onClick={() => setIsPickerVisibile(!isPickerVisible)}/>
                        <MapPinIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Map Point' onClick={() => {
                            setShowLocationView(!showLocationView);
                            setMyLocation('');
                            }}/>
                    </div>
                    <button disabled={!inputedText || loading} className='text-md bg-blueSpecial text-iconsColor px-[1rem] py-[0.5rem] rounded-full disabled:bg-gray-700 disabled:text-gray-500' onClick={() => sendTweetHandler()}>{ loading ? <Spinner/> : 'Tweet'}</button>
                </div>
            </div>
        </div>
    );
}

export default TwitterInput;