import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../UI/spinner/spinner';
// import cecile from '../../images/cecile3.JPG';

function ToFollow(props) {
    const navigate = useNavigate();
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const [followStatus, setFollowStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const me = props.user.followers.find(id => id.toString() === userId.toString());
        if(me) {
            setFollowStatus(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const issueFollowHandler = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/followUser`, {toFollow: props.user._id},{
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            setLoading(false);
            setFollowStatus(true);
            props.setReload(true);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    const issueUnfollowHandler = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/unfollowUser`, {toFollow: props.user._id}, {
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            setLoading(false);
            setFollowStatus(false);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    return (
        <div className='w-[100%] flex justify-between items-center space-x-2 my-2 md:my-5 py-[5px] px-[0.5rem] md:px-[1rem] duration-75 bg-darkComponent hover:bg-darkComponentVar hover:duration-75 cursor-pointer'>
            <div className='w-[70%] flex justify-start items-center'>
                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-800'>
                    <img src={props.user.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div>
                <div className='flex flex-col justify-start items-start w-[60%] ml-[5px]'> 
                    <h4 className='text-md font-bold text-iconsColor h-[1.6rem] w-[100%] whitespace-nowrap overflow-x-hidden overflow-ellipsis hover:underline' onClick={() => {
                        navigate(`/main/${props.user._id}`, { state: {user: props.user}, replace: false})
                    }}>{props.user.fullname}</h4>
                    <h4 className='text-md mt-[-0.3rem] text-darkTextColor h-[1rem]'>{props.user.tagName}</h4>
                </div>
            </div>
            { !followStatus ?
                <button className='w-[30%] bg-iconsColor text-primary text-sm md:text-md font-semibold rounded-full px-3 py-2' onClick={() => {
                    issueFollowHandler()
                }}>{ loading ? <Spinner/> : 'Follow'}</button>
            :
                <button className='w-[30%] bg-iconsColor text-primary text-sm md:text-md font-semibold rounded-full px-3 py-2' onClick={() => {
                    issueUnfollowHandler()
                }}>{ loading ? <Spinner/> : 'UnFollow'}</button>
        }
        </div>
    );
}

export default ToFollow;