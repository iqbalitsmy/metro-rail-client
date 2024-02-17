import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RequestForRefund = () => {
    const { _id, fromStation, toStation, price, quantity, time, purchaseDate, payment } = useLoaderData();
    const navigate = useNavigate();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [err, setErr] = useState("");

    const paymentOptions = ["Bkash", "Nagad", "Rocket", "Upay"];

    const handleOptionChange = (event) => {
        setSelectedPaymentMethod(event.target.innerHTML);
    };

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        // Remove any non-digit characters from the input value
        const phoneNumber = inputValue.replace(/\D/g, '');

        setPhoneNumber(phoneNumber);
    };
    console.log(purchaseDate)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr("");

        if (!(selectedPaymentMethod && phoneNumber)) {
            return setErr("Please enter payment method and mobile number");
        }

        // Check if the phone number starts with "01" and is exactly 11 digits long
        if (!(/^01\d{9}$/.test(phoneNumber))) {
            return setErr("Please enter valid phone number and payment methods")
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(
                        `http://localhost:3001/api/v1/cancel-ticket/${_id}`,
                        {
                            payment: "request for refund",
                            refundPaymentMethods: selectedPaymentMethod,
                            refundPaymentMobNumb: phoneNumber
                        },
                        { withCredentials: true } // This should be outside the request body
                    );
                    // console.log(response);
                    if (response.status >= 200 && response.status < 300) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully requested for refund",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(-1);
                    } else {
                        // Handle non-successful status codes
                        console.error("Request failed with status:", response.status);
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Something went wrong",
                            text: "Please try again",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    // console.log(response.data);

                } catch (error) {
                    // If An error occurred
                    console.log("Error :", error)
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something is wrong",
                        text: "Pleas try again",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    return (
        <div className="container mx-auto h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <h1 className='text-2xl font-medium mb-6'>Enter your preferred payment method</h1>
            <hr className='border-t border-[#e00] mb-6' />

            <table className="table-auto border-collapse w-full rounded-md mb-8">
                <thead className='bg-[#FFF2F2]'>
                    <tr className='h-12'>
                        <th className="border-l border-y px-4 py-2 text-left">Source</th>
                        <th className="border-y px-4 py-2 text-left">Destination</th>
                        <th className="border-y px-4 py-2 text-left">Num of Seat</th>
                        <th className="border-y px-4 py-2">Price</th>
                        <th className="border-y px-4 py-2">Date</th>
                        <th className="border-y px-4 py-2">Time</th>
                        <th className="border-y px-4 py-2 text-left">Payment Status</th>
                        <th className="border-r border-y px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className='border-b h-12'>
                        <td className="border-l border-y px-4 py-2">{fromStation}</td>
                        <td className="border-y px-4 py-2">{toStation}</td>
                        <td className="border-y px-4 py-2">{quantity}</td>
                        <td className="border-y px-4 py-2">{price}৳</td>
                        <td className="border-y px-4 py-2 text-center">{dayjs(purchaseDate).format('YYYY-MM-DD')}</td>
                        <td className="border-y px-4 py-2 text-center">{dayjs(time).format('h:mm A')}</td>
                        <td className="border-y px-4 py-2">{payment} </td>
                    </tr>
                </tbody>
            </table>
            <form className="lg:w-2/5 md:w-1/2 mx-auto bg-white shadow-md px-4 py-8" onSubmit={handleSubmit}>
                <div className='flex flex-col w-full mb-4'>
                    <label className='mb-2 font-semibold text-lg' htmlFor="from">Select Payment Methods</label>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={paymentOptions}
                        value={selectedPaymentMethod}
                        onChange={handleOptionChange}
                        renderInput={(params) => <TextField {...params}
                            placeholder="Payment Methods"
                        />}
                    />
                </div>
                <div className="mb-4">
                    <label className='block mb-2 font-semibold text-lg' htmlFor="phoneNumber">
                        Enter your Mobile Number
                    </label>
                    <div className="relative">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-2">
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <input
                            className="appearance-none border border-gray-300 rounded w-full py-4 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            id="phoneNumber"
                            type="tel"
                            placeholder="11 digit mobile number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                </div>
                <div className="text-center">
                    {
                        err && <span className='text-red-600'>{err}</span>
                    }
                    <button
                        className="bg-[#ee0000] hover:bg-[#de0000] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                        type="submit"
                    >
                        Request for refund
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestForRefund;