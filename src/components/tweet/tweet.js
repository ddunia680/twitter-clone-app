import React, { useEffect, useRef, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterIcon, ArrowDownTrayIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import './tweet.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADDRETWEETED, REMOVETWEET, UPDATERETWEETS } from '../../store/tweets';
import io from '../../utility/socket';

function Tweet(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticate.userId);
    const token = useSelector(state => state.authenticate.token);
    const fullname = useSelector(state => state.authenticate.fullname);
    const [isFollowed, setIsFollowed] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ilikedIt, setILikedIt] = useState(false);
    const [iRetweeted, setIRetweeted] = useState(false);
    const [views, setViews] = useState(props.tweet.views);
    const [likes, setLikes] = useState(props.tweet.likes);
    const [retweets, setRetweets] = useState(props.tweet.retweets);
    const [gottenUser, setgottenUser] = useState({});
    const [showUndoRetweet, setShowUndoRetweet] = useState(false);
    const [showDeleteTweetV, setShowDeleteTweetV] = useState(false);
    const theTweetRef = useRef();
    // console.log(props.tweet);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const ilikedClasses = ['w-[1.2rem]', ilikedIt ? 'text-blueSpecial' : 'text-gray-500'];
    const iRetweetedClasses = ['w-[1.2rem]', iRetweeted ? 'text-blueSpecial' : 'text-gray-500'];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/following`, {
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            const following = res.data.following;
            const theId = props.tweet.retweetedBy ? gottenUser._id : props.tweet.by._id;
            const theFollow = following.find(el => el._id === theId);
            if(theFollow) {
                setIsFollowed(true);
            }
        })
        .catch(err => {
            console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(props.tweet.retweetedBy) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAUser/${ props.tweet.by._id ? props.tweet.by._id : props.tweet.by}`)
            .then(res => {
                setgottenUser(res.data.user);
            })
            .catch(err => {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.tweet.retweetedBy])

    useEffect(() => {
        const myLike = likes.find(like => like.toString() === userId);
        if(myLike) {
            setILikedIt(true);
        } else { setILikedIt(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes]);

    useEffect(() => {
        if(retweets.length) {
            const myRetweet = retweets.findIndex(retw => retw.toString() === userId);
            if(myRetweet <= 0) {
                setIRetweeted(true);
            } else { setIRetweeted(false) }
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retweets]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                setIsIntersecting(entry.isIntersecting);
                // console.log(entry);
            });
            observer.observe(theTweetRef.current)
    }, []);

    useEffect(() => {
        if(isIntersecting) {
            if(props.tweet.by.toString() === userId || (props.tweet.retweetedBy && gottenUser._id === userId)) {
                return;
            } else {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/issueView/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`)
                .then(res => {
                    setViews(res.data.views);
                    if(io.getIO()) {
                        io.getIO().emit('madeAView', {
                            tweet: props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id,
                            by: props.tweet.retweetedBy ? props.tweet.by : props.tweet.by._id
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIntersecting]);

    useEffect(() => {
        if(io.getIO()) {
            const theTweet = props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id;
            io.getIO().on('gotALike', (notif) => {
                
                // console.log(notif);
                if(theTweet === notif.item) {
                    setLikes([...likes, notif.by]);
                }
            });

            io.getIO().on('gotView', tweet => {
                if(tweet === theTweet) {
                    setViews(views + 1);
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [io.getIO()]);

    const issueLikeHandler = () => {
        if(ilikedIt) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/issueUnlike/${userId}/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`)
                .then(res => {
                    setLikes(res.data.likes);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/issueLike/${userId}/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`)
                .then(res => {
                    // console.log(res.data.likes);
                    setLikes(res.data.likes);
                    const theCreator = props.tweet.retweetedBy ? props.tweet.by : props.tweet.by._id
                    if(userId !== theCreator) {
                        if(io.getIO()) {
                            const notification = {
                                isLike: true,
                                item: props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id,
                                by: {
                                    userId: userId, 
                                    profileUrl: props.tweet.retweetedBy ? gottenUser.profileUrl : props.tweet.by.profileUrl,
                                    fullname: props.tweet.retweetedBy ? gottenUser.fullname : props.tweet.by.fullname
                                },
                                to: props.tweet.retweetedBy ? props.tweet.by : props.tweet.by._id
                            }
                            // console.log(notification);

                            io.getIO().emit('madeALike', notification);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const issueRetweet = () => {
        if(props.isComment) {
            return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/issueRetweet/${userId}/${props.tweet.retweetedBy? props.tweet.tweetId : props.tweet._id}`)
                .then(res => {
                    setRetweets(res.data.retweet);
                    dispatch(ADDRETWEETED(res.data.retweet));
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const undoRetweet = () => {
        if(props.isComment) {
            return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/issueUndoRetweet/${userId}/${props.tweet.tweetId}/${props.tweet._id}`)
        .then(res => {
            dispatch(REMOVETWEET(props.tweet._id));
            dispatch(UPDATERETWEETS({case1: props.tweet.tweetId, case2: props.tweet._id, id: userId }));
        })
        .catch(err => console.log(err));
    }

    const deleteTweet = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteTweet/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`)
        .then(res => {
            if(props.tweet.commentTo) {
                props.removeMe(props.tweet._id);
            } else {
                dispatch(REMOVETWEET(props.tweet._id));
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='userIdent relative w-[100%]' onClick={
            (e) => {
                if(showDeleteTweetV) {
                    setShowDeleteTweetV(false);
                } else if(showUndoRetweet) {
                    setShowUndoRetweet(false);
                } else if(e.target instanceof HTMLDivElement) {
                    navigate(`/main/innerTweet/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`, {state: {retweetedBy: props.tweet.retweetedBy ? props.tweet.retweetedBy : null , replace: false}})
                }
            }}>
        { props.tweet.retweetedBy ? 
        <p className='ml-[5%] text-darkTextColor text-[12px] md:text-[14px] flex justify-start items-center font-semibold'><ArrowPathRoundedSquareIcon className='w-[1.2rem]'/>{props.tweet.retweetedBy === fullname? 'You' : props.tweet.retweetedBy} Retweeted</p> 
        : null}
        <div className='relative w-[100%] flex justify-start items-start pt-2 border-b-[1px] border-darkClose' ref={theTweetRef} onClick={() => showUndoRetweet ? setShowUndoRetweet(false): null}>
            <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer' onMouseEnter={() => { setTimeout(() => { setShowPopUp(true)}, 1000)}} onMouseLeave={() => { setTimeout(() => {setShowPopUp(false)}, 1000) }} onClick={
                () => {
                props.tweet.retweetedBy ?
                 navigate(`/main/${gottenUser._id}`, { state: {user: gottenUser}, replace: false})
                :
                navigate(`/main/${ props.tweet.by._id}`, { state: {user: props.tweet.by}, replace: false })
                }}>
                <img src={ props.tweet.retweetedBy? gottenUser.profileUrl : props.tweet.by.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div>
            <div className='relative w-[80%] flex flex-col justify-start items-start pt-1'>
                {/* User identity */}
                <div className='text-[13px] md:text-[15px] w-[90%] flex justify-start items-start cursor-pointer'>
                    <p className='w-3/4 md:w-[50%] xl:w-[90%] whitespace-nowrap overflow-x-hidden overflow-ellipsis'>
                        <span className='text-iconsColor font-bold duration-75 hover:underline hover:duration-75' onMouseEnter={() => { setTimeout(() => { setShowPopUp(true)}, 1000)}} onMouseLeave={() => { setTimeout(() => {setShowPopUp(false)}, 1000) }}  onClick={
                        () => {
                            props.tweet.retweetedBy ?
                            navigate(`/main/${gottenUser._id}`, { state: {user: gottenUser}, replace: false})
                            :
                            navigate(`/main/${ props.tweet.by._id}`, { state: {user: props.tweet.by }, replace: false })
                        }}>
                            { props.tweet.retweetedBy? gottenUser.fullname :props.tweet.by.fullname}
                        </span> 
                        <span className='text-darkTextColor'>{ props.tweet.retweetedBy? gottenUser.tagName : props.tweet.by.tagName}</span>
                    </p> 
                    <p className='text-darkTextColor w-[4rem]'> {months[new Date(props.tweet.createdAt).getMonth()]} {new Date(props.tweet.createdAt).getDate()}</p>

                    {/* identity popup */}
                    { showPopUp ? 
                        <div className='popUp absolute top-[2rem] left-0 w-[17rem] bg-primary rounded-xl z-10 py-2 px-4' onMouseEnter={() => setShowPopUp(true)} onMouseLeave={() => setTimeout(() => {setShowPopUp(false)}, 1000)}>
                            <div className='w-[100%] flex justify-between items-center'>
                                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer'  onClick={
                                    () => {
                                    props.tweet.retweetedBy ?
                                    navigate(`/main/${gottenUser._id}`, { state: {user: gottenUser}, replace: false})
                                    :
                                    navigate(`/main/${ props.tweet.by._id}`)
                                    }}>
                                    <img src={ props.tweet.retweetedBy? gottenUser.profileUrl : props.tweet.by.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                                </div>
                                {props.tweet.retweetedBy ? gottenUser._id !== userId ? 
                                    <button className='rounded-full py-1 px-4 bg-iconsColor text-black hover:bg-white font-semibold'>{ isFollowed ? 'Unfollow' : 'Follow'}</button>
                                : <p>You</p>
                                : props.tweet.by._id !== userId ? 
                                    <button className='rounded-full py-1 px-4 bg-iconsColor text-black hover:bg-white font-semibold'>{ isFollowed ? 'Unfollow' : 'Follow'}</button>
                                :
                                    <p>You</p>
                                }
                                
                            </div>
                            <p className='text-md font-bold text-iconsColor hover:underline'  onClick={
                                () => {
                                props.tweet.retweetedBy ?
                                navigate(`/main/${gottenUser._id}`, { state: {user: gottenUser}, replace: false})
                                :
                                navigate(`/main/${ props.tweet.by._id}`)
                                }}>{ props.tweet.retweetedBy? gottenUser.fullname : props.tweet.by.fullname}</p>
                            <p className='text-sm text-darkTextColor'>{ props.tweet.retweetedBy? gottenUser.tagName : props.tweet.by.tagName}</p>
                            <p className='mt-2 text-iconsColor'>{ props.tweet.retweetedBy? gottenUser.bio : props.tweet.by.bio}</p>
                            <div className='mt-1 w-[80%] flex justify-between items-center'>
                                <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>{ props.tweet.retweetedBy? gottenUser.following.length : props.tweet.by.following.length}</span>Following</h4>
                                <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>{ props.tweet.retweetedBy? gottenUser.followers.length : props.tweet.by.followers.length}</span>Followers</h4>
                            </div>
                            {props.tweet.retweetedBy? gottenUser.followers.length : props.tweet.by.followers.length ?
                                <div className='flex justify-start items-start w-[100%] mt-2'>
                                    <div className='flex justify-start items-center'>
                                        <div className='relative w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                                            <img src={props.tweet.retweetedBy? gottenUser.followers[0].profileUrl : props.tweet.by.followers[0].profileUrl} alt='' className='w-[100%] h-[100%] object-contain z-0'/>
                                        </div>
                                        { props.tweet.retweetedBy? gottenUser.followers[1] : props.tweet.by.followers[1] ?
                                            <div className='absolute left-[1.5rem] w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                                                <img src={props.tweet.retweetedBy? gottenUser.followers[1].profileUrl : props.tweet.by.followers[1].profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                                            </div>
                                        : null}
                                        { props.tweet.retweetedBy? gottenUser.followers[2] : props.tweet.by.followers[2] ?
                                            <div className='absolute left-[2rem] w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer border-[2px] border-black'>
                                                <img src={props.tweet.retweetedBy? gottenUser.followers[2].profileUrl : props.tweet.by.followers[2].profileUrl} alt='' className='relative w-[100%] h-[100%] object-contain'/>
                                            </div>
                                        : null}
                                    </div>
                                    <p className='ml-5 text-sm text-darkTextColor leading-[15px]'> Followed by {props.tweet.retweetedBy? gottenUser.followers[0].fullname.split(' ')[0] : props.tweet.by.followers[0].fullname.split(' ')[0]} and {props.tweet.retweetedBy? gottenUser.followers.length - 1 : props.tweet.by.followers.length - 1} people</p>
                                </div>
                            : null}
                        </div>
                    :null}
                </div>
                {/* Ellipsis */}
                <div className='absolute top-0 right-1 md:top-1 md:right-[-3rem] p-[3px] bg-transparent text-iconsColor rounded-full hover:text-blueSpecial hover:bg-blueLight'>
                    <EllipsisHorizontalIcon className='w-[1.2rem]' onClick={() => setShowDeleteTweetV(!showDeleteTweetV)}/>
                    { showDeleteTweetV && props.tweet.by._id === userId ?
                        <div className='absolute top-[-1rem] right-0 flex justify-center items-center w-[6rem] md:w-[10rem] text-[13px] md:text-[15px] rounded-lg bg-darkClose text-iconsColor duration-150 hover:bg-redBg hover:text-redText hover:duration-150 popUp cursor-pointer' onClick={() => deleteTweet()}>Delete Tweet?</div>
                    : null}
                </div>
                {/* text wrapper */}
                <div className='whitespace-pre-wrap text-iconsColor text-[13px] md:text-[16px]'>
                    {props.tweet.text}
                </div>

                {/* Media center */}
                {!props.tweet.media.length ? 
                    null :
                    // one photo
                    props.tweet.media[0] && !props.tweet.media[1] && !props.tweet.media[2] && !props.tweet.media[3] ?
                        <div className='relative md:h-[20rem] w-[100%] p-2 bg-darkComponentVar rounded-xl'>
                            <img src={props.tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                        </div> 
                    // Two pics
                    : props.tweet.media[0] && props.tweet.media[1] && !props.tweet.media[2] && !props.tweet.media[3] ?
                        <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2 overflow-hidden'>
                            {/* image1 */}
                            <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                                <img src={props.tweet.media[0]} alt='' className=' h-[100%] w-[100%] object-contain rounded-xl'/>
                            </div>
                            {/* image2 */}
                            <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                                <img src={props.tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                            </div>
                        </div>
                        // three pics entered
                    : props.tweet.media[0] && props.tweet.media[1] && props.tweet.media[2] && !props.tweet.media[3] ?
                        <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2'>
                            {/* image1 */}
                            <div className='relative w-[50%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                <img src={props.tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                            </div>
                            <div className='w-[50%] h-[100%] flex flex-col justify-start items-center space-y-2'>
                                {/* image2 */}
                                <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                                {/* image3 */}
                                <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[2]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                            </div>
                        </div>
                        // All four images are there
                    : props.tweet.media[0] && props.tweet.media[1] && props.tweet.media[2] && props.tweet.media[3] ?
                        <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex flex-col justify-start items-center space-y-2'>
                            <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                                {/* image1 */}
                                <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain'/>
                                </div>
                                {/* image2 */}
                                <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain'/>
                                </div>
                            </div>

                            <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                                {/* image3 */}
                                <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[2]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                                {/* image4 */}
                                <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={props.tweet.media[3]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                            </div>
                        </div>
                    :null}
                <div className='flex justify-start items-center space-x-[0.2rem] md:space-x-[2rem] xl:space-x-[4rem] py-2 text-xs text-darkTextColor md:text-sm'>
                    {/* Comments */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title={`${props.tweet.comment.length} comments`}>
                            <ChatBubbleBottomCenterIcon className='w-[1.2rem]' onClick={() => navigate(`/main/innerTweet/${props.tweet.retweetedBy ? props.tweet.tweetId : props.tweet._id}`, {state: {retweetedBy: props.tweet.retweetedBy ? props.tweet.retweetedBy : null , replace: false}})}/>
                        </div>
                        <p>{props.tweet.comment.length}</p>
                    </div>

                    {/* retweets */}
                    <div className='flex justify-start items-center'>
                        <div className='relative p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title={props.tweet.retweetedBy ? 'undo retweet' : `${retweets.length} retweets`}>
                            <ArrowPathRoundedSquareIcon className={iRetweetedClasses.join(' ')} onClick={() => { props.tweet.retweetedBy ? setShowUndoRetweet(true) : issueRetweet()}}/>

                            { showUndoRetweet && iRetweeted ? <div className='absolute top-[-1rem] right-0 flex justify-center items-center w-[6rem] md:w-[10rem] text-[13px] md:text-[15px] rounded-lg bg-darkClose text-iconsColor duration-150 hover:bg-redBg hover:text-redText hover:duration-150 popUp cursor-pointer' title='undo retweet?' onClick={() => undoRetweet()}>Undo Retweet</div> : null}
                        </div>
                        <p>{retweets.length}</p>
                    </div>

                    {/* likes */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title={`${likes.length} likes`}>
                            <HeartIcon className={ilikedClasses.join(' ')} onClick={() => issueLikeHandler()}/>
                        </div>
                        <p>{likes.length}</p>
                    </div>

                    {/* views */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title={`${views} views`}>
                            <ChartBarIcon className='w-[1.2rem]'/>
                        </div>
                        <p>{views}</p>
                    </div>
                    {/* share */}
                    <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='share'>
                        <ArrowDownTrayIcon className='w-[1.2rem]'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Tweet;