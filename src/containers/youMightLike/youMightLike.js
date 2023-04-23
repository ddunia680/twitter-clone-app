import React from 'react';
import ToFollow from '../../components/toFollow/toFollow';
import { useDispatch } from 'react-redux';
import { SETCONNECTUI } from '../../store/uiStates';

function YouMightLike(props) {
    const dispatch = useDispatch();
    return (
        <div className='my-[1rem] w-[100%] bg-darkComponent py-[1rem] rounded-2xl'>
            <h3 className='w-[100%] text-xl font-bold px-[1rem]'>You Might Like</h3>
            <ToFollow/>
            <ToFollow/>
            <ToFollow/>
            <p className='px-[1rem] text-blueSpecial cursor-pointer' onClick={() => dispatch(SETCONNECTUI(true))}>Show more</p>
        </div>
    );
}

export default YouMightLike;