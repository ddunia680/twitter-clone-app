import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';
import { useNavigate } from 'react-router-dom';

function NotificationItem(props) {
    const navigate = useNavigate();
    const [seen, setSeen] = useState(false);
    const [followingText, setFollowingText] = useState('');
    const [userIdentity, setUserIdentity] = useState();

    const wrapperClasses = ['w-[100%] flex justify-start items-start p-[0.5rem] border-b-[1px] border-darkClose hover:bg-darkComponent', seen ? 'bg-primary' : 'bg-closestToPrimary'];
    const startIconClasses = ['w-[2rem] md:w-[2.5rem]', seen ? 'text-darkComponentVar' : 'text-blueSpecial'];

    useEffect(() => {
        if(props.notification.isFollow) {
            setFollowingText('started following you');
        } else if(props.notification.isComment) {
            setFollowingText('commented on your tweet')
        }else if(props.notification.isLike) {
            setFollowingText('liked your post');
        }
        setSeen(props.notification.seen);
        setUserIdentity(props.notification.by);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const issueSeen = () => {
            if(!seen) {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/notificationSeen/${props.notification._id}`)
                .then(res => {
                    setSeen(res.data.seen);
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }

    const openNotification = () => {
        if(props.notification.isLike) {
            navigate(`/main/innerTweet/${props.notification.item}`, {state: {retweetedBy: null , replace: false}});
        } else if(props.notification.isComment) {
            navigate(`/main/innerTweet/${props.notification.item}`, {state: {retweetedBy: null , replace: false}});
        } else if(props.notification.isFollow) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAUser/${props.notification.item}`)
            .then(res => {
                navigate(`/main/${props.notification.item}`, { state: {user: res.data.user }, replace: false});
            })
            .catch(err => console.log(err));
        }
    }


    return (
        <div className={wrapperClasses.join(' ')} onClick={() => {
            issueSeen();
            openNotification();
        }}>
            <div className='w-[10%]'>
                <StarIcon className={startIconClasses.join(' ')}/>
            </div>
            <div className='w-[90%] flex flex-col justify-start items-start'>
                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer' onClick={
                    () => {
                        // navigate(`/main/${tweet.by._id}`, { state: {user: tweet.by}, replace: false })
                    }}>
                    { userIdentity ? <img src={userIdentity.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/> : <Spinner/>}
                </div>
                <p className='text-[13px] md:text-[15px] ml-[0.5rem]'><span className='font-bold'>{userIdentity ? userIdentity.fullname : ''}</span> {followingText}</p>
            </div>
        </div>
    );
}

export default NotificationItem;