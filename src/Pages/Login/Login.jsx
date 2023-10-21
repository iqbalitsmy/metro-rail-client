import React from 'react';
import logo from '../../assets/logo/dhaka_metro_rail -logos_black.png'
import { Link } from 'react-router-dom';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    return (
        <main className='login-bg w-full h-screen px-2'>
            <div className='container flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center mt-8'>
                    <a
                        className='mb-4'
                        href='/'
                    >
                        <figure className='h-52 w-auto'>
                            <img className='h-full w-auto object-contain' src={logo} alt="" />
                        </figure>
                    </a>
                    <h1 className='text-3xl font-extrabold mb-4'>Dhaka Railway</h1>
                    <ul className='text-lg font-medium flex gap-8 text-green-900 mb-4'>
                        <li>নিরাপদ</li>
                        <li className='list-disc'>আরামদায়ক</li>
                        <li className='list-disc'>সাশ্রয়ী</li>
                    </ul>
                </div>
                <div className='bg-white rounded-lg'>
                    <div className='text-sm flex items-center justify-between shadow-md px-4 py-5'>
                        <Link><p className='font-medium text-[#da924e]'>Forget Password?</p></Link>
                        <Link><p className='text-[#bdc3c6]'>Need Help?</p></Link>
                    </div>
                    <form className='mt-4 p-4'>
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="tel"
                                name="" id="tel"
                                placeholder='Enter your mobile number'
                            />
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="password"
                                name="" id="password"
                                placeholder='Enter your password'
                            />
                        </div>
                        <div className='text-center font-semibold text-white'>
                            <input className='in-login w-full py-2 mb-2 uppercase tracking-wider cursor-pointer bg-green-800 hover:bg-green-700 rounded' type="submit" name="" id="" value={"LOGIN"} />
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-400'>OR</p>
                            <Link
                            className='text-green-800 underline'
                                to={'/signup'}
                            >
                                REGISTER
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;