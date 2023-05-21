import React, { useEffect, useRef, useState } from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import { ArrowDownTrayIcon, ArrowLeftIcon, ArrowPathRoundedSquareIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Spinner from '../../UI/spinner/spinner';
import Tweet from '../../components/tweet/tweet';

function TweetView(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector(state => state.authenticate.token);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const fullname = useSelector(state => state.authenticate.fullname);
    const [tweet, setTweet] = useState('');
    const [myReply, setMyReply] = useState('');
    const [isPickerVisible, setIsPickerVisibile] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [pullingComments, setPullingComment] = useState(false);
    const [retweetedBy] = useState(location.state.retweetedBy);
    const photosRef = useRef();
    // console.log(tweet);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getATweet/${id}`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(res => {
            setTweet(res.data.tweet);
        })
        .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        if(tweet) {
            setPullingComment(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/tweetComments/${tweet._id}`, {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            .then(res => {
                setPullingComment(false);
                setComments(res.data.comments);
            })
            .catch(err => {
                setPullingComment(false);
                console.log(err);
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweet]);

    const sendReplyHandler = () => {
        setLoading(true);
        const data = new FormData();
        if(photo) {data.append('photos', photo)}
        data.append('text', myReply);
        data.append('commentTo', tweet._id);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment`, data, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(res => {
            setLoading(false);
            setMyReply('');
            setComments([...comments, res.data.comment]);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);

        })
    }

    let theComments = <p className='mx-auto text-gray-600 text-sm'>No Comments found</p>;
    if(pullingComments) {
        theComments = <div className='w-[100%] flex justify-center'><Spinner/></div>
    } else if(!pullingComments && comments.length) {
        theComments = comments.map(com => {
            return <Tweet tweet={com} isComment={true} key={com._id}/>
        })
    } else if(!pullingComments && !comments.length) {
        theComments = <p className='mx-auto text-gray-600 text-sm'>No Comments found</p>
    }


    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}
            <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start pt-[2rem]'>
                {/* The actual tweet section */}
                <div className='relative w-[100%] p-[0.5rem] md:p-[1rem] flex flex-col justify-start items-start space-y-2 border-b-[1px] border-darkClose'>
                    {/* Top banner */}
                    <div className='flex justify-start items-center space-x-[1rem] fixed top-0 left-0 md:left-[10%] xl:left-[26%] h-[3rem] bg-primary w-[100%] md:w-[50%] xl:w-[40%] border-b-[1px] border-darkClose z-10'>
                        <div className='hover:bg-darkComponentVar rounded-full ml-[1rem] md:ml-0' title='go back' onClick={() => navigate(-1)}>
                            <ArrowLeftIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                        </div>
                        <p className='text-[13px] md:text-[20px] font-bold'>Tweet</p>
                    </div>
                    {retweetedBy ? 
                        <p className='mx-[2rem] md:mx-[3rem] text-[11px] md:text-[13px] text-darkTextColor'><i>{retweetedBy === fullname ? 'you' : retweetedBy} retweeted</i></p> 
                    : null}
                    <div className='w-[100%] flex justify-between items-center'>
                        <div className='flex justify-start items-center space-x-2'>
                            <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer' onClick={
                                () => {
                                navigate(`/main/${tweet.by._id}`, { state: {user: tweet.by}, replace: false })
                                }}>
                                { tweet ? <img src={tweet.by.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/> : null}
                            </div>
                            <div className='flex flex-col justify-start items-start space-y-[-5px]'>

                                <p className='text-iconsColor font-bold duration-75 hover:underline hover:duration-75 cursor-pointer text-[13px] md:text-[15px]' onClick={() => navigate(`/main/${ tweet.by._id}`, { state: {user: tweet.by}, replace: false })}>{tweet ? tweet.by.fullname : null}</p>

                                <p className='text-darkTextColor text-[13px] md:text-[15px]'>{tweet ? tweet.by.tagName : null}</p>
                            </div>
                        </div>
                        <div className='p-[3px] bg-transparent text-iconsColor rounded-full hover:text-blueSpecial hover:bg-blueLight'>
                            <EllipsisHorizontalIcon className='w-[1.2rem]'/>  
                        </div>
                    </div>
                    { tweet ? <p className='mx-[0.5rem] text-[13px] md:text-[15px]'>{tweet.text}</p> :null}
                    {/* Media center */}
                    {!tweet || !tweet.media.length ? 
                        null :
                        // one photo
                        tweet.media[0] && !tweet.media[1] && !tweet.media[2] && !tweet.media[3] ?
                            <div className='relative md:h-[20rem] w-[100%] p-2 bg-darkComponentVar rounded-xl'>
                                <img src={tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                            </div> 
                        // Two pics
                        : tweet.media[0] && tweet.media[1] && !tweet.media[2] && !tweet.media[3] ?
                            <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2 overflow-hidden'>
                                {/* image1 */}
                                <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                                    <img src={tweet.media[0]} alt='' className=' h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                                {/* image2 */}
                                <div className='relative w-[50%] h-[100%] bg-darkComponentVar rounded-xl'>
                                    <img src={tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                            </div>
                            // three pics entered
                        : tweet.media[0] && tweet.media[1] && tweet.media[2] && !tweet.media[3] ?
                            <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex justify-start items-center space-x-2'>
                                {/* image1 */}
                                <div className='relative w-[50%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                    <img src={tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                </div>
                                <div className='w-[50%] h-[100%] flex flex-col justify-start items-center space-y-2'>
                                    {/* image2 */}
                                    <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                    </div>
                                    {/* image3 */}
                                    <div className='relative h-[50%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[2]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                    </div>
                                </div>
                            </div>
                            // All four images are there
                        : tweet.media[0] && tweet.media[1] && tweet.media[2] && tweet.media[3] ?
                            <div className='relative md:h-[20rem] w-[100%] p-2 rounded-xl flex flex-col justify-start items-center space-y-2'>
                                <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                                    {/* image1 */}
                                    <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[0]} alt='' className='h-[100%] w-[100%] object-contain'/>
                                    </div>
                                    {/* image2 */}
                                    <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[1]} alt='' className='h-[100%] w-[100%] object-contain'/>
                                    </div>
                                </div>

                                <div className='w-[100%] h-[50%] flex justify-start items-center space-x-2'>
                                    {/* image3 */}
                                    <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[2]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                    </div>
                                    {/* image4 */}
                                    <div className='relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-darkComponentVar'>
                                        <img src={tweet.media[3]} alt='' className='h-[100%] w-[100%] object-contain rounded-xl'/>
                                    </div>
                                </div>
                            </div>
                        :null}
                        { tweet ? 
                            <p className='text-darkTextColor text-[13px] md:text-[16px] border-b-[1px] border-darkClose w-[100%] py-[0.5rem]'>{new Date(tweet.createdAt).getHours()} : {new Date(tweet.createdAt).getMinutes()} . {months[new Date(tweet.createdAt).getMonth()]} {new Date(tweet.createdAt).getDate()}, {new Date(tweet.createdAt).getFullYear()} . <span className='text-iconsColor font-bold'>{tweet.views}</span> Views</p>
                        :null}
                        {tweet ? 
                            <div className='text-darkTextColor text-[13px] md:text-[16px] border-b-[1px] border-darkClose w-[100%] py-[0.5rem] flex justify-start items-center space-x-[3rem]'>
                                <p><span className='text-iconsColor font-bold'>{tweet.retweets.length}</span> Retweets</p>
                                <p><span className='text-iconsColor font-bold'>{tweet.likes.length}</span> Likes</p>
                            </div>
                        :null}

                        {tweet ? 
                            <div className='text-darkTextColor text-[13px] md:text-[16px] border-b-[1px] border-darkClose w-[100%] py-[0.5rem] flex justify-evenly items-center space-x-[3rem]'>
                                <div className='hover:bg-darkComponentVar rounded-full flex justify-start items-center' title='Comment'>
                                    <ChatBubbleBottomCenterIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                                    {tweet.comment.length}
                                </div>
                                <div className='hover:bg-darkComponentVar rounded-full flex justify-start items-center' title='Comment'>
                                    <ArrowPathRoundedSquareIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                                    {tweet.retweets.length}
                                </div>
                                <div className='hover:bg-darkComponentVar rounded-full flex justify-start items-center' title='Comment'>
                                    <HeartIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                                    {tweet.likes.length}
                                </div>
                                <div className='hover:bg-darkComponentVar rounded-full' title='Comment'>
                                    <ArrowDownTrayIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                                </div>
                            </div>
                        :null}

                        <div className='border-b-[1px] border-darkClose w-[100%] py-[0.5rem] flex justify-start items-start space-x-[1rem]'>
                            <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer'>
                                <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                            </div>
                            <div className='relative w-[80%] flex flex-col justify-start items-start'>
                                <input type='text' placeholder="Tweet your reply" className='textarea h-[3rem] w-[100%] bg-transparent text-[14px] focus:outline-none md:text-lg border-b-[1px] border-darkClose'onChange={e => setMyReply(e.target.value)} value={myReply}/>

                                <div className='w-[100%] py-[0.5rem] flex justify-start items-center space-x-[1rem]'>
                                    <input type='file' className='hidden' ref={photosRef} onChange={e => {
                                        setPhoto(e.target.files[0]);
                                        }}/>
                                    <PhotoIcon className='w-[1.2rem] md:w-[1.5rem] text-blueSpecial p-[1px] md:p-[3px] hover:bg-blueLight rounded-full' title='Photos' onClick={() => photosRef.current.click()}/>

                                    <FaceSmileIcon className='w-[1.2rem] md:w-[1.5rem] text-blueSpecial p-[1px] md:p-[3px] hover:bg-blueLight rounded-full' title='Emojis' onClick={() => setIsPickerVisibile(!isPickerVisible)}/>
                                </div>
                                {/*photo */}
                                { photo ?
                                    <div className='relative w-[100%] p-2 bg-darkComponentVar rounded-xl'>
                                        <img src={URL.createObjectURL(photo)} alt='' className='w-[100%] object-contain rounded-xl'/>
                                        <XMarkIcon className='absolute top-[1rem] left-[1rem] w-[1.5rem] bg-black bg-opacity-50 backdrop-blur-xl text-iconsColor rounded-full hover:bg-darkClose' onClick={() => setPhoto(null)}/>
                                    </div> 
                                :null}
                                {/* Emoji Picker */}
                                { isPickerVisible ? 
                                    <div className='w-content md:absolute z-10 top-[6rem]'>
                                        <Picker data={data} theme='dark' previewPostion='none' onEmojiSelect={e => {
                                            setMyReply(myReply + e.native);
                                            setIsPickerVisibile(!isPickerVisible);
                                        }} />
                                    </div>
                                :null}
                            </div>
                            

                            <button disabled={!myReply || loading} className='text-md bg-blueSpecial text-iconsColor text-[13px] md:text-[15px] px-[1rem] py-[0.5rem] rounded-full disabled:bg-gray-700 disabled:text-gray-500' onClick={() => sendReplyHandler()}>{ loading ? <Spinner/> : 'Reply'}</button>
                        </div>
                        <div className='w-[100%] flex flex-col justify-start items-start'>
                            {theComments}
                        </div>
                        
                </div>
            </div>                
            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default TweetView;