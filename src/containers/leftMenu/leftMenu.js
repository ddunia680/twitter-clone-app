import React from 'react';
import { HomeIcon, UserCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HashtagIcon, UsersIcon, BellIcon, EnvelopeIcon, BookmarkIcon, UserIcon, EllipsisHorizontalCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function LeftMenu(props) {
    return (
        <div className='hidden md:flex relative w-[10%] xl:w-[20%] h-[100vh] flex-col justify-start items-center xl:items-start p-[1rem] border-r-[1px] border-darkClose space-y-2 font-mono'>
            {/* The bird */}
            <div className='p-[0.7rem] duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <FontAwesomeIcon icon={faTwitter} className='text-[2rem] text-iconsColor'/>
            </div>
            
            {/* Home */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <div className='relative'>
                    <HomeIcon className='w-[1.7rem]'/>
                    <div className='absolute top-[-2px] right-0 bg-blueSpecial w-[8px] h-[8px] rounded-full'></div>
                </div>
                
                <h2 className='hidden xl:block text-xl text-iconsColor'>Home</h2>
            </div>

            {/* Explore */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <HashtagIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Explore</h2>
            </div>

            {/* Community */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <UsersIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Community</h2>
            </div>

            {/* Notifications */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <div className='relative'>
                    <BellIcon className='w-[1.7rem]'/>
                    <div className='absolute top-[-3px] right-[-5px] bg-blueSpecial py-[1px] px-[6px] rounded-full text-[10px] border-[1px] border-primary'>1</div>
                </div>
                
                <h2 className='hidden xl:block text-xl text-iconsColor'>Notifications</h2>
            </div>

            {/* Messages */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <EnvelopeIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Messages</h2>
            </div>

            {/* Bookmarks */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <BookmarkIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Bookmarks</h2>
            </div>

            {/* Twitter Blue */}
            {/* <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75'>
                <HomeIcon className='w-[1.7rem]'/>
                <h2 className='text-xl text-iconsColor'>Twitter Blue</h2>
            </div> */}

            {/* Profile */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <UserIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Profile</h2>
            </div>

            {/* More */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <EllipsisHorizontalCircleIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>More</h2>
            </div>

            {/* Tweet */}
            <div className=' px-[1rem] xl:px-[5rem] py-[1rem] text-lg font-bold bg-blueSpecial rounded-full cursor-pointer'>
                <PlusIcon className='w-[2rem] block xl:hidden'/>
                <p className='hidden xl:block'>Tweet</p>
            </div>

            {/* Logged in user */}
            <div className='absolute bottom-5 left-0 w-[90%] py-[1rem] px-[0.5rem] duration-75 flex justify-center xl:justify-start items-center rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer'>
                {/* <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700'>
                    <img src={} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div> */}
                <UserCircleIcon className='text-gray-600 w-[3rem]'/>
                    <div className=' hidden xl:flex justify-between items-center w-[90%] pl-1'>
                        <div className='flex flex-col jusify-between items-start'>
                            <p className='text-gray-50 font-semibold'>Dunia Dunia</p>
                            <p className='text-gray-400'>@Dunia_Dunia5</p>
                        </div>
                        <EllipsisHorizontalIcon className='w-[1.5rem] mx-1'/>
                    </div>                                
            </div>
        </div>
    );
}

export default LeftMenu;