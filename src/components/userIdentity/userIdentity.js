import React, { useEffect, useRef, useState } from 'react';
import './userIdentity.css';
import { ArrowLeftIcon, EllipsisHorizontalIcon, BellAlertIcon, MapPinIcon, LinkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Tweet from '../tweet/tweet';
import LeftMenu from '../../containers/leftMenu/leftMenu';
import RightMenu from '../../containers/rightMenu/rightMenu';
import BottomMenu from '../../containers/bottomMenu/bottomMenu';

import apic from '../../images/apic.jpg';
import profile from '../../images/mary.jpg';
import mum from '../../images/mum.jpg';
import dad from '../../images/dad.jpg';
import cecile from '../../images/cecile3.JPG';
import { useDispatch, useSelector } from 'react-redux';
import { SETONUSERLIKES, SETONUSERMEDIA, SETONUSERREPLIES, SETONUSERTWEETS } from '../../store/uiStates';
import { useNavigate, useParams } from 'react-router-dom';

function UserIdentity(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myIdentityView = useRef();
    const [showUnfollow, setShowFollow] = useState(false);
    const [followBInNav, setFollowInNav] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const onUserTweet = useSelector(state => state.uiStates.onUserTweet);
    const onUserReplies = useSelector(state => state.uiStates.onUserReplies);
    const onUserMedia = useSelector(state => state.uiStates.onUserMedia);
    const onUserLikes = useSelector(state => state.uiStates.onUserLikes);

    const userId = useSelector(state => state.authenticate.userId);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const coverUrl = useSelector(state => state.authenticate.coverUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const tagName = useSelector(state => state.authenticate.tagName);
    const bio = useSelector(state => state.authenticate.bio);
    const createdAt = useSelector(state => state.authenticate.createdAt);
    const website = useSelector(state => state.authenticate.website);
    const location = useSelector(state => state.authenticate.location);
    const { id } = useParams();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    useEffect(() => {
        if(userId === id) {
            setIsMe(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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

    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            <div className='userIdent relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start text-iconsColor bg-primary backdrop-blur-md bg-opacity-80' ref={myIdentityView} onScroll={e => onScroll()}>
                {/* Header */}
                { window.innerWidth > 500 ?  
                    <div className='sticky top-0 left-0 bg-primary bg-opacity-80 w-[100%] z-10 md:flex justify-between items-center space-x-2 md:space-x-4 px-2 border-b-[1px] border-darkClose'>
                        <div className='flex justify-start items-center space-y-2'>
                            <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent' onClick={() => navigate('/main')}>
                                <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                            </div>
                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'>{isMe ? fullname : 'Stanys Bujakera Tshiamala' } <span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                                <p className='text-xs md:text-sm text-darkTextColor'>60.1K Tweets</p>
                            </div>
                        </div>
                        { followBInNav ? !showUnfollow ? 
                                <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Following' onMouseEnter={() => setShowFollow(true)}>
                                    { isMe ? 'Edit Profile' : 'Following'}
                                </div>
                            :
                                <div className='duration-75 rounded-full hover:bg-redBg hover:duration-75 cursor-pointer border-[1px] border-redText px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Unfollow' onMouseLeave={() => setShowFollow(false)}>
                                    Unfollow
                        </div> : null}
                    </div>
                : null}
                
                {/* first slice */}
                <div className='relative w-[100%] h-[5rem] md:h-[12rem] bg-gray-700'>
                    {/* Cover image */}
                    { coverUrl && isMe ? <img src={coverUrl} alt='' className='w-[100%] h-[100%] object-contain'/> :
                    <img src={apic} alt='' className='w-[100%] h-[100%] object-contain'/>}
                    {/* Small screens up menu */}
                    { window.innerWidth <= 500 ?
                        <div className='fixed top-0 left-0 flex justify-between items-center w-[100%] px-2 py-1'>
                            <div className='flex cursor-pointer text-iconsColor justify-start items-center space-x-2' title='Back'>
                                <div className=' bg-primary bg-opacity-50 p-1 rounded-full' onClick={() => navigate('/main')}>
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
                        <img src={ isMe? profileUrl : profile} alt='' className='w-[100%] h-[100%] object-contain'/>
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
                            <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Following' onClick={() => navigate('/main/editProfile')}>
                                Edit Profile
                            </div>
                        : !showUnfollow ? 
                            <div className=' sticky top-0 duration-75 rounded-full hover:bg-darkClose hover:duration-75 cursor-pointer border-[1px] border-iconsColor px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Following' onMouseEnter={() => setShowFollow(true)}>
                                Following
                            </div>
                        :
                            <div className='duration-75 rounded-full hover:bg-redBg hover:duration-75 cursor-pointer border-[1px] border-redText px-[1rem] py-[0.3rem] md:py-2 text-xs md:text-md' title='Unfollow' onMouseLeave={() => setShowFollow(false)}>
                                Unfollow
                            </div>}
                    </div>
                </div>
                {/* Identity down image */}
                <div className='flex flex-col justify-start items-start space-x-2 md:space-x-4 px-[1rem] mt-[-1rem] md:mt-[2rem]'>
                    <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'>{ isMe ? fullname : 'Stanis Bujakera Tshiamala'} <span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                    <p className='text-xs md:text-sm text-darkTextColor'>{ isMe ? tagName : '@StanysBujakera'}</p>
                </div>
                {/* Bio */}
                <p className='px-[1rem] text-sm md:text-md py-2 md:py-0'>{ isMe ? bio : 'Journaliste chez @jeune_afrique | @Reuters | DPA @ActualiteCD.'}</p>
                {/* Links and Location */}
                <div className='flex justify-start items-center space-x-2 py-1 md:py-2 px-[1rem] text-darkTextColor text-sm md:text-md flex-wrap'>
                    { isMe && location ? <p className='flex justify-start space-x-2'><MapPinIcon className='w-[1.2rem]' />{location}</p> : null}
                    { isMe && website ? <p className='flex justify-start space-x-2 text-blueSpecial'><LinkIcon className='w-[1.2rem] text-darkTextColor'/><a href={website}>{website}</a></p> :null}
                    <p className='flex justify-start space-x-2'><CalendarIcon className='w-[1.2rem]' /> { isMe ? 'Joined ' + new Date(createdAt).getDate()+' '+ months[new Date(createdAt).getMonth()]+' '+ new Date(createdAt).getFullYear() :'Joined in February 2009'}</p>
                </div>
                {/* Following and followers */}
                <div className='mt-1 w-[70%] md:w-[35%] flex justify-between items-center px-[1rem]'>
                    <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>300</span>Following</h4>
                    <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>15.2K</span>Followers</h4>
                </div>

                <div className='flex justify-start items-center w-[100%] mt-2 px-[1rem]'>
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
        <RightMenu/>
        <BottomMenu/>
    </div>
    );
}

export default UserIdentity;