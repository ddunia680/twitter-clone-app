import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import FollowComponent from '../../components/userFollowComponent/followComponent';

function UserFollowCenter(props) {
    return (
        <div className='relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}
            <FollowComponent/>
            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default UserFollowCenter;