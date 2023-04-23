import React, { useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterIcon, ArrowDownTrayIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import apic from '../../images/apic.jpg';
import profile from '../../images/mary.jpg';
import mum from '../../images/mum.jpg';
import dad from '../../images/dad.jpg';
import cecile from '../../images/cecile3.JPG';
import './tweet.css';
import { useDispatch } from 'react-redux';
import { SETONUSERIDENTITY } from '../../store/uiStates';

function Tweet(props) {
    const dispatch = useDispatch();
    const [showPopUp, setShowPopUp] = useState(false);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className='relative w-[100%] flex justify-start items-start pt-2 border-b-[1px] border-darkClose'>
            {/* <UserCircleIcon className='w-[3rem] md:w-[5rem] px-2 cursor-pointer'/> */}
            <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 mx-2 cursor-pointer' onMouseEnter={() => { setTimeout(() => { setShowPopUp(true)}, 1000)}} onMouseLeave={() => { setTimeout(() => {setShowPopUp(false)}, 1000) }} onClick={() => dispatch(SETONUSERIDENTITY())}>
                <img src={profile} alt='' className='w-[100%] h-[100%] object-contain'/>
            </div>
            <div className='relative w-[80%] flex flex-col justify-start items-start pt-1'>
                {/* User identity */}
                <div className='text-[13px] md:text-[15px] w-[90%] flex justify-start items-start cursor-pointer'>
                    <p className='w-3/4 md:w-[90%] whitespace-nowrap overflow-x-hidden overflow-ellipsis'>
                        <span className='text-iconsColor font-bold duration-75 hover:underline hover:duration-75' onMouseEnter={() => { setTimeout(() => { setShowPopUp(true)}, 1000)}} onMouseLeave={() => { setTimeout(() => {setShowPopUp(false)}, 1000) }} onClick={() => dispatch(SETONUSERIDENTITY())}>Michael Asiedu</span> 
                        <span className='text-darkTextColor'>@MichaelAsiedu_.</span>
                    </p> 
                    <p className='text-darkTextColor'> {months[new Date().getMonth()]} {new Date().getDate()}</p>

                    {/* identity popup */}
                    { showPopUp ? 
                        <div className='popUp absolute top-[2rem] left-0 w-[17rem] bg-primary rounded-xl z-7 py-2 px-4' onMouseEnter={() => setShowPopUp(true)} onMouseLeave={() => setTimeout(() => {setShowPopUp(false)}, 1000)}>
                            <div className='w-[100%] flex justify-between items-center'>
                                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-700 cursor-pointer' onClick={() => dispatch(SETONUSERIDENTITY())}>
                                    <img src={profile} alt='' className='w-[100%] h-[100%] object-contain'/>
                                </div>
                                <button className='rounded-full py-1 px-4 bg-iconsColor text-black hover:bg-white font-semibold'>Follow</button>
                            </div>
                            <p className='text-md font-bold text-iconsColor hover:underline' onClick={() => dispatch(SETONUSERIDENTITY())}>Michael Asiedu</p>
                            <p className='text-sm text-darkTextColor'>@MichaelAsiedu_</p>
                            <p className='mt-2 text-iconsColor'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie eros quis ante.</p>
                            <div className='mt-1 w-[80%] flex justify-between items-center'>
                                <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>300</span>Following</h4>
                                <h4 className='text-darkTextColor text-sm'><span className='font-bold text-iconsColor'>15.2K</span>Followers</h4>
                            </div>
                            <div className='flex justify-start items-start w-[100%] mt-2'>
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
                        </div>
                    :null}
                </div>
                {/* Ellipsis */}
                <div className='absolute top-0 right-1 md:top-1 md:right-[-3rem] p-[3px] bg-transparent text-iconsColor rounded-full hover:text-blueSpecial hover:bg-blueLight'>
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