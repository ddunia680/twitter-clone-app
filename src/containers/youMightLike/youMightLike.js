import React, { useEffect, useState } from 'react';
import ToFollow from '../../components/toFollow/toFollow';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';
import { YOUMIGHTLIKEDATA } from '../../store/users';
import { useNavigate } from 'react-router-dom';

function YouMightLike(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const [pullState, setPullState] = useState('idle');
    const [usersYouMLike, setYouMightLike] = useState([]);
    // console.log(usersYouMLike);
    const [reload, setReload] = useState(false);

     useEffect(() => {
        if(userId) {
            setPullState('loading');
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/youmlike/${userId}`)
            .then(res => {
                setPullState('succeeded');
                setYouMightLike(res.data.users);
                dispatch(YOUMIGHTLIKEDATA(res.data.users));
            })
            .catch(err => {
                setPullState('failed');
                alert(err.response.data.message);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, reload]);

    let theUsersArray = <p className='text-center text-sm text-gray-500'>No users</p>;
    if(pullState === 'loading') {
        theUsersArray = <div className='w-[100%] flex justify-center'><Spinner/></div>
    } else if(pullState === 'succeeded') {
        theUsersArray = usersYouMLike.map(user => {
            return <ToFollow user={user} setReload={setReload} key={user._id}/>
        })
    } else if(pullState === 'failed') {
        theUsersArray = <p className='text-center text-sm text-gray-500'>something went wrong...</p>
    }
    return (
        <div className='my-[1rem] w-[100%] bg-darkComponent py-[1rem] rounded-2xl'>
            <h3 className='w-[100%] text-[15px] md:text-xl font-bold px-[1rem]'>You Might Like</h3>
            {theUsersArray}
            <p className='px-[1rem] text-[15px] md:text-md text-blueSpecial cursor-pointer hover:text-purple-500' onClick={() => {
                navigate('/main/connect');
                }}>Show more</p>
        </div>
    );
}

export default YouMightLike;