import React, { useEffect, useRef, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Spinner from '../../UI/spinner/spinner';
import axios from 'axios';

function RecoveryView1(props) {
    const [email, setEmail] = useState('');
    const [emailIsTouched, setEmailIsTouched] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [emailError, setEmailError] = useState('');

    const [loading, setLoading] = useState(false);
    const [foundUser, setFoundUser] = useState('');
    const [code, setCode] = useState('');
    const [realCode, setRealCode] = useState('');
    const [networkError, setNetworkErr] = useState('');

    const emailClasses = ['relative w-[90%] md:w-[60%] bg-iconsColor flex justify-between items-center px-1 rounded-full border-b-[5px]', emailIsTouched && !emailIsValid ? 'border-redText' : 'border-blueSpecial'];

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const refs = [ input1, input2, input3, input4 ];

    useEffect(() => {
        if(foundUser) {
            refs[0].current.focus();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foundUser]);

    useEffect(() => {
        if(code.length > 3) {
            confirmCodeHandler();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const formValidationHandler = (type, value) => {
        switch(type) {
            case "email":
                setEmailIsTouched(true);
                if(value.includes('@') && value.length >= 5){
                    setEmailIsValid(true);
                } else {
                    setEmailIsValid(false);
                }
                break;
            default:
                console.log('end of check');
        }
    }

    const sendMailHandler = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/getCode/${email}`)
        .then(res => {
            setLoading(false);
            setRealCode(res.data.code);
            setFoundUser(res.data.userId);
            props.setTempUser(res.data.userId);
        })
        .catch(err => {
            setLoading(false);
            if(err.response.data.message.includes('email')) {
                 setEmailError(err.response.data.message);
            } else {
                setNetworkErr('Oops, something went wrong...');
            }
           
            console.log(err);
        })
    }

    const confirmCodeHandler = () => {
        if(realCode === code) {
            props.setInFirstep(false);
        } else {
            setNetworkErr('Wrong code entered!')
            setCode('');
            refs.map(oneRef => (
                oneRef.current.value = ''
            ))
            refs[0].current.focus();
        }

     }

    return (
        <div className='w-[100%] flex flex-col justify-center items-center'>
            { networkError ? <p className='h-[1rem] text-sm text-red-600 px-[1rem]'>{networkError}</p> : null}
            <h1 className='text-blueSpecial font-bold'>Please Enter your Email Address</h1>

            <div className={emailClasses.join(' ')}>
                <input className='h-[3rem] w-[95%] bg-transparent focus:outline-none text-darkClose px-2 rounded-full disabled:bg-black disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:text-gray-700' disabled={realCode ? true : false} placeholder='Your email' onChange={e => {
                    setEmail(e.target.value);
                    formValidationHandler('email', e.target.value);
                }} value={email} />
                { email && !realCode ? <XCircleIcon className='w-[1.3rem] text-red-700' onClick={() => setEmail('')}/> :null}
                <p className='absolute top-[0.9rem] text-sm text-red-700 m-[2rem]'>{emailError}</p>
            </div>
            <p className='mt-[1rem] text-[13px] md:text-[15px] text-darkTextColor text-center'>{ realCode ? 'A Code was sent to your email, verify and Enter it' : 'An Email will be sent to the address you input'}</p>
            {/* Code entry part */}
            { realCode ? 
            <div className='w-[80%] flex justify-center items-center space-x-2 my-[1rem]'>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[0]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[1].current.focus();
                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[1]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[2].current.focus();

                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[2]} onChange={(e) => {
                        setCode(code + e.target.value);
                        refs[3].current.focus();

                    }}/>
                    <input className='w-[2rem] h-[2rem] rounded-lg text-center text-lg text-black border-2px' ref={refs[3]} onChange={(e) => {
                        setCode(code + e.target.value);
                    }}/>
            </div>
            : null}
            {!code.length <= 4 ? 
                <button className='px-[5rem] py-[0.5rem] rounded-full bg-blueSpecial text-xl text-darkClose font-semibold duration-75 hover:bg-white hover:duration-75 disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed' disabled={!emailIsValid || loading} onClick={() => sendMailHandler()}>{ loading ? <Spinner/> : 'Send'}</button>
            : <Spinner/>}
        </div>
    );
}

export default RecoveryView1;