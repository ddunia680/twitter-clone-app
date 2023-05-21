import React from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightMenu from '../rightMenu/rightMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import dog1 from '../../gifs/dog1.json';

import './inBuilding.css';

function InBuilding(props) {
    const navigate = useNavigate();
    const { route } = useParams();
    return (
        <div className='relative w-[100%] h-[100vh] flex justify-start items-start'>
            { window.innerWidth > 500 ? <LeftMenu/> : null}

            <div className='feed relative w-[100%] md:w-[50%] h-[93vh] md:h-[100vh] overflow-y-scroll flex flex-col justify-start items-start'>
                <div className='relative w-[100%] h-[100vh] p-[0.5rem] md:p-[1rem] flex flex-col justify-between items-center mt-[5rem] md:mt-[10rem] space-y-2'>
                    {/* Top banner */}
                    <div className='flex justify-start items-center space-x-[1rem] fixed top-0 left-0 md:left-[10%] xl:left-[26%] h-[3rem] bg-primary w-[100%] md:w-[50%] xl:w-[40%] border-b-[1px] border-darkClose z-10'>
                        <div className='hover:bg-darkComponentVar rounded-full ml-[1rem] md:ml-0' title='go back' onClick={() => navigate(-1)}>
                            <ArrowLeftIcon className='w-[1rem] md:w-[2rem] p-0 md:p-[0.3rem]'/>
                        </div>
                        <p className='text-[13px] md:text-[20px] font-bold'>{route}</p>
                    </div>
                    <h2 className='text-iconsColor text-center text-[14px] md:text-[20px] font-semibold z-10'>Sorry, the {route} Component is still under development....</h2>
                    <div className='animes bg-darkClose rounded-full'>
                        <Lottie animationData={dog1} className='w-[10rem] h-[10rem] p-[1rem]'/>
                    </div>
                    <p className='text-[11px] md:text-[13px] text-darkTextColor z-10'>Twitter clone app by @Dunia Dunia &copy; 2023</p>
                </div>
            </div>

            { window.innerWidth > 500 ? <RightMenu/> :null}
        </div>
    );
}

export default InBuilding;