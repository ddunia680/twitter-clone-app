import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlusIcon, UserIcon, ChatBubbleLeftIcon, BookmarkIcon, ListBulletIcon, PlayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import './smallSMenu.css';
import { SETSHOWLEFTSMENU } from '../../store/uiStates';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../store/authenticate';

function SmallSMenu(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.authenticate.userId);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const tagName = useSelector(state => state.authenticate.tagName);
    const isVisible = useSelector(state => state.uiStates.showLeftMenu);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [showLogout, setShowLogout] = useState(false);

    const moreIconClasses = ['font-bold w-[20px] duration-75', showLogout ? 'rotate-90 duration-75' : 'rotate-0 duration-75'];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/followStatus/${userId}`)
            .then(res => {
                setFollowing(res.data.following);
                setFollowers(res.data.followers);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToProfile = () => {
        dispatch(SETSHOWLEFTSMENU(false));
        navigate(`/main/${userId}`);
    }

    const goToComponent = (comp) => {
        dispatch(SETSHOWLEFTSMENU(false));
         navigate(`/underConst/${comp}`);
    }

    const Mclasses = ['relative w-[80%] bg-closestToPrimary h-[100vh] py-[3px] px-[1rem] border-r-[1px] border-darkComponent flex flex-col', isVisible ? 'mountSlide' : 'unmountSlide'];

    return (
        <div className={Mclasses.join(' ')}>
            <div className='flex flex-col w-[100%] border-b-[1px] border-darkComponent py-[1rem]'>
                {/* Profile side */}
                <div className='w-[100%] flex justify-between'>
                        <div className='w-[1.7rem] h-[1.7rem] rounded-full overflow-hidden bg-gray-800 mr-[1rem]' title='my Menu' onClick={() => goToProfile()}>
                            <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                        </div>
                        <UserPlusIcon className='w-[1.5rem] h-[1.5rem] text-iconsColor rounded-full border-[1px] border-iconsColor'/>
                </div>
                <p className='text-[12px] font-semibold text-iconsColor' onClick={() => goToProfile()}>{fullname}</p>
                <p className='text-[12px] font-semibold text-gray-500' onClick={() => goToProfile()}>{tagName}</p>

                {/* Follow status */}
                <div className='w-[80%] flex justify-between items-center mt-[2px]'>
                    <p className='text-gray-500 text-[11px] font-semibold'>
                        <span className='text-iconsColor'>{following.length}</span> Following
                    </p>
                    <p className='text-gray-500 text-[11px] font-semibold'>
                        <span className='text-iconsColor'>{followers.length}</span> Followers
                    </p>
                </div>
            </div>
            {/* Second section */}
            <div className='w-[100%] flex flex-col justify-start items-start space-y-[1rem] pt-[0.5rem] border-b-[1px] border-darkComponent pb-[1.5rem]'>
                {/* profile */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => goToProfile()}>
                    <UserIcon className='font-bold w-[20px]'/>
                    <p className='font-bold text-[17px]'>Profile</p>
                </div>
                {/* Topics */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => goToComponent('Topics')}>
                    <ChatBubbleLeftIcon className='font-bold w-[20px]' />
                    <p className='font-bold text-[17px]'>Topics</p>
                </div>
                {/* Bookmarks */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => goToComponent('Bookmarks')}>
                    <BookmarkIcon className='font-bold w-[20px]'/>
                    <p className='font-bold text-[17px]'>Bookmarks</p>
                </div>
                {/* Lists */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => goToComponent('Lists')}>
                    <ListBulletIcon className='font-bold w-[20px]' />
                    <p className='font-bold text-[17px]'>Lists</p>
                </div>
                {/* Twitter Circles */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => goToComponent('Twitter Circles')}>
                    <UserIcon className='font-bold w-[20px]' />
                    <p className='font-bold text-[17px]'>Twitter Circles</p>
                </div>
                {/* More */}
                <div className='w-[100%] flex justify-start items-center space-x-[1rem] text-iconsColor' onClick={() => setShowLogout(!showLogout)}>
                    <PlayIcon className={moreIconClasses.join(' ')} />
                    <p className='font-bold text-[17px]'>More</p>
                </div>
                { showLogout ?
                    <div className='ml-[2rem] bg-darkComponentVar px-[1.5rem] rounded-lg' onClick={() => {
                        dispatch(SETSHOWLEFTSMENU(false));
                        dispatch(LOGOUT());
                    }}>Logout</div>
                :null}
            </div>
            <p className='absolute bottom-[2rem] left-[30%] text-[10px] text-gray-500'>My Twitter app &copy; 2023</p>
        </div>
    );
}

export default SmallSMenu;