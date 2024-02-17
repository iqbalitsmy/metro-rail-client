import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { name, email, password, role, dateOfBirth } = useLoaderData();
    const { id } = useParams();
    console.log(name, email)


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        dateOfBirth: '',
    });

    const [errors, setErrors] = useState({});

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

        if (!formData.role) {
            newErrors.role = 'Add valid user role';
        }
        setErrors(newErrors);
        // console.log(Object.keys(newErrors).length === 0)
        // console.log(Object.entries(newErrors).length === 0)
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to the server or perform other actions
        try {
            const response = await fetch(`http://localhost:3001/api/v1/update/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User update successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            } else {
                console.error("Failed to create user:", responseData.error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something is wrong",
                    text: "Pleas try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something is wrong",
                text: "Pleas try again",
                showConfirmButton: false,
                timer: 1500
            });
            // console.log('Form data submitted:', formData);
        }
    }


    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mt-6 mb-6'>Update User Data</h1>
            <hr className='border-t border-[#e00] mb-10' />
            <div className='flex flex-col justify-center items-center'>
                <div className='py-8 px-4 bg-white shadow-lg w-full md:w-2/4 lg:w-[30%]'>
                    <form className='' onSubmit={handleUpdateSubmit}>
                        <div className='flex flex-col gap-5 mb-8 w-full'>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="text"
                                    name="name" id="name"
                                    placeholder='Enter Your Full Name'
                                    defaultValue={name}
                                    onChange={handleChange}
                                    required
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
                                    defaultValue={email}
                                    onChange={handleChange}
                                    required
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
                                    value={password}
                                    readOnly
                                    placeholder='Password'
                                    onChange={handleChange}
                                    required
                                />
                                {
                                    errors?.password && <span className='text-red-600'>{errors?.password}</span>
                                }
                            </div>
                            <div>
                                <input
                                    className='in-register rounded pl-3 py-3 w-full placeholder:text-gray-500 placeholder:text-lg'
                                    type="text"
                                    name="role" id="role"
                                    defaultValue={role}
                                    onChange={handleChange}
                                    pattern="admin|basic"
                                    placeholder='admin or basic'
                                    required
                                />
                                {
                                    errors?.role && <span className='text-red-600'>{errors?.role}</span>
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
                                            defaultValue={dayjs(dateOfBirth)}
                                            // value={dayjs(dateOfBirth, 'DD/MM/YYYY')}
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
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full text-center font-semibold text-white bg-[#e00] hover:bg-[#f00] py-2 rounded-md mb-8'>
                            <button className='uppercase w-full tracking-wider' type="submit" name="" id="" value={"Submit Data"} >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateUser;