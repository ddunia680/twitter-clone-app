import React, { useState } from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import NotificationItem from '../../components/notificationItem/notificationItem';

function Notification(props) {
    const [onAll, setOnAll] = useState(true);
    const [onVerfied, setOnVerified] = useState(false);

    const onForYouClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onAll ? 'border-blueSpecial' : 'border-transparent'];
    const onFollowingClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onVerfied ? 'border-blueSpecial' : 'border-transparent'];;
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}
            <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start'>
                <div className='sticky md:fixed w-[100%] md:w-[50%] xl:w-[38%] h-[16vh] md:h-[12vh] bg-primary border-b-[1px] border-darkClose flex flex-col justify-between items-start backdrop-blur-md bg-opacity-80 z-20'>
                {/* Title */}
                <div className='flex justify-center items-center w-[100%] p-2 font-bold'>
                    Notification
                </div>

                {/* top nav */}
                <div className='flex justify-between items-end w-[100%]'>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => {setOnAll(true); setOnVerified(false)}}>
                        <h4 className={onForYouClasses.join(' ')}>All</h4>
                    </div>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => {setOnAll(false); setOnVerified(true)}}>
                        <h4 className={onFollowingClasses.join(' ')}>Verified</h4>
                    </div>
                </div>
                <NotificationItem/>
            </div>
            </div>
            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default Notification;