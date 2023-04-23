import React, { useState } from 'react';
import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';
import './authContainer.css';

function AuthContainer(props) {
    const [inSignUp, setInSignUp] = useState(false);
    const uiclasses = [!inSignUp ? 'w-[100%] h-[100vh] bg-darkClose flex flex-row justify-between items-center duration-100' : 'w-[100%] h-[100vh] bg-darkClose flex flex-row-reverse justify-between items-center duration-100']
    return (
        <div className={uiclasses.join(' ')}>
            { inSignUp ? <SignUp setInSignUp={setInSignUp}/> : <SignIn setInSignUp={setInSignUp}/>}
            <div className='hidden md:flex rightSide w-1/3 h-[100%] flex-col justify-center items-center space-y-7'>
                <h1 className='text-4xl font-sans font-bold text-iconsColor text-center'>{ !inSignUp ? 'New Here?' : 'Already have an account?'}</h1>
                <h2 className='text-2xl font-sans text-iconsColor px-[1rem] text-center'>{ !inSignUp ? 'Sign up and discover a great amount of new opportunities' : 'Login to get full control and express what is on your mind!  '}</h2>
                { !inSignUp ?
                    <button className='px-[5rem] py-[0.5rem] rounded-full bg-iconsColor text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75' onClick={() => setInSignUp(!inSignUp)}>Sign Up</button>
                :
                    <button className='px-[5rem] py-[0.5rem] rounded-full bg-iconsColor text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75' onClick={() => setInSignUp(!inSignUp)}>Sign In</button>
                }
            </div>
        </div>
    );
}

export default AuthContainer;