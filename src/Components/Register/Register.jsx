import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import registerImg from '../../assets/register/register.svg'
import axios from 'axios';
import { UserContext } from '../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';


const Register = () => {
    const navigate = useNavigate();
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
    const { user, isLoading } = useContext(UserContext);


    useEffect(() => {
        // if user already have than redirect
        if (user.email && !isLoading) {
            return navigate("/", { replace: true });
        }
    }, [user, isLoading]);

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
            console.log("message")
            // Send the form data to the server or perform other actions
            try {
                console.log("message2")
                const response = await fetch('http://localhost:3001/api/v1/register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type header
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    console.log(response);
                    return window.location.reload();
                }
                const data = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${data.message}!!`,
                    footer: 'Please try again'
                });
            } catch (err) {
                console.error('Error:', err);
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
                                    <label htmlFor="timeInput" className="block text-base font-medium text-gray-700 mb-1">
                                        Date of birth
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="dateOfBirth" id="dateOfBirth"
                                            disableFuture
                                            inputFormat="MMM dd, yyyy"
                                            disableMaskedInput={true}
                                            onChange={handleDateChange}
                                            className='in-search-train rounded pl-3 py-1 w-full'
                                        />
                                    </LocalizationProvider>
                                    {
                                        errors?.dateOfBirth && <span className='text-red-600'>{errors?.dateOfBirth}</span>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="timeInput" className="block text-base font-medium text-gray-700 mb-1">
                                        Upload Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        id='dropzone-file'
                                        required
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
                </div>
            </div>
        </section>
    );
};

export default Register;