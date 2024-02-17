import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Success = () => {
    // Ticket buy
    useEffect(() => {
        const ticketFetch = async () => {
            // console.log(object)
            // Retrieving data
            const storedData = localStorage.getItem('myData');
            localStorage.removeItem('myData');
            let parsedData;
            if (storedData) {
                parsedData = JSON.parse(storedData);
                // console.log(parsedData);
            } else {
                return console.log('No data found in local storage');
            }

            if (storedData) {
                try {
                    console.log("block")
                    const response = await fetch('http://localhost:3001/api/v1/add-ticket', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', // Set the Content-Type header
                        },
                        body: JSON.stringify(parsedData),
                    });
                    if (response.ok) {
                        // localStorage.removeItem('myData');
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Ticket is successfully purchase.",
                            text: "Please check the email",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    // localStorage.clear();
                }
            } else {
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

export default Success;