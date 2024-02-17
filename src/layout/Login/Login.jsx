import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo/images.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../AuthProvider/UserProvider';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoading } = useContext(UserContext);
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // if user already have than redirect
        if (user.email && !isLoading) {
            return navigate(from, { replace: true });
        }
    }, [user, isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        setErrors({});
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Invalid mobile email or password';
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
                const response = await fetch('http://localhost:3001/api/v1/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type header
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    console.log(response);
                    // navigate(from, { replace: true });
                    window.location.reload();
                } else {
                    setErrors(
                        {
                            ...errors,
                            password: 'Invalid mobile email or password',
                        })
                }
            } catch (err) {
                console.error('Error:', err);
            }
            console.log('Form data submitted:', formData);
        }
        console.log("Error", errors)
    }

    return (
        <main className='login-bg h-screen px-2 grid grid-cols-1 justify-center'>
            <div className='mx-auto w-full md:max-w-lg md:min-w-[25%]'>
                <div className='flex flex-col justify-center items-center mt-8'>
                    <a
                        className='mb-0'
                        href='/'
                    >
                        <figure className='h-52 w-auto'>
                            <img className='h-full w-auto object-contain' src={logo} alt="" />
                        </figure>
                    </a>
                    <h1 className='text-3xl font-extrabold mb-4 text-[#f00]'>Dhaka Metro Rail</h1>
                </div>
                <div className='bg-white rounded-lg w-full'>
                    <div className='text-sm flex items-center justify-between shadow-md px-4 py-5 w-full'>
                        <Link><p className='font-medium text-[#da924e]'>Forget Password?</p></Link>
                        <Link><p className='text-[#bdc3c6]'>Need Help?</p></Link>
                    </div>
                    <form
                        onSubmit={handleLoginSubmit}
                        className='mt-4 p-4 w-full'
                    >
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="email"
                                name="email" id="email1"
                                placeholder='Enter your email'
                                onChange={handleChange}
                            />
                            {
                                errors?.email && <span className='text-red-600'>{errors?.email}</span>
                            }
                        </div>
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="password"
                                name="password" id="password"
                                placeholder='Enter your password'
                                onChange={handleChange}
                            />
                            {
                                errors?.password && <span className='text-red-600'>{errors?.password}</span>
                            }
                        </div>
                        <div className='text-center font-semibold text-white'>
                            <button className='in-login w-full py-2 mb-2 uppercase tracking-wider cursor-pointer bg-[#ee0000] hover:bg-[#ff0000] rounded' type="submit" name="" id="">LOGIN</button>
                        </div>
                    </form>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <p className='text-gray-400'>OR</p>
                        <Link
                            className='text-[#ee0000] underline'
                            to={'/signup'}
                        >
                            REGISTER
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;