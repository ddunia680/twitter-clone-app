import React, { useState } from 'react';
import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';
import ForgotPass from '../forgotPassword/forgotPass';
import './authContainer.css';

function AuthContainer(props) {
    const [inSignUp, setInSignUp] = useState(false);
    const [inForgotPassword, setInForgotPassword] = useState(false);
    const uiclasses = [!inSignUp ? 'w-[100%] h-[100vh] bg-darkClose flex flex-row justify-between items-center duration-100' : 'w-[100%] h-[100vh] bg-darkClose flex flex-row-reverse justify-between items-center duration-100']
    return (
        <div className={uiclasses.join(' ')}>
            { inSignUp && !inForgotPassword ? 
                <SignUp setInSignUp={setInSignUp} setInForgotPassword={setInForgotPassword}/> 
            : !inSignUp && !inForgotPassword ? 
                <SignIn setInSignUp={setInSignUp} setInForgotPassword={setInForgotPassword}/>
            : inForgotPassword ?
                <ForgotPass setInSignUp={setInSignUp} setInForgotPassword={setInForgotPassword}/>
            : null}
            <div className='hidden md:flex rightSide w-1/3 h-[100%] flex-col justify-center items-center space-y-7'>
                <h1 className='text-4xl font-sans font-bold text-iconsColor text-center'>{ !inSignUp ? 'New Here?' : 'Already have an account?'}</h1>
                <h2 className='text-2xl font-sans text-iconsColor px-[1rem] text-center'>{ !inSignUp ? 'Sign up and discover a great amount of new opportunities' : 'Login to get full control and express what is on your mind!  '}</h2>
                { !inSignUp ?
                    <button className='px-[5rem] py-[0.5rem] rounded-full bg-iconsColor text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75' onClick={() => {
                        setInSignUp(!inSignUp);
                        if(inForgotPassword) {
                            setInForgotPassword(!inForgotPassword);
                        }
                    }}>Sign Up</button>
                :
                    <button className='px-[5rem] py-[0.5rem] rounded-full bg-iconsColor text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75' onClick={() => {
                        setInSignUp(!inSignUp);
                        if(inForgotPassword) {
                            setInForgotPassword(!inForgotPassword);
                        }
                    }}>Sign In</button>
                }

                { !inSignUp && !inForgotPassword ? 
                    <p title='Forgot password?' className='text-orange-700 font-semibold mx-auto cursor-pointer hover:text-orange-900' onClick={() => setInForgotPassword(true)}>Forgot Password?</p>
                : null}
            </div>
        </div>
    );
}

export default AuthContainer;