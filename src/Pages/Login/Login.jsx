import React, { useState } from 'react';
import logo from '../../assets/logo/dhaka_metro_rail -logos_black.png'
import { Link, Navigate } from 'react-router-dom';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [navigateToHome, setNavigateToHome] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        setErrors({});
        if (!/^\d{11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid mobile number or password';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Invalid mobile number or password';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrors({});
            // Send the form data to the server or perform other actions
            try {
                const response = await fetch('http://localhost:3000/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type header
                    },
                    credentials: 'include', // Include credentials (cookies) in the request
                    body: JSON.stringify(formData),
                });
                if (response) {
                    console.log(response);
                    setNavigateToHome(true)
                }
            } catch (error) {
                console.error('Error:', error);
            }
            console.log('Form data submitted:', formData);
        }
        console.log("Error", errors)
    }

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
                    <form
                        onSubmit={handleLoginSubmit}
                        className='mt-4 p-4'
                    >
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="tel"
                                name="phoneNumber" id="phoneNumber"
                                placeholder='Enter your mobile number'
                                onChange={handleChange}
                            />
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="password"
                                name="password" id="password"
                                placeholder='Enter your password'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='text-center font-semibold text-white'>
                            <button className='in-login w-full py-2 mb-2 uppercase tracking-wider cursor-pointer bg-green-800 hover:bg-green-700 rounded' type="submit" name="" id="">LOGIN</button>
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
                    {navigateToHome && <Navigate to="/" replace />}
                </div>
            </div>
        </main>
    );
};

export default Login;