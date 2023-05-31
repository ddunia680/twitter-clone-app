// import React, { useState } from 'react';
import './rightMenu.css';
import SearchBar from '../../components/searchBar/searchBar';
import Trends from '../trends/trends';
import YouMightLike from '../youMightLike/youMightLike';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ToFollow from '../../components/toFollow/toFollow';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner';
import { Transition } from 'react-transition-group';
import SmallSMenu from '../../components/smallScreenMenu/smallSMenu';
import { SETSHOWLEFTSMENU } from '../../store/uiStates';

function RightMenu(props) {
    const dispatch = useDispatch();
    const connectIU = useSelector(state => state.uiStates.connectIU);
    const userId = useSelector(state => state.authenticate.userId);
    const [enteredValue, setEnteredValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [foundUsers, setFoundUsers] = useState([]);
    const isVisible = useSelector(state => state.uiStates.showLeftMenu);

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
        <div className='rightMenu flex justify-start items-start w-[100vw] md:w-[30%] h-[100%] overflow-y-scroll'>
            { window.innerWidth <= 500 ? 
                    <Transition
                        in={isVisible}
                        timeout={300}
                        mountOnEnter
                        unmountOnExit
                    >
                        <SmallSMenu/>
                    </Transition>
                     
                : null}
            { isVisible ? 
                <div className='h-[100vh] w-[20%] bg-primary text-primary' onClick={() => dispatch(SETSHOWLEFTSMENU(false))}>
                    well
                </div>
            :
            <div className='flex w-[100%] flex-col justify-start items-start px-[2rem] border-l-[1px] border-darkClose pb-[1rem]'>
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
            }
        </div>
        
    );
}

export default RightMenu;