import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cancel = () => {
    const location = useLocation();

    // Ticket buy
    useEffect(() => {
        const ticketFetch = () => {
            // console.log(object)
            // Retrieving data
            const storedData = localStorage.getItem('myData');
            localStorage.removeItem('myData');
            if (storedData) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Payment cancel",
                    text: "Please try again",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
        ticketFetch();
    }, [])

    return (<Navigate to={'/train-information'} replace></Navigate>);
};

export default Cancel;