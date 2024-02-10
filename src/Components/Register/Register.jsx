import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Register.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import registerImg from '../../assets/register/register.svg'
import { Button } from '@mui/material';
import axios from 'axios';

const today = dayjs();

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
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

    const handleDateChange = (date) => {
        const jsDate = new Date(date);
        setFormData({
            ...formData,
            dateOfBirth: jsDate,
        });
    };
    // Image Upload
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];

        const base64 = await convertBase64(file);
        setLoading(true);
        axios
            .post("http://localhost:3001/api/v1/upload-image", { image: base64 })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
                setFormData({
                    ...formData,
                    image: res.data,
                })
            })
            .then(() => setLoading(false))
            .catch((err) => {
                console.log("Image Error:", err.massage);
                setLoading(false);
            });
    };


    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        setErrors({});
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Password must be at least 6 characters long';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Password and confirm password does not match';
        }
        setErrors(newErrors);
        // console.log(Object.keys(newErrors).length === 0)
        // console.log(Object.entries(newErrors).length === 0)
        return Object.keys(newErrors).length === 0;
    };
    console.log(url)


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrors({});
            // Send the form data to the server or perform other actions
            try {
                const response = await fetch('http://localhost:3001/api/v1/register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type header
                    },
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
    }

    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mb-6'>Registration</h1>
            <hr className='border-t border-[#e00] mb-6' />
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <figure className='mb-2'>
                        <img className='max-h-40 w-auto object-contain' src={registerImg} alt="" />
                    </figure>
                    <h2 className='text-2xl font-medium'>Please Verify Yourself</h2>
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
                                    type="email"
                                    name="email" id="email1"
                                    placeholder='Enter Your Email'
                                    onChange={handleChange}
                                />
                                {
                                    errors?.email && <span className='text-red-600'>{errors?.email}</span>
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
                            <div className='grid grid-cols-2 w-full gap-2'>
                                <div className='flex flex-col w-full'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="dateOfBirth" id="dateOfBirth"
                                            disableFuture
                                            inputFormat="MMM dd, yyyy"
                                            disableMaskedInput={true}
                                            value={dayjs(formData.dob, 'DD/MM/YYYY')}
                                            onChange={handleDateChange}
                                            className='in-search-train rounded pl-3 py-1 w-full'
                                        />
                                    </LocalizationProvider>
                                    {
                                        errors?.dateOfBirth && <span className='text-red-600'>{errors?.dateOfBirth}</span>
                                    }
                                </div>
                                <div>
                                    Upload Profile
                                    <input
                                        type="file"
                                        id='dropzone-file'
                                        onChange={uploadImage}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`w-full text-center font-semibold text-white py-2 rounded mb-8 ${loading ? "bg-[#eb8585] hover:bg-[#d47070]" : "bg-[#e00] hover:bg-[#f00]"}`}>
                            <button className='uppercase w-full tracking-wider' type="submit" name="" id="" value={"Submit Data"} disabled={loading ? true : false} >Submit Data</button>
                        </div>
                        <div className='text-center text-base font-semibold text-[#f00]'>
                            <Link to={'/login'}>Already Registered?</Link>
                        </div>
                    </form>
                    {navigateToHome && <Navigate to="/" replace={true} />}
                </div>
            </div>
        </section>
    );
};

export default Register;