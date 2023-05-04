import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import Feed from '../feed/feed';
import SmallSMenu from '../../components/smallScreenMenu/smallSMenu';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { SETSHOWLEFTSMENU } from '../../store/uiStates';


function MainView(props) {
    const dispatch = useDispatch();
    const isVisible = useSelector(state => state.uiStates.showLeftMenu);
    return (
        <div className=' relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}
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
                    <div className='h-[100vh> bg-gray-950 text-gray-950' onClick={() => dispatch(SETSHOWLEFTSMENU(false))}>
                        well
                    </div>
                : <Feed/> }
                
            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default MainView;