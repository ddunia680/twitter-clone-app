import React, { useRef, useState } from 'react';
import './twitterInput.css';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GifIcon, PhotoIcon, QueueListIcon, FaceSmileIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

function TwitterInput(props) {
    const profileUrl = useSelector(state => state.authenticate.profileUrl);

    const photosRef = useRef();
    const gifRef = useRef();

    const [photo, setPhoto] = useState(null);
    const [gif, setGif] = useState(null);
    return (
        <div className='hidden md:flex w-[100%] md:mt-[5.8rem] justify-start items-start border-b-[1px] border-darkClose py-3 px-2'>
            {/* <UserCircleIcon className=' w-[3rem] md:w-[4rem] text-darkComponentVar' /> */}
            <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700'>
                <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div>
            <div className='flex flex-col justify-start items-start py-1 px-2 space-y-2 w-[100%]'>
                <textarea placeholder="What's happening?" className='textarea h-[3rem] w-[85%] bg-transparent  focus:outline-none text-lg' />
                {/* Inputed photo */}
                { photo ?
                    <div className='relative w-[100%] p-2 rounded-xl'>
                        <img src={URL.createObjectURL(photo)} alt='' className='w-[100%] object-contain rounded-xl'/>
                        <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto(null)}/>
                    </div> 
                :null}
                {/* Inputed gif */}
                { gif ?
                    <div className='relative w-[100%] p-2 rounded-xl'>
                        <gif src={URL.createObjectURL(gif)} alt='' className='w-[100%] object-contain rounded-xl'/>
                        <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setGif(null)}/>
                    </div> 
                :null}
                <div className='flex justify-between items-center px-1 w-[100%]'>
                    <div className='w-[50%] flex justify-evenly items-center'>
                        <input type='file' className='hidden' ref={photosRef} onChange={e => setPhoto(e.target.files[0])}/>
                        <PhotoIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Photos' onClick={() => photosRef.current.click()}/>

                        <input type='file' className='hidden' ref={gifRef} onChange={e => setGif(e.target.files[0])}/>
                        <GifIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Gif' onClick={() => gifRef.current.click()}/>
                        <QueueListIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='List'/>
                        <FaceSmileIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Emojis'/>
                        <MapPinIcon className='w-[1.5rem] text-blueSpecial p-[3px] hover:bg-blueLight rounded-full' title='Map Point'/>
                    </div>
                    <button className='text-md bg-blueSpecial text-iconsColor px-[1rem] py-[0.5rem] rounded-full'>Tweet</button>
                </div>
            </div>
        </div>
    );
}

export default TwitterInput;