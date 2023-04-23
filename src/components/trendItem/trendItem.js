import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

function TrendItem(props) {
    return (
        <div className='w-[100%] flex justify-between items-start my-5 py-[5px] px-[1rem] duration-75 bg-darkComponent hover:bg-darkComponentVar hover:duration-75 cursor-pointer'>
            <div className='flex flex-col justify-start items-start space-y-[-1px]'>
                <p className='text-sm text-darkTextColor'>Achraf Hakimi</p>
                <h4 className='text-md font-bold text-iconsColor'>Hakimi</h4>
                <p className='text-sm text-darkTextColor'>4.553 Tweets</p>
            </div>
            <div className='p-[3px] bg-transparent text-iconsColor rounded-full hover:text-blueSpecial hover:bg-blueLight'>
                <EllipsisHorizontalIcon className='w-[1.2rem]'/>
            </div>
            
        </div>
    );
}

export default TrendItem;