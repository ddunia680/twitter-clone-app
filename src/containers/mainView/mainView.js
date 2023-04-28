import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import Feed from '../feed/feed';
import UserIdentity from '../../components/userIdentity/userIdentity';
// import BottomMenu from '../bottomMenu/bottomMenu';
import { useSelector } from 'react-redux';

function MainView(props) {
    const onUserIdentity = useSelector(state => state.uiStates.onUserIdentity);
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}
            { !onUserIdentity ?  
                <Feed/>
            :
                <UserIdentity/>
            }
            { window.innerWidth > 500 ? <RightMenu/> :null}
            {/* <BottomMenu/>             */}
        </div>
    );
}

export default MainView;