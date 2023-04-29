import React, { useEffect, useState } from 'react';
import './connectView.css';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ConnectItem from '../../components/connectItem/connectItem';
import RightMenu from '../rightMenu/rightMenu';
import BottomMenu from '../bottomMenu/bottomMenu';
import LeftMenu from '../leftMenu/leftMenu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SETCONNECTUI } from '../../store/uiStates';
import { MOREUSERS } from '../../store/users';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';

function ConnectView(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const [pullState, setPullState] = useState('idle');
    const [moreUsers, setMoreUsers] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setPullState('loading');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/moreUsers`, {
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            setPullState('succeeded');
            setMoreUsers(res.data.users);
            dispatch(MOREUSERS(res.data.users));
        })
        .catch(err => {
            setPullState('failed');
            alert(err.response.data.message);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId ,reload]);

    let theUsersArray = <p className='text-center text-sm text-gray-500'>No users</p>;
    if(pullState === 'loading') {
        theUsersArray = <div className='w-[100%] flex justify-center'><Spinner/></div>
    } else if(pullState === 'succeeded') {
        theUsersArray = moreUsers.map(user => {
            return <ConnectItem user={user} key={user._id} setReload={setReload}/>
        })
    } else if(pullState === 'failed') {
        theUsersArray = <p className='text-center text-sm text-gray-500'>something went wrong...</p>
    }

    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] flex flex-col justify-start items-start bg-primary z-20 px-4'>
                <div className='w-[100%] flex justify-start items-center space-x-4 p-2'>
                    <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent cursor-pointer' onClick={() => {
                        navigate(-1);
                        dispatch(SETCONNECTUI(false));
                        }}>
                        <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                    </div>
                    <h1 className='text-md md:text-xl font-bold'>Connect</h1>
                </div>
                <h2 className='text-md md:text-xl font-bold'>Similar to Stanis Bujakera Tshiamala</h2>
                <div className='w-[100%] py-3 connectView  overflow-y-scroll'>
                    {theUsersArray}
                </div>
            </div>
            <RightMenu/>
            <BottomMenu/>
        </div>
    );
}

export default ConnectView;