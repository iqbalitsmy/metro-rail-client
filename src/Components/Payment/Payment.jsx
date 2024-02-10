import { Typography } from '@mui/material';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../AuthProvider/UserProvider';
import { loadStripe } from '@stripe/stripe-js';
import "./Payment.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCreditCard, faKey } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [stripeApiKey, setStripeApiKey] = useState("");
    const { user } = useContext(UserContext);
    const stripePromise = loadStripe("pk_test_51OfyfmCocyN0DGeB1NVtaYVhj65Ss1WaUn2ZY8k92Zp6SMIYgYKlm6MTq3wb27yv6Z2xdm2Bb1e6hUnMPXFJHhQp002J2aSl2y")

    // @todo :ERR_CONNECTION_REFUSED
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await axios.get("http://localhost:5000/api/v1/stripeapikey",
    //                 {
    //                     method: 'POST',
    //                     credentials: 'include',
    //                     headers: {
    //                         'Content-Type': 'application/json', // Set the Content-Type header
    //                     },
    //                 }
    //             );
    //             console.log(data)
    //             setStripeApiKey(data.stripeApiKey);
    //         } catch (error) {
    //             console.log("Error :", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // // console.log(station);


    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            fromStationId: "65ba8537fde010da6e6fef76",
            toStationId: "65ba8537fde010da6e6fef76",
            userId: user._id,
            price: 300,
            time: "11:00 PM",
            date: "01:10:1999"
        };
        try {
            const { data } = await axios.post('http://localhost:3001/api/payment/process', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify(formData),
            });

            const client_secret = data.client_secret;
            if (!stripe) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                        address: {
                            country: "Bangladesh"
                        }
                    }
                }
            });
            console.log(result)
            if (result.paymentIntent.status === "succeeded") console.log("succeeded")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className="grid justify-center items-center pb-3 container mx-auto h-screen rounded-lg">
                <form className='text-lg w-full bg-white shadow-md p-8' onSubmit={(e) => submitHandler(e)}>
                    <h2 className="mb-4 font-semibold text-3xl text-center ">Card Information</h2>
                    <div className='shadow-md w-full flex gap-4 items-center p-4'>
                        <FontAwesomeIcon className='text-5xl' icon={faCreditCard} />
                        <CardNumberElement className='text-2xl border border-gray-300 rounded w-48 py-6 px-3' />
                    </div>
                    <div className='shadow-md w-full flex gap-4 items-center p-4'>
                        <FontAwesomeIcon icon={faCalendarDays}  className='text-5xl' />
                        <CardExpiryElement className='text-2xl border border-gray-300 rounded w-48 py-6 px-3' />
                    </div>
                    <div className='shadow-md w-full flex gap-4 items-center p-4'>
                        <FontAwesomeIcon icon={faKey}  className='text-5xl' />
                        <CardCvcElement className='text-2xl border border-gray-300 rounded w-48 py-6 px-3' />
                    </div>
                    <button
                        type='submit'
                        className='mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;