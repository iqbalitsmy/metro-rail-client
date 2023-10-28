import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        dob: '',
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
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
        }

        if (!/^\d{11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Password must be at least 6 characters long';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Password and confirm password does not match';
        }

        if (!formData.dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
            newErrors.dob = 'Invalid date of birth format (DD-MM-YYYY)';
        }
        setErrors(newErrors);
        // console.log(Object.keys(newErrors).length === 0)
        // console.log(Object.entries(newErrors).length === 0)
        return Object.keys(newErrors).length === 0;
    };


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrors({});
            // Send the form data to the server or perform other actions
            try {
                const response = await fetch('http://localhost:3000/api/v1/register', {
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
                    <form className='' onSubmit={handleSignUpSubmit}>
                        <div className='flex flex-col gap-5 mb-8 w-full'>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="text"
                                    name="name" id="name"
                                    placeholder='Enter Your Full Name'
                                    onChange={handleChange}
                                />
                                {
                                    errors?.name && <span className='text-red-600'>{errors?.name}</span>
                                }
                            </div>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="tel"
                                    name="phoneNumber" id="phoneNumber"
                                    placeholder='Enter Your Phone Number'
                                    onChange={handleChange}
                                />
                                {
                                    errors?.phoneNumber && <span className='text-red-600'>{errors?.phoneNumber}</span>
                                }
                            </div>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="password"
                                    name="password" id="password"
                                    placeholder='Password'
                                    onChange={handleChange}
                                />
                                {
                                    errors?.password && <span className='text-red-600'>{errors?.password}</span>
                                }
                            </div>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="password"
                                    name="confirmPassword" id="confirmPassword"
                                    onChange={handleChange}
                                    placeholder='Confirm Password'
                                />
                                {
                                    errors?.confirmPassword && <span className='text-red-600'>{errors?.confirmPassword}</span>
                                }
                            </div>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="text"
                                    name="dob" id="dob"
                                    placeholder='DD/MM/YYY'
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    onChange={handleChange}
                                />
                                {
                                    errors?.dob && <span className='text-red-600'>{errors?.dob}</span>
                                }
                            </div>
                        </div>

                        <div className='w-full text-center font-semibold text-white bg-green-800 hover:bg-green-700 py-2 rounded mb-8'>
                            <button className='uppercase w-full tracking-wider' type="submit" name="" id="" value={"Submit Data"} >Submit Data</button>
                        </div>
                        <div className='text-center text-lg font-bold text-green-900'>
                            <Link to={'/login'}>Already Registered?</Link>
                        </div>
                    </form>
                    {navigateToHome && <Navigate to="/" replace />}
                </div>
            </div>
        </section>
    );
};

export default Register;