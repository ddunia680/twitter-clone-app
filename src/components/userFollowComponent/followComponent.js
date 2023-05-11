import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';
import FollowPulled from '../followPulled/followPulled';

function FollowCenter(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [onFollowing, setOnFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(false);

    const onFollowingC = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', onFollowing ? 'border-blueSpecial' : 'border-transparent'];
    const onFollowersC = ['w-fit h-[100%] mx-auto border-b-[5px] text-sm md:text-md py-2', !onFollowing ? 'border-blueSpecial' : 'border-transparent'];

    useEffect(() => {
        setUser(location.state.user);
        if(location.state.onFollowing) {
            setOnFollowing(true);
        } else {
            setOnFollowing(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLoading(true);
        if(user._id) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/followCenter/${user._id}`)
            .then(res => {
                setLoading(false);
                setFollowers(res.data.followers);
                setFollowing(res.data.following);
            })
            .catch(err => {
                setError(err.response.data.message);
            })
        }
    }, [user._id, reload]);

    let theInside = <div>No Followers</div>;
    if(loading) {
        theInside = <div className='w-[100%] flex justify-center'><Spinner/></div>
    } else if(!loading && onFollowing) {
        if(following.length) {
            theInside = following.map(fol => {
                return <FollowPulled user={fol} key={fol._id} setReload={setReload}/>
            })
        } else {theInside = <p>No Followed users yet</p>}
    } else if(!loading && !onFollowing) {
        if(followers.length) {
            theInside = followers.map(fol => {
                return <FollowPulled user={fol} key={fol._id} setReload={setReload}/>
            })
        } else {theInside = <p>No users following</p>}
    } else if(error) {
        theInside = <p>{error}</p>
    }

    return (
        <div className='userIdent relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start text-iconsColor bg-primary backdrop-blur-md bg-opacity-80'>
            <div className='sticky top-0 left-0 bg-primary bg-opacity-80 w-[100%] z-10 md:flex justify-between items-center space-x-2 md:space-x-4 px-2 border-b-[1px] border-darkClose'>
                <div className='flex justify-start items-center space-y-2'>
                    <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent' onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                    </div>
                    <div className='flex flex-col justify-between items-start ml-[1rem]'>
                        <h3 className='text-md md:text-xl font-semibold md:font-bold flex justify-start items-center'>{user.fullname } <span><CheckBadgeIcon className='text-blueSpecial w-[1.2rem] mt-[2px] md:mt-[4px]' /></span></h3>
                            <p className='text-xs md:text-sm text-darkTextColor'>{user.tagName}</p>
                    </div>
                </div>       
            </div>

            <div className='sticky top-0 md:top-[3.5rem] flex justify-between items-center bg-primary bg-opacity-80 mt-4 w-[100%] h-[2.5rem] md:h-[3.5rem] border-b-[1px] border-darkClose z-10'>
                    <div className='w-1/2 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => {
                                if(!onFollowing) {
                                    setOnFollowing(true);
                                }
                            }}>
                        <h4 className={onFollowingC.join(' ')}>Following</h4>
                    </div>
                    <div className='w-1/2 h-[100%] hover:bg-darkClose cursor-pointer' onClick={
                            () => {
                                if(onFollowing) {
                                    setOnFollowing(false);
                                }
                            }}>
                        <h4 className={onFollowersC.join(' ')}>Followers</h4>
                    </div>
            </div>
            <div className='w-[100%] flex flex-col justify-start items-start'>
                {theInside}
            </div>
        </div>
    );
}

export default FollowCenter;