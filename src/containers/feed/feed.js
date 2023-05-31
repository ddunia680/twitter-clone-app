import React, { useEffect } from 'react';
import './feed.css';
import { PlusIcon } from '@heroicons/react/24/outline';
import FeedHead from '../../components/feedHead/feedHead';
import TwitterInput from '../../components/twitterInput/twitterInput';
import Tweet from '../../components/tweet/tweet';
import { useDispatch, useSelector } from 'react-redux';
import { pullTweets } from '../../store/tweets';
import Spinner from '../../UI/spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { FOCUSONNEWTWEET } from '../../store/uiStates';

function Feed(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.authenticate.token);
    const loadingState = useSelector(state => state.tweets.loadingState);
    const myTweets = useSelector(state => state.tweets.tweets);

    useEffect(() => {
        if(token) {
            const info = {
                method: 'GET',
                url: `${process.env.REACT_APP_BACKEND_URL}/pullTweet`,
                token: token
            }
            dispatch(pullTweets(info));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    let theTweets = <p className='mx-auto text-gray-600 text-sm'>No Tweets loaded...</p>
    if(loadingState === 'loading') {
        theTweets = <div className='w-[100%] flex justify-center'><Spinner/></div>
    } else if(loadingState === 'succeeded' && myTweets.length) {
            theTweets = myTweets.map(tweet => {
                return <Tweet tweet={tweet} key={tweet._id}/>
            })
    } else if(loadingState === 'failed') {
        theTweets = <p className='mx-auto text-gray-600 text-sm'>something went wrong server-side...</p>
    } else {
        theTweets = <p className='mx-auto text-gray-600 text-sm'>nothing was loaded...</p>
    }

    return (
        <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start' onScroll={() => dispatch(FOCUSONNEWTWEET(false))}>
            <FeedHead/>
            { window.innerWidth > 500 ? <TwitterInput/> : null}
            {theTweets}
            <div className='md:hidden fixed bottom-[3rem] right-[1rem] p-[1rem] rounded-full bg-blueSpecial' title='Tweet' onClick={() => {
                if(window.innerWidth <= 500) {
                    navigate('/newTweet');
                }
            }}>
                <PlusIcon className='w-[1rem] text-iconsColor' />
            </div>
        </div>
    );
}

export default Feed;