// import React, { useState } from 'react';
import './rightMenu.css';
import SearchBar from '../../components/searchBar/searchBar';
import Trends from '../trends/trends';
import YouMightLike from '../youMightLike/youMightLike';
import { useSelector } from 'react-redux';

function RightMenu(props) {
    const connectIU = useSelector(state => state.uiStates.connectIU);

    const searchHandler = (input) => {
        // setEnteredValue(input);
        // console.log(input);
    }
    return (
        <div className='rightMenu flex w-[100vw] md:w-[30%] h-[100%] flex-col justify-start items-start px-[2rem] border-l-[1px] border-darkClose overflow-y-scroll'>
            <SearchBar filter={false} placeHolder="Search Twitter" filterValue={searchHandler}/>
            { !connectIU ? 
                <YouMightLike/>
            :null}
            
            <Trends/>
        </div>
    );
}

export default RightMenu;