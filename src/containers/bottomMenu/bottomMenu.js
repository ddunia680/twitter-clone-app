import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, UsersIcon, BellIcon, EnvelopeIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SETSHOWLEFTSMENU } from '../../store/uiStates';
import axios from 'axios';
import io from '../../utility/socket';
import sendNotif from '../../utility/sendNotif';

function BottomMenu(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authenticate.token);
    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
        if(!('Notification' in window)) {
            console.log("browser doesn't support notifications");
        } else {
            Notification.requestPermission()
        }
    }, []);

    useEffect(() => {
        if(token) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/getNotificationsCount`, {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                setNotificationsCount(res.data.number);
            })
            .catch(err => {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

     useEffect(() => {
        if(io.getIO()) {
            io.getIO().on('gotALike', (notif) => {
                setNotificationsCount(notificationsCount + 1);
                const options = {
                        body: `${notif.by.fullname} liked your tweet`,
                        icon: notif.by.profileUrl,
                        dir: 'ltr'
                    };

                sendNotif({title: 'You got a new Like!', notif: {...options}})
            })

            io.getIO().on('gotAFollower', (notif) => {
                setNotificationsCount(notificationsCount + 1);
                const options = {
                        body: `${notif.by.fullname} started following You`,
                        icon: notif.by.profileUrl,
                        dir: 'ltr'
                    };

                sendNotif({title: 'You got a new Follower!', notif: {...options}})
            })

            io.getIO().on('commentToMyTweet', (comment) => {
                setNotificationsCount(notificationsCount + 1);
                const options = {
                        body: `${comment.by.fullname} commented on your tweet`,
                        icon: comment.by.profileUrl,
                        dir: 'ltr'
                    };

                sendNotif({title: 'You got a new Comment!', notif: {...options}})
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [io.getIO()]);

    const goToComponent = (comp) => {
        dispatch(SETSHOWLEFTSMENU(false));
         navigate(`/underConst/${comp}`);
    }

    return (
        <div className='fixed md:hidden w-[100%] h-[8vh] bottom-0 flex justify-between items-center px-[5%] bg-primary border-t-[0.01rem] border-darkClose backdrop-blur-md bg-opacity-80'>
            <div className='relative'>
                {/* Main */}
                <HomeIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => {
                    navigate('/main');
                }}/>
                <div className='absolute top-0 right-0 bg-blueSpecial w-[6px] h-[6px] rounded-full'></div>
            </div>
            
            {/* Search */}
            <MagnifyingGlassIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => {
                navigate('/search');
            }}/>
            {/* idk */}
            <MegaphoneIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => goToComponent('Speaches')}/>

            {/* Community */}
            <UsersIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75'  onClick={() => goToComponent('Community')}/>

            {/* Notification */}
            <div className='relative' onClick={() => navigate('/notification')}>
                <BellIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' />
                { notificationsCount > 0 ? <div className='absolute top-[-3px] right-[-7px] bg-blueSpecial py-[1px] px-[5px] rounded-full text-[10px] border-[1px] border-primary'>{notificationsCount}</div> : null}
            </div>
            
            {/* Messages */}
            <EnvelopeIcon className='w-[1.3rem] text-iconsColor duration-75 hover:bg-gray-50 hover:duration-75' onClick={() => goToComponent('Messages')}/>
        </div>
    );
}

export default BottomMenu;