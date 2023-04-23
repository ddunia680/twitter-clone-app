import React from 'react';
import './connectView.css';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ConnectItem from '../../components/connectItem/connectItem';
import { useDispatch } from 'react-redux';
import { SETCONNECTUI } from '../../store/uiStates';

function ConnectView(props) {
    const dispatch = useDispatch();
    return (
        <div className='absolute top-0 left-0 md:left-[10%] xl:left-[20%] w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] flex flex-col justify-start items-start bg-primary z-20 px-4'>
            <div className='w-[100%] flex justify-start items-center space-x-4 p-2'>
                <div className='p-[0.7rem] bg-transparent text-iconsColor rounded-full hover:bg-darkComponent cursor-pointer' onClick={() => dispatch(SETCONNECTUI(false))}>
                    <ArrowLeftIcon className='w-[1rem] md:w-[1.2rem]' />
                </div>
                <h1 className='text-md md:text-xl font-bold'>Connect</h1>
            </div>
            <h2 className='text-md md:text-xl font-bold'>Similar to Stanis Bujakera Tshiamala</h2>
            <div className='w-[100%] py-3 connectView  overflow-y-scroll'>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
                <ConnectItem/>
            </div>
        </div>
    );
}

export default ConnectView;