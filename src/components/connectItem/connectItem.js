import React from 'react';

import { CheckBadgeIcon } from '@heroicons/react/24/solid';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import io from '../../utility/socket';

function ConnectItem(props) {
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const navigate = useNavigate();

    const issueFollowHandler = () => {
        const userData = {
            _id: props.user._id,
            fullname: props.user.fullname,
            tagName: props.user.tagName,
            profileUrl: props.user.profileUrl
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/followUser`, {toFollow: userData},{
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            console.log('followed user');
            props.setReload(true);
            if(io.getIO()) {
                const notif = {
                    isFollow: true,
                    item: userId,
                    by: {
                        userId: userId,
                        profileUrl: profileUrl,
                        fullname: fullname
                    },
                    to: [props.user._id]
                }
                io.getIO().emit('followedSomeone', notif);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className='w-[100%] hover:bg-closestToPrimary flex justify-start items-start space-x-2 py-2 px-2'>
            <div className='relative w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black mt-2'>
                <img src={props.user.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div>
            <div className='w-[100%]'>
                <div className='w-[100%] flex justify-between items-center'>
                    <div className='flex flex-col justify-start items-start'>
                        <h3 className='text-[12px] md:text-xl font-semibold md:font-bold flex justify-start items-center w-[9rem] md:w-auto whitespace-nowrap overflow-x-hidden overflow-ellipsis duration-75 hover:underline hover:duration-75 cursor-pointer' onClick={() => {
                            navigate(`/main/${props.user._id}`, { state: {user: props.user}, replace: false})
                        }}>{props.user.fullname}<span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                        <p className='text-[12px] md:text-sm text-darkTextColor mt-[-0.2rem]'>{props.user.tagName}</p>
                    </div>
                    <button className='bg-iconsColor text-sm md:text-md text-primary font-semibold rounded-full px-2 md:px-3 py-1 md:py-2 outline-none' onClick={() => {issueFollowHandler()}}>Follow</button>
                </div>
                <p className='leading-[17px] text-[12px] md:text-[15px]'>{props.user.bio}</p>
            </div>
        </div>
    );
}

export default ConnectItem;