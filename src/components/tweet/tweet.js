import React from 'react';
import { UserCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterIcon, ArrowDownTrayIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import apic from '../../images/apic.jpg';

function Tweet(props) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <div className='relative w-[100%] flex justify-start items-start pt-2 border-b-[1px] border-darkClose'>
            <UserCircleIcon className='w-[3rem] md:w-[5rem] px-2'/>
            {/* <div className='w-[3rem] md:w-[5rem] h-[3rem] md:h-[5rem] rounded-full overflow-hidden bg-gray-700'>
                <img src={} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div> */}
            <div className='w-[80%] flex flex-col justify-start items-start pt-1'>
                {/* User identity */}
                <div className='text-[13px] md:text-[15px] w-[90%] flex justify-start items-start'>
                    <p className='w-3/4 md:w-[90%] whitespace-nowrap overflow-x-hidden overflow-ellipsis'>
                        <span className='text-iconsColor font-bold'>Michael Asiedu</span> 
                        <span className='text-darkTextColor'>@MichaelAsiedu_.</span>
                    </p> 
                    <p className='text-darkTextColor'> {months[new Date().getMonth()]} {new Date().getDate()}</p>
                </div>
                {/* Ellipsis */}
                <div className='absolute top-3 right-3 p-[3px] bg-transparent text-iconsColor rounded-full hover:text-blueSpecial hover:bg-blueLight'>
                    <EllipsisHorizontalIcon className='w-[1.2rem]'/>  
                </div>
                {/* text wrapper */}
                <div className='whitespace-pre-wrap text-iconsColor text-[13px] md:text-[16px]'>Well this is some new app i'm currently working on, it is kinder hard for so many but I decided not to be among that group. 
                
                    I'm making it something really good that I can attract recruiters
                </div>
                <div className='rounded-xl mt-2 bg-gray-900 overflow-hidden'>
                    <img src={apic} alt='' className='w-[100%] object-contain' />
                </div>
                <div className='flex justify-start items-center space-x-[0.2rem] md:space-x-[2rem] xl:space-x-[4rem] py-2 text-xs text-darkTextColor md:text-sm'>
                    {/* Comments */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='comments'>
                            <ChatBubbleBottomCenterIcon className='w-[1.2rem]'/>
                        </div>
                        <p>708</p>
                    </div>

                    {/* retweets */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='retweets'>
                            <ArrowPathRoundedSquareIcon className='w-[1.2rem]'/>
                        </div>
                        <p>708</p>
                    </div>

                    {/* likes */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='likes'>
                            <HeartIcon className='w-[1.2rem]'/>
                        </div>
                        <p>708</p>
                    </div>

                    {/* views */}
                    <div className='flex justify-start items-center'>
                        <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='views'>
                            <ChartBarIcon className='w-[1.2rem]'/>
                        </div>
                        <p>708</p>
                    </div>
                    {/* share */}
                    <div className='p-[0.4rem] rounded-full duration-75 hover:bg-blueLight hover:text-blueSpecial hover:duration-75 cursor-pointer' title='share'>
                        <ArrowDownTrayIcon className='w-[1.2rem]'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;