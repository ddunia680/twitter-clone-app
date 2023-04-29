// import React, { useState } from 'react';
import './rightMenu.css';
import SearchBar from '../../components/searchBar/searchBar';
import Trends from '../trends/trends';
import YouMightLike from '../youMightLike/youMightLike';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ToFollow from '../../components/toFollow/toFollow';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';

function RightMenu(props) {
    const connectIU = useSelector(state => state.uiStates.connectIU);
    const userId = useSelector(state => state.authenticate.userId);
    const [enteredValue, setEnteredValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [foundUsers, setFoundUsers] = useState([]);

    const searchHandler = (input) => {
        setEnteredValue(input);
    }

    const searchUsers = (value) => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/searchUser/${value}/${userId}`)
        .then(res => {
            setLoading(false);
            setFoundUsers(res.data.users);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }
    let searchResults = <p className='text-center'>No users found</p>
    if(loading) {
        searchResults = <div className='flex justify-center'><Spinner/></div>
    } else if(foundUsers.length) {
        searchResults = foundUsers.map(user => {
            return <ToFollow user={user} key={user._id}/>
        })
    }
        
    return (
        <div className='rightMenu flex w-[100vw] md:w-[30%] h-[100%] flex-col justify-start items-start px-[2rem] border-l-[1px] border-darkClose overflow-y-scroll'>
            <SearchBar filter={false} placeHolder="Search Twitter" searchV={searchUsers} filterValue={searchHandler}/>
            {  !enteredValue ?
                <>
                    { !connectIU ? 
                        <YouMightLike/>
                    :null}
                    
                    <Trends/>
                </>
            : 
                <div className='rightMenu my-[1rem] w-[100%] py-[1rem]'>
                    {searchResults}
                </div>
            }
        </div>
    );
}

export default RightMenu;