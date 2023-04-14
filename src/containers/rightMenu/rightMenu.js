// import React, { useState } from 'react';
import './rightMenu.css';
import SearchBar from '../../components/searchBar/searchBar';
import Trends from '../trends/trends';

function RightMenu(props) {
    // const [enteredValue, setEnteredValue] = useState('');

    const searchHandler = (input) => {
        // setEnteredValue(input);
        // console.log(input);
    }
    return (
        <div className='rightMenu hidden md:flex w-[30%] h-[100%] flex-col justify-start items-start px-[2rem] border-l-[1px] border-darkClose overflow-y-scroll'>
            <SearchBar filter={false} placeHolder="Search Twitter" filterValue={searchHandler}/>
            <Trends/>
        </div>
    );
}

export default RightMenu;