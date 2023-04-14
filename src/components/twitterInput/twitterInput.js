import React from 'react';
import './twitterInput.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GifIcon, PhotoIcon, QueueListIcon, FaceSmileIcon, MapPinIcon } from '@heroicons/react/24/outline';

function TwitterInput(props) {
    return (
        <div className='hidden md:flex w-[100%] md:mt-[5.8rem] justify-start items-start border-b-[1px] border-darkClose py-3'>
            <div>
                <UserCircleIcon className=' w-[3rem] md:w-[4rem] text-darkComponentVar' />
                {/* <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700'>
                    <img src={} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div> */}
            </div>
            <div className='flex flex-col justify-start items-start py-1 px-2 space-y-2 w-[100%]'>
                <textarea placeholder="What's happening?" className='textarea h-[3rem] w-[85%] bg-transparent  focus:outline-none text-lg' />
                <div className='flex justify-between items-center px-1 w-[100%]'>
                    <div className='w-[50%] flex justify-evenly items-center'>
                        <PhotoIcon className='w-[1.2rem] text-blueSpecial'/>
                        <GifIcon className='w-[1.2rem] text-blueSpecial'/>
                        <QueueListIcon className='w-[1.2rem] text-blueSpecial'/>
                        <FaceSmileIcon className='w-[1.2rem] text-blueSpecial'/>
                        <MapPinIcon className='w-[1.2rem] text-blueSpecial'/>
                    </div>
                    <button className='text-md bg-blueSpecial text-iconsColor px-[1rem] py-[0.5rem] rounded-full'>Tweet</button>
                </div>
            </div>
        </div>
    );
}

export default TwitterInput;