import React, { useState } from 'react';
import { HomeIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HashtagIcon, UsersIcon, BellIcon, EnvelopeIcon, BookmarkIcon, UserIcon, EllipsisHorizontalCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/authenticate';
import { useNavigate } from 'react-router-dom';
import { FOCUSONNEWTWEET } from '../../store/uiStates';

function LeftMenu(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.authenticate.userId)
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const tagName = useSelector(state => state.authenticate.tagName);

    const [showLogout, setShowLogout] = useState(false);
    return (
        <div className='hidden md:flex relative w-[10%] xl:w-[20%] h-[100vh] flex-col justify-start items-center xl:items-start p-[1rem] border-r-[1px] border-darkClose space-y-2 font-mono'>
            {/* The bird */}
            <div className='p-[0.7rem] duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <FontAwesomeIcon icon={faTwitter} className='text-[2rem] text-iconsColor'/>
            </div>
            
            {/* Home */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Home' onClick={() => navigate('/main')}>
                <div className='relative'>
                    <HomeIcon className='w-[1.7rem]'/>
                    <div className='absolute top-[-2px] right-0 bg-blueSpecial w-[8px] h-[8px] rounded-full'></div>
                </div>
                
                <h2 className='hidden xl:block text-xl text-iconsColor'>Home</h2>
            </div>

            {/* Explore */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Explore' onClick={() => navigate(`/underConst/${'Explore'}`)}>
                <HashtagIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Explore</h2>
            </div>

            {/* Community */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Community' onClick={() => navigate(`/underConst/${'Community'}`)}>
                <UsersIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Community</h2>
            </div>

            {/* Notifications */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Notifications' onClick={() => navigate(`/notification`)}>
                <div className='relative'>
                    <BellIcon className='w-[1.7rem]'/>
                    <div className='absolute top-[-3px] right-[-5px] bg-blueSpecial py-[1px] px-[6px] rounded-full text-[10px] border-[1px] border-primary'>1</div>
                </div>
                
                <h2 className='hidden xl:block text-xl text-iconsColor'>Notifications</h2>
            </div>

            {/* Messages */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Messages' onClick={() => navigate(`/underConst/${'Messages'}`)}>
                <EnvelopeIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Messages</h2>
            </div>

            {/* Bookmarks */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='Bookmarks' onClick={() => navigate(`/underConst/${'Bookmarks'}`)}>
                <BookmarkIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Bookmarks</h2>
            </div>

            {/* Twitter Blue */}
            {/* <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75'>
                <HomeIcon className='w-[1.7rem]'/>
                <h2 className='text-xl text-iconsColor'>Twitter Blue</h2>
            </div> */}

            {/* Profile */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='profile' onClick={() => navigate(`${userId}`)}>
                <UserIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>Profile</h2>
            </div>

            {/* More */}
            <div className='pl-[0.7rem] pr-[1rem] duration-75 h-[3rem] rounded-full flex justify-start items-center space-x-3 hover:bg-darkClose hover:duration-75 cursor-pointer' title='more' onClick={() => navigate(`/underConst/${'More'}`)}>
                <EllipsisHorizontalCircleIcon className='w-[1.7rem]'/>
                <h2 className='hidden xl:block text-xl text-iconsColor'>More</h2>
            </div>

            {/* Tweet */}
            <div className=' px-[1rem] xl:px-[5rem] py-[1rem] text-lg font-bold bg-blueSpecial rounded-full cursor-pointer' title='tweet' onClick={() => dispatch(FOCUSONNEWTWEET(true))}>
                <PlusIcon className='w-[2rem] block xl:hidden'/>
                <p className='hidden xl:block'>Tweet</p>
            </div>

            {/* Logged in user */}
            <div className='absolute bottom-5 left-0 w-[90%] py-[1rem] px-[0.5rem] duration-75 flex justify-center xl:justify-start items-center rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer'>
                <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700' title={tagName} onClick={() => navigate(`${userId}`)}>
                    <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div>
                {/* <UserCircleIcon className='text-gray-600 w-[3rem]'/> */}
                    <div className=' hidden xl:flex justify-between items-center w-[90%] pl-1'>
                        <div className='flex flex-col jusify-between items-start'>
                            <p className='text-gray-50 font-semibold md:w-[90%] whitespace-nowrap overflow-x-hidden overflow-ellipsis hover:underline' onClick={() => {
                                navigate(`${userId}`);
                                
                                }}>{fullname}</p>
                            <p className='text-gray-400 md:w-[90%] whitespace-nowrap overflow-x-hidden overflow-ellipsis'>{tagName}</p>
                        </div>
                        <EllipsisHorizontalIcon className='w-[1.5rem] mx-1 rounded-full hover:text-blueSpecial hover:bg-blueLight' onClick={() => setShowLogout(!showLogout)}/>
                    </div>
                    { showLogout ? <div className='absolute top-[-1rem] right-0 px-4 py-2 rounded-lg bg-darkClose text-iconsColor duration-150 hover:bg-redBg hover:text-redText hover:duration-150 popUp' onClick={() => {
                        setShowLogout(false);
                        dispatch(LOGOUT());
                        }}>Logout</div> :null}                             
            </div>
        </div>
    );
}

export default LeftMenu;