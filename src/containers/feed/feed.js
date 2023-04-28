import React from 'react';
import './feed.css';
import { PlusIcon } from '@heroicons/react/24/outline';
import FeedHead from '../../components/feedHead/feedHead';
import TwitterInput from '../../components/twitterInput/twitterInput';
import Tweet from '../../components/tweet/tweet';

function Feed(props) {
    return (
        <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start'>
            <FeedHead/>
            <TwitterInput/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <div className='md:hidden fixed bottom-[3rem] right-[1rem] p-[1rem] rounded-full bg-blueSpecial' title='Tweet'>
                <PlusIcon className='w-[1rem] text-iconsColor' />
            </div>
        </div>
    );
}

export default Feed;