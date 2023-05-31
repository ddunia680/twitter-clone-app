import React, { useState } from 'react';
import RecoveryView1 from '../../components/passRecoveryViews/recoveryView1';
import RecoveryView2 from '../../components/passRecoveryViews/recoveryView2';

function ForgotPass(props) {
    const [tempUser, setTempUser] = useState('');
    const [inFirstStep, setInFirstep] = useState(true);
    return (
        <div className='viewShadow w-[100%] md:w-2/3 h-[100vh] bg-gradient-to-br from-darkClose to-blueLight p-[2rem] flex flex-col justify-center items-center space-y-7'>
            <h1 className='text-2xl md:text-4xl font-semibold'>Recoverying Account</h1>
            { inFirstStep ? 
                <RecoveryView1 setInFirstep={setInFirstep} setTempUser={setTempUser}/>
            :
                <RecoveryView2 tempUser={tempUser} setInSignUp={props.setInSignUp} setInForgotPassword={props.setInForgotPassword}/>
            }
        </div>
    );
}

export default ForgotPass;