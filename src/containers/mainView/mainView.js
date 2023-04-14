import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import Feed from '../feed/feed';
import BottomMenu from '../bottomMenu/bottomMenu';

function MainView(props) {
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start '>
            <LeftMenu/>
            <Feed/>
            <RightMenu/>
            <BottomMenu/>
        </div>
    );
}

export default MainView;