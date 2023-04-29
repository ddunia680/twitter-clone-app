import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, UsersIcon, BellIcon, EnvelopeIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function BottomMenu(props) {
    const navigate = useNavigate();
    return (
        <div className='fixed md:hidden w-[100%] h-[8vh] bottom-0 flex justify-between items-center px-[5%] bg-primary border-t-[0.01rem] border-darkClose backdrop-blur-md bg-opacity-80'>
            <div className='relative'>
                <HomeIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => {
                    navigate('/main');
                }}/>
                <div className='absolute top-0 right-0 bg-blueSpecial w-[6px] h-[6px] rounded-full'></div>
            </div>
            
            <MagnifyingGlassIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => {
                navigate('/search');
            }}/>
            <MegaphoneIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' />
            <UsersIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' />
            <div className='relative'>
                <BellIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' />
                <div className='absolute top-[-3px] right-[-7px] bg-blueSpecial py-[1px] px-[5px] rounded-full text-[10px] border-[1px] border-primary'>1</div>
            </div>
            
            <EnvelopeIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' />
        </div>
    );
}

export default BottomMenu;