import React from 'react';
import './feed.css';
import FeedHead from '../../components/feedHead/feedHead';
import TwitterInput from '../../components/twitterInput/twitterInput';
import Tweet from '../../components/tweet/tweet';

function Feed(props) {
    return (
        <div className=' feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start'>
            <FeedHead/>
            <TwitterInput/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
        </div>
    );
}

export default Feed;