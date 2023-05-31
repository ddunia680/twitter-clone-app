import React from 'react';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SETONFOLLOWING, SETONFORYOU, SETSHOWLEFTSMENU } from '../../store/uiStates';

function FeedHead(props) {
    const dispatch = useDispatch();
    const onForYou = useSelector(state => state.uiStates.onForYou);
    const onFolliwing = useSelector(state => state.uiStates.onFolliwing);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    
    const onForYouClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onForYou ? 'border-blueSpecial' : 'border-transparent'];
    const onFollowingClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onFolliwing ? 'border-blueSpecial' : 'border-transparent'];
    return (
            <div className='sticky md:fixed w-[100%] md:w-[50%] xl:w-[38%] h-[16vh] md:h-[12vh] bg-primary border-b-[1px] border-darkClose flex flex-col justify-between items-start backdrop-blur-md bg-opacity-80 z-20'>
                {/* Title */}
                <div className='flex justify-between items-center w-[100%] p-2'>
                    <h2 className='hidden md:block text-2xl font-bold px-3'>Home</h2>
                    {/* <UserCircleIcon className='md:hidden w-[1.5rem]'/> */}
                    { window.innerWidth <= 500 ? <div className='w-[1.5rem] md:w-[3.2rem] h-[1.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-800 mr-[1rem]' title='my Menu' onClick={() => {
                        dispatch(SETSHOWLEFTSMENU(true));
                    }}>
                        <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                    </div> :null}
                    <FontAwesomeIcon icon={faTwitter} className='md:hidden text-[1.5rem] text-blueSpecial'/>
                    <div></div>
                </div>
                
                {/* top nav */}
                <div className='flex justify-between items-end w-[100%]'>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => dispatch(SETONFORYOU())}>
                        <h4 className={onForYouClasses.join(' ')}>For you</h4>
                    </div>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => dispatch(SETONFOLLOWING())}>
                        <h4 className={onFollowingClasses.join(' ')}>Following</h4>
                    </div>
                </div>
            </div>
    );
}

export default FeedHead;