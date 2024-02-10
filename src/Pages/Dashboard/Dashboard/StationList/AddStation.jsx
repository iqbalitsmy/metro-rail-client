import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../../assets/logo/images.png'

const AddStation = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        stationSerial: "",
        status: "",
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
        if (!formData.name) {
            newErrors.name = 'Please Enter station name';
        }
        if (!formData.location) {
            newErrors.location = 'Please Enter location';
        }
        if (!formData.stationSerial) {
            newErrors.stationSerial = 'Please Enter location';
        }
        if (!(formData.status === "active" || formData.status === "deactive")) {
            newErrors.status = 'Station status must be active or deactive';
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
                const response = await fetch('http://localhost:3001/api/v1/add-station', {
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
        console.log("Error", errors)
    }

    return (
        <main className='px-2 grid grid-cols-1 shadow-md'>
            <div className='mt-6'>
                <h1 className='text-2xl font-medium mb-2'>Add Station</h1>
                <hr className='border-t border-[#e00]' />
            </div>
            <div className='mx-auto w-full md:max-w-lg md:min-w-[25%] mb-28'>
                <div className='flex flex-col justify-center items-center'>
                    <a
                        className='mb-0'
                        href='/'
                    >
                        <figure className='w-auto'>
                            <img className='w-auto object-contain' src={logo} alt="" />
                        </figure>
                    </a>
                    <h1 className='text-3xl font-extrabold mb-4 text-[#f00]'>Dhaka Metro Rail</h1>
                </div>
                <div className='bg-white rounded-lg w-full shadow-md'>
                    <div className='text-sm flex justify-between shadow-md px-4 py-5 w-full'>
                        <p className='font-medium text-[#da924e]'>Add New Station</p>
                    </div>
                    <form
                        onSubmit={handleLoginSubmit}
                        className='mt-4 p-4 w-full grid grid-cols-2 gap-3'
                    >
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="text"
                                name="name" id="name"
                                placeholder='Enter station name'
                                onChange={handleChange}
                            />
                            {
                                errors?.name && <span className='text-red-600'>{errors?.name}</span>
                            }
                        </div>
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="text"
                                name="location" id="location"
                                placeholder='Enter station location'
                                onChange={handleChange}
                            />
                            {
                                errors?.location && <span className='text-red-600'>{errors?.location}</span>
                            }
                        </div>
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="number"
                                name="stationSerial" id="stationSerial"
                                placeholder='Enter station Serial Number'
                                onChange={handleChange}
                            />
                            {
                                errors?.stationSerial && <span className='text-red-600'>{errors?.stationSerial}</span>
                            }
                        </div>
                        <div>
                            <input
                                className='in-login rounded pl-3 py-2 mb-5 w-full bg-[#f5f8f9]'
                                type="text"
                                name="status" id="status"
                                placeholder='Enter station status'
                                onChange={handleChange}
                            />
                            {
                                errors?.status && <span className='text-red-600'>{errors?.status}</span>
                            }
                        </div>
                        <div className='text-center font-semibold text-white col-span-2'>
                            <button className='in-login w-full py-2 mb-2 uppercase tracking-wider cursor-pointer bg-[#ee0000] hover:bg-[#ff0000] rounded' type="submit" name="" id="">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AddStation;