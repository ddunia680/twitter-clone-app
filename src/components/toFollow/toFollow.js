import React from 'react';
import cecile from '../../images/cecile3.JPG';

function ToFollow(props) {
    return (
        <div className='w-[100%] flex justify-start items-center space-x-2 my-5 py-[5px] px-[1rem] duration-75 bg-darkComponent hover:bg-darkComponentVar hover:duration-75 cursor-pointer'>
            <div className='w-[2.5rem] md:w-[3.2rem] h-[2.5rem] md:h-[3.2rem] rounded-full overflow-hidden bg-gray-800'>
                <img src={cecile} alt='' className='w-100 h-100 object-contain'/>
            </div>
            <div className='flex flex-col justify-start items-start'> 
                <h4 className='text-md font-bold text-iconsColor h-[1.6rem] w-[100%] whitespace-nowrap overflow-x-hidden overflow-ellipsis'>Noel Tshiani Muadima</h4>
                <h4 className='text-md mt-[-0.3rem] text-darkTextColor h-[1rem]'>@NoelKTshiani</h4>
            </div>
            <button className='bg-iconsColor text-primary font-semibold rounded-full px-3 py-2'>Follow</button>
        </div>
    );
}

export default ToFollow;