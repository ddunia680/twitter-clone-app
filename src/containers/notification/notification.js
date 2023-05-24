import React, { useEffect, useState } from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import NotificationItem from '../../components/notificationItem/notificationItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from '../../UI/spinner/spinner';

function Notification(props) {
    const token = useSelector(state => state.authenticate.token);
    // const userId = useSelector(state => state.authenticate.userId);
    // console.log(userId);
    const [onAll, setOnAll] = useState(true);
    const [onVerfied, setOnVerified] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const onForYouClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onAll ? 'border-blueSpecial' : 'border-transparent'];
    const onFollowingClasses = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onVerfied ? 'border-blueSpecial' : 'border-transparent'];

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getNotifications`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(res => {
            setLoading(false);
            setNotifications(res.data.notifications);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let theNotifs = <p className='mx-auto text-gray-600 text-sm mt-[1rem]'>No notifications so far</p>
    if(loading) {
        theNotifs = <div className='w-[100%] flex justify-center mt-[1rem]'><Spinner/></div>
    } else if(notifications.length && !loading) {
        theNotifs = notifications.map(notif => {
            return <NotificationItem notification={notif} key={notif._id}/>
        })
    } else {
        theNotifs = <p className='mx-auto text-gray-600 text-sm mt-[1rem]'>No notifications so far</p>
    }

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
                <div className='flex justify-between items-end w-[100%] z-10'>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => {setOnAll(true); setOnVerified(false)}}>
                        <h4 className={onForYouClasses.join(' ')}>All</h4>
                    </div>
                    <div className='w-1/2 h-[2.5rem] hover:bg-darkClose cursor-pointer' onClick={
                        () => {setOnAll(false); setOnVerified(true)}}>
                        <h4 className={onFollowingClasses.join(' ')}>Verified</h4>
                    </div>
                </div>
                {theNotifs}
            </div>
            </div>
            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default Notification;