import React, { useEffect, useRef, useState } from 'react';
import './userIdentity.css';
import { ArrowLeftIcon, EllipsisHorizontalIcon, BellAlertIcon, MapPinIcon, LinkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Tweet from '../tweet/tweet';
import LeftMenu from '../../containers/leftMenu/leftMenu';
import RightMenu from '../../containers/rightMenu/rightMenu';


import mum from '../../images/mum.jpg';
import dad from '../../images/dad.jpg';
import cecile from '../../images/cecile3.JPG';
import { useDispatch, useSelector } from 'react-redux';
import { SETONUSERLIKES, SETONUSERMEDIA, SETONUSERREPLIES, SETONUSERTWEETS } from '../../store/uiStates';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';

function UserIdentity(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationState = useLocation();
    const myIdentityView = useRef();
    const [showUnfollow, setShowFollow] = useState(false);
    const [followBInNav, setFollowInNav] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const [otherUser, setOtherUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    const onUserTweet = useSelector(state => state.uiStates.onUserTweet);
    const onUserReplies = useSelector(state => state.uiStates.onUserReplies);
    const onUserMedia = useSelector(state => state.uiStates.onUserMedia);
    const onUserLikes = useSelector(state => state.uiStates.onUserLikes);

    const userId = useSelector(state => state.authenticate.userId);
    const token = useSelector(state => state.authenticate.token);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const coverUrl = useSelector(state => state.authenticate.coverUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const tagName = useSelector(state => state.authenticate.tagName);
    const bio = useSelector(state => state.authenticate.bio);
    const createdAt = useSelector(state => state.authenticate.createdAt);
    const website = useSelector(state => state.authenticate.website);
    const location = useSelector(state => state.authenticate.location);

    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    useEffect(() => {
        if(userId === id) {
            setIsMe(true);
        } else {
            setIsMe(false);
            setOtherUser(locationState.state.user);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(Object.keys(otherUser).length) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/followStatus/${otherUser._id}`)
            .then(res => {
                setFollowing(res.data.following);
                setFollowers(res.data.followers);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
        } else if(isMe) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/followStatus/${userId}`)
            .then(res => {
                setFollowing(res.data.following);
                setFollowers(res.data.followers);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMe, otherUser]);

    useEffect(() => {
        if(Object.keys(otherUser).length) {
            const theID = otherUser.followers.find(fol => fol.toString() === userId.toString());
            if(theID) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otherUser]);


    const onTweets = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onUserTweet ? 'border-blueSpecial' : 'border-transparent'];
    const onReplies = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onUserReplies ? 'border-blueSpecial' : 'border-transparent'];
    const onMedia = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onUserMedia ? 'border-blueSpecial' : 'border-transparent'];
    const onLikes = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onUserLikes ? 'border-blueSpecial' : 'border-transparent'];

    const onScroll = () => {
        if(myIdentityView.current) {
            const { scrollTop } = myIdentityView.current;
            if(scrollTop >= 280) {
                setFollowInNav(true);
            } else if(scrollTop < 280) {
                setFollowInNav(false);
            }
        }
    }

    const followingBHandler = () => {
        if(!isFollowed) {
            setLoading(true);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/followUser`, {toFollow: otherUser._id},{
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            .then(res => {
                setLoading(false);
                setIsFollowed(true);
                console.log('user followed successfully');
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
        } else {
            setLoading(true);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/unfollowUser`, {toFollow: otherUser._id}, {
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            setLoading(false);
            setIsFollowed(false);
            console.log('user unfollowed successfully');
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
        }
    }

    const goToFollowCenter = (follState) => {
        console.log('we are following');
        if(isMe) {
            navigate(`followCenter`, { 
                state: {
                    user: {
                        _id: userId,
                        fullname: fullname,
                        tagName: tagName
                    }, 
                    onFollowing: follState
                }, 
                replace: false
            })
        } else {
            navigate(`followCenter`, { 
                state: {
                    user: {...otherUser}, 
                    onFollowing: follState
                }, 
                replace: false
            })
        }
    }

    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            <div className='userIdent relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start text-iconsColor bg-primary backdrop-blur-md bg-opacity-80' ref={myIdentityView} onScroll={e => onScroll()}>
                {/* Header */}
                { window.innerWidth > 500 ?  
                    <div className='sticky top-0 left-0 bg-primary bg-opacity-80 w-[100%] z-10 md:flex justify-between items-center space-x-2 md:space-x-4 px-2 border-b-[1px] border-darkClose'>
                        <div className='flex justify-start items-center space-y-2'>
                            <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent' onClick={() => navigate(-1)}>
                                <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                            </div>
                            <div className='flex flex-col justify-between items-start ml-[1rem]'>
                                <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'>{isMe ? fullname : otherUser.fullname } <span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                                <p className='text-xs md:text-sm text-darkTextColor'>60.1K Tweets</p>
                            </div>
                        </div>
                        {followBInNav && isMe ? 
                            <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Edit Profile' onClick={() => navigate('/main/editProfile')}>
                                    Edit Profile'
                                </div>
                        :
                         followBInNav ? !showUnfollow ? 
                                <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Following' onMouseEnter={() => setShowFollow(true)}>
                                    { isMe ? 'Edit Profile' : isFollowed ? 'Following' : 'Follow'}
                                </div>
                            :
                                <div className='duration-75 rounded-full hover:bg-redBg hover:duration-75 cursor-pointer border-[1px] border-redText px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title={isFollowed ? 'Unfollow' : 'Follow'} onMouseLeave={() => setShowFollow(false)} onClick={() => followingBHandler()}>
                                    { loading ? <Spinner/> : isFollowed ? 'Unfollow' : 'Follow'}
                        </div> : null}
                    </div>
                : null}
                
                {/* first slice */}
                <div className='relative w-[100%] h-[5rem] md:h-[12rem] bg-gray-700'>
                    {/* Cover image */}
                    { coverUrl && isMe ? <img src={coverUrl} alt='' className='w-[100%] h-[100%] object-contain'/> :
                    <img src={otherUser.coverUrl} alt='' className='w-[100%] h-[100%] object-contain'/>}
                    {/* Small screens up menu */}
                    { window.innerWidth <= 500 ?
                        <div className='fixed top-0 left-0 flex justify-between items-center w-[100%] px-2 py-1'>
                            <div className='flex cursor-pointer text-iconsColor justify-start items-center space-x-2' title='Back'>
                                <div className=' bg-primary bg-opacity-50 p-1 rounded-full' onClick={() => navigate(-1)}>
                                    <ArrowLeftIcon className='w-[1rem]' />
                                </div>
                            </div>
                            
                            <div className='flex justify-between items-center space-x-2'>
                                {/* Ellipsis */}
                                { !isMe ? <div className='block md:hidden rounded-full bg-primary bg-opacity-50 cursor-pointer text-iconsColor p-1' title='More'>
                                    <EllipsisHorizontalIcon className='w-[1rem]'/>
                                </div>: null}
                                {/* Notification */}
                                { !isMe ? <div className='block md:hidden rounded-full bg-primary bg-opacity-50 cursor-pointer text-iconsColor p-1' title='More'>
                                    <BellAlertIcon className='w-[1rem]'/>
                                </div> :null}
                            </div>
                        </div>
                    : null}
                                    
                    {/* Profile page */}
                    <div className='absolute border-[2px] md:border-[5px] border-primary bg-gray-700 overflow-hidden rounded-full h-[5rem] w-[5rem] md:w-[10rem] md:h-[10rem] ml-[3%] top-[2.3rem] md:top-[7rem]'>
                        <img src={ isMe? profileUrl : otherUser.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                    </div>
                </div>
                <div className='w-[100%] mt-[2.2rem] md:mt-[2.7rem] px-3 flex justify-between items-center py-1'>
                    <div></div>
                    {/* right menu */}
                    <div className='flex justify-start items-center space-x-2'>
                        {/* Ellipsis */}
                        { !isMe ? <div className='hidden md:block duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor' title='More'>
                            <EllipsisHorizontalIcon className='w-[1.2rem] md:w-[1.7rem]'/>
                        </div> :null}
                        {/* Notification */}
                        { !isMe ? <div className='hidden md:block duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor p-[0.3rem] md:p-2' title='More'>
                            <BellAlertIcon className='w-[0.7rem] md:w-[1rem]'/>
                        </div> :null}
                        {/* follow button */}
                        { isMe ? 
                            <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Edit Profile' onClick={() => navigate('/main/editProfile')}>
                                Edit Profile
                            </div>
                        : !showUnfollow ? 
                            <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Following' onMouseEnter={() => setShowFollow(true)}>
                                {isFollowed ? 'Following' : 'Follow'}
                            </div>
                        :
                            <div className='duration-75 rounded-full hover:bg-redBg hover:duration-75 cursor-pointer border-[1px] border-redText px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title={isFollowed ? 'Unfollow' : 'Follow'} onMouseLeave={() => setShowFollow(false)} onClick={() => followingBHandler()}>
                                { loading ? <Spinner/> : isFollowed ? 'Unfollow' : 'Follow'}
                            </div>}
                    </div>
                </div>
                {/* Identity down image */}
                <div className='flex flex-col justify-start items-start space-x-2 md:space-x-4 px-[1rem] mt-[-1rem] md:mt-[2rem]'>
                    <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'>{ isMe ? fullname : otherUser.fullname} <span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                    <p className='text-xs md:text-sm text-darkTextColor'>{ isMe ? tagName : otherUser.tagName}</p>
                </div>
                {/* Bio */}
                <p className='px-[1rem] text-sm md:text-md py-2 md:py-0'>{ isMe ? bio : otherUser.bio}</p>
                {/* Links and Location */}
                <div className='flex justify-start items-center space-x-2 py-1 md:py-2 px-[1rem] text-darkTextColor text-sm md:text-md flex-wrap'>
                    { isMe && location ? 
                        <p className='flex justify-start space-x-2'><MapPinIcon className='w-[1.2rem]' />{location}</p> 
                    : 
                        otherUser.location ? <p className='flex justify-start space-x-2'><MapPinIcon className='w-[1.2rem]' />{otherUser.location}</p> : null}

                    { isMe && website ? 
                        <p className='flex justify-start space-x-2 text-blueSpecial'><LinkIcon className='w-[1.2rem] text-darkTextColor'/><a href={website}>{website}</a></p> 
                    : otherUser.website ? 
                        <p className='flex justify-start space-x-2 text-blueSpecial'><LinkIcon className='w-[1.2rem] text-darkTextColor'/><a href={otherUser.website}>{otherUser.website}</a></p> 
                    :null}
                    <p className='flex justify-start space-x-2'><CalendarIcon className='w-[1.2rem]' /> 
                    { isMe ? 
                        'Joined ' + new Date(createdAt).getDate()+' '+ months[new Date(createdAt).getMonth()]+' '+ new Date(createdAt).getFullYear() 
                    :   
                        'Joined ' + new Date(otherUser.createdAt).getDate()+' '+ months[new Date(otherUser.createdAt).getMonth()]+' '+ new Date(otherUser.createdAt).getFullYear() 
                    }</p>
                </div>
                {/* Following and followers */}
                <div className='mt-1 w-[70%] md:w-[35%] flex justify-between items-center px-[1rem]'>

                    <h4 className='text-darkTextColor text-sm cursor-pointer hover:underline' onClick={() => {goToFollowCenter(true)}}><span className='font-bold text-iconsColor'>{following.length}</span>Following</h4>

                    <h4 className='text-darkTextColor text-sm cursor-pointer hover:underline' onClick={() => {goToFollowCenter(false)}}><span className='font-bold text-iconsColor'>{followers.length}</span>Followers</h4>
                </div>

                <div className='flex justify-start items-center w-[100%] mt-2 px-[1rem] cursor-pointer'>
                    <div className='flex justify-start items-center'>
                        <div className='relative w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                            <img src={dad} alt='' className='w-[100%] h-[100%] object-contain'/>
                        </div>
                        <div className='absolute left-[1.5rem] w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                            <img src={mum} alt='' className='w-[100%] h-[100%] object-contain'/>
                        </div>
                        <div className='absolute left-[2rem] w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                            <img src={cecile} alt='' className='relative w-[100%] h-[100%] object-contain'/>
                        </div>
                    </div>
                    <p className='ml-5 text-sm text-darkTextColor leading-[15px]'> Followed by dad, sis cecile, mum, charles and 5 others you follow</p>
                </div>

                <div className='sticky top-0 md:top-[3.5rem] flex justify-between items-center bg-primary bg-opacity-80 mt-4 w-[100%] h-[2.5rem] md:h-[3.5rem] border-b-[1px] border-darkClose z-10'>
                    <div className='w-1/4 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => dispatch(SETONUSERTWEETS())}>
                        <h4 className={onTweets.join(' ')}>Tweets</h4>
                    </div>
                    <div className='w-1/4 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => dispatch(SETONUSERREPLIES())}>
                        <h4 className={onReplies.join(' ')}>Replies</h4>
                    </div>
                    <div className='w-1/4 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => dispatch(SETONUSERMEDIA())}>
                        <h4 className={onMedia.join(' ')}>Media</h4>
                    </div>
                    <div className='w-1/4 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => dispatch(SETONUSERLIKES())}>
                        <h4 className={onLikes.join(' ')}>Likes</h4>
                    </div>
                </div>
                <div className='w-[100%] flex flex-col justify-start items-start'>
                    <Tweet/>
                    <Tweet/>
                    <Tweet/>
                </div>
            </div>
        { window.innerWidth > 500 ? <RightMenu/> : null}
    </div>
    );
}

export default UserIdentity;