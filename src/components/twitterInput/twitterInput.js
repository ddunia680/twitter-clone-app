import React from 'react';
import './twitterInput.css';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GifIcon, PhotoIcon, QueueListIcon, FaceSmileIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

function TwitterInput(props) {
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    return (
        <div className='hidden md:flex w-[100%] md:mt-[5.8rem] justify-start items-start border-b-[1px] border-darkClose py-3 px-2'>
            {/* <UserCircleIcon className=' w-[3rem] md:w-[4rem] text-darkComponentVar' /> */}
            <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700'>
                <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div>
            <div className='flex flex-col justify-start items-start py-1 px-2 space-y-2 w-[100%]'>
                <textarea placeholder="What's happening?" className='textarea h-[3rem] w-[85%] bg-transparent  focus:outline-none text-lg' />
                <div className='flex justify-between items-center px-1 w-[100%]'>
                    <div className='w-[50%] flex justify-evenly items-center'>
                        <PhotoIcon className='w-[1.2rem] text-blueSpecial p-[2px] hover:bg-blueLight rounded-full'/>
                        <GifIcon className='w-[1.2rem] text-blueSpecial p-[2px] hover:bg-blueLight rounded-full'/>
                        <QueueListIcon className='w-[1.2rem] text-blueSpecial p-[2px] hover:bg-blueLight rounded-full'/>
                        <FaceSmileIcon className='w-[1.2rem] text-blueSpecial p-[2px] hover:bg-blueLight rounded-full'/>
                        <MapPinIcon className='w-[1.2rem] text-blueSpecial p-[2px] hover:bg-blueLight rounded-full'/>
                    </div>
                    <button className='text-md bg-blueSpecial text-iconsColor px-[1rem] py-[0.5rem] rounded-full'>Tweet</button>
                </div>
            </div>
        </div>
    );
}

export default TwitterInput;