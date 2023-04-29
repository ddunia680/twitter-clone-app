import { FunnelIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SETSHOWLEFTSMENU } from '../../store/uiStates';

function SearchBar(props) {
    const dispatch = useDispatch();
    const [inputvalue, setInputValue] = useState('');
    const profileUrl = useSelector(state => state.authenticate.profileUrl);

    const searchBarClasses = ['bg-darkComponent flex justify-around items-center my-2 py-[1rem] md:py-[1.5rem] px-3 h-[2rem] rounded-full w-[100%] border-[1px] duration-75', inputvalue ? 'border-blueSpecial duration-75' : 'border-darkComponent'];

    useEffect(() => {
        props.filterValue(inputvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputvalue]);
    return (
        <div className='flex justify-start items-center w-[100%]'>
            { window.innerWidth <= 500 ? 
                <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-800 mr-[1rem]' title='my Menu' onClick={() => {
                    dispatch(SETSHOWLEFTSMENU(true));
                }}>
                    <img src={profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                </div>
            :null}
            <div className={searchBarClasses.join(' ')}>
                <MagnifyingGlassIcon className="w-[0.8rem] md:w-[1.2rem] text-iconsColor"/>
                

                <input type='text' placeholder={props.placeHolder} className='text-[12px] md:text-[15px] w-[70%] bg-transparent outline-none focus:text-iconsColor' value={inputvalue} onChange={event => {
                    setInputValue(event.target.value);
                    props.searchV(event.target.value);
                }} />
                { inputvalue ? 
                    <XCircleIcon className='w-[1rem] md:w-[2rem] text-blueSpecial'/>
                : <div className='w-[1rem] md:w-[2rem]'></div> }
                
            </div>  
            {props.filter ? <FunnelIcon className="w-[1.5rem] text-iconsColor" title='Chat filters menu'/> : null}          
        </div>
    );
}

export default SearchBar;