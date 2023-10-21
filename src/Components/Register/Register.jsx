import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mb-6'>Registration</h1>
            <hr className='border-t border-green-600 mb-6' />
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center mb-2'>
                    <figure className='mb-4'>
                        <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/auth/verify-nid-illustration.svg" alt="" />
                    </figure>
                    <h2 className='text-2xl font-medium mb-2'>Please Verify Yourself</h2>
                    <div className='text-lg font-extralight text-gray-500 text-center w-full md:w-2/3'>
                        <p className='mb-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe tenetur, rerum omnis minima animi.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem saepe tenetur, rerum omnis minima animi.</p>
                    </div>
                </div>
                <div className='py-8 px-4 bg-white shadow-lg w-full md:w-2/4 lg:w-[30%]'>
                    <form className=''>
                        <div className='flex flex-col gap-5 mb-8 w-full'>
                            <input
                                className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                type="text"
                                name="" id="name"
                                placeholder='Enter Your Full Name'
                            />
                            <input
                                className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                type="email"
                                name="" id="email"
                                placeholder='Enter Your Email'
                            />
                            <input
                                className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                type="password"
                                name="" id="password"
                                placeholder='Password'
                            />
                            <input
                                className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                type="password"
                                name="" id="email"
                                placeholder='Confirm Password'
                            />
                            <input
                                className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                type="text"
                                name="" id="email"
                                placeholder='DD/MM/YYY'
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                        </div>

                        <div className='w-full text-center font-semibold text-white bg-green-800 hover:bg-green-700 py-2 rounded mb-8'>
                            <input className='uppercase tracking-wider' type="submit" name="" id="" value={"Submit Data"} />
                        </div>
                        <div className='text-center text-lg font-bold text-green-900'>
                            <Link to={'/login'}>Already Registered?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;