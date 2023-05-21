import React, { useState } from 'react';
import mum from '../../images/mum.jpg';
import { StarIcon } from '@heroicons/react/24/solid';

function NotificationItem(props) {
    const [seen, setSeen] = useState(false);
    const wrapperClasses = ['w-[100%] flex justify-start items-start p-[0.5rem] border-b-[1px] border-darkClose', seen ? 'bg-primary' : 'bg-closestToPrimary']
    return (
        <div className={wrapperClasses.join(' ')}>
            <div className='w-[10%]'>
                <StarIcon className='w-[2rem] md:w-[2.5rem] text-blueSpecial '/>
            </div>
            <div className='w-[90%] flex flex-col justify-start items-start'>
                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer' onClick={
                    () => {
                        // navigate(`/main/${tweet.by._id}`, { state: {user: tweet.by}, replace: false })
                    }}>
                    <img src={mum} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div>
                <p className='text-[13px] md:text-[15px] ml-[0.5rem]'><span className='font-bold'>Dunia Dunia</span> started following you</p>
            </div>
        </div>
    );
}

export default NotificationItem;