import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import Feed from '../feed/feed';
import UserIdentity from '../../components/userIdentity/userIdentity';
import BottomMenu from '../bottomMenu/bottomMenu';
import ConnectView from '../connectView/connectView';
import { useSelector } from 'react-redux';

function MainView(props) {
    const onUserIdentity = useSelector(state => state.uiStates.onUserIdentity);
    const connectIU = useSelector(state => state.uiStates.connectIU);
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            { !onUserIdentity ?  
                <Feed/>
            :
                <UserIdentity/>
            }
            <RightMenu/>
            <BottomMenu/>
            {connectIU ? 
                <ConnectView/>
            : null}
            
        </div>
    );
}

export default MainView;