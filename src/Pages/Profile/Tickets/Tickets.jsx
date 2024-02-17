import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress, MenuItem, Popover, } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import isTodayOrFutureDate from './checkDate';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    // popover
    const [anchorEl, setAnchorEl] = useState({});

    const handleClick = (event, id) => {
        handleOpenMenu(event, id);
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: event.currentTarget
        }));
    };

    const handleCloseMenu = (id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: null
        }));
    };

    const open = (id) => Boolean(anchorEl[id]);
    const id = (id) => open(id) ? `popover-${id}` : undefined;


    // Station List data
    useEffect(() => {
        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const response = await axios.get('http://localhost:3001/api/v1/user-tickets', { withCredentials: true });
                // console.log(response.data);
                setTickets(response.data);
            } catch (error) {
                // setError(error.message || 'An error occurred');
                console.log("Error :", error)
            }
        }
        fetchData()
    }, [])

    // Send mail
    const handleSendMail = async (event, id) => {
        console.log(id)
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3001/api/v1/ticket-mail/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Mail send successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);

            } else {
                console.error("Failed to send mail:", responseData.error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to send mail",
                    text: "Pleas try again",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
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
            setLoading(false);
        }
    }
    // Handle refund ticket
    const handleRefund = async (event, id, msg) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/api/v1/refund-request/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify({ payment: msg }),
            });
            const responseData = await response.json();
            console.log(responseData)
            if (response.ok) {
                console.log(responseData);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment status update successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload(true)
            } else {
                console.error("Failed to update payment status:", responseData.error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to update payment status",
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
        }
    }



    return (
        <>
            {loading ? (<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>) :
                (<div className="overflow-x-auto bg-white shadow-lg p-4 rounded-md">
                    <h1 className='text-2xl font-medium mb-6'>Tickets</h1>
                    <hr className='border-t border-[#e00] mb-6' />
                    <table className="table-auto border-collapse w-full rounded-md">
                        <thead className='bg-[#FFF2F2]'>
                            <tr className='h-16'>
                                <th className="border-l border-y px-4 py-2 text-left">Source</th>
                                <th className="border-y px-4 py-2 text-left">Destination</th>
                                <th className="border-y px-4 py-2 text-left">Num of Seat</th>
                                <th className="border-y px-4 py-2">Price</th>
                                <th className="border-y px-4 py-2">Travel Date</th>
                                <th className="border-y px-4 py-2">Travel Time</th>
                                <th className="border-y px-4 py-2 text-left">Payment Status</th>
                                <th className="border-r border-y px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                tickets.map(({ _id, fromStation, toStation, price, quantity, time, purchaseDate, payment }) => (
                                    <tr className='border-b h-16' key={_id}>
                                        <td className="border-l border-y px-4 py-2">{fromStation}</td>
                                        <td className="border-y px-4 py-2">{toStation}</td>
                                        <td className="border-y px-4 py-2">{quantity}</td>
                                        <td className="border-y px-4 py-2">{price}৳</td>
                                        <td className="border-y px-4 py-2 text-center">{dayjs(purchaseDate).format('YYYY-MM-DD')}</td>
                                        <td className="border-y px-4 py-2 text-center">{dayjs(time).format('h:mm A')}</td>
                                        <td className="border-y px-4 py-2">{payment} </td>
                                        <td className="border-r border-y px-4 py-2">
                                            {
                                                isTodayOrFutureDate(purchaseDate) && (
                                                    <Button aria-describedby={id(_id)} onClick={(event) => handleClick(event, _id)}>
                                                        ...
                                                    </Button>
                                                )
                                            }
                                            <Popover
                                                open={open(_id)}
                                                anchorEl={anchorEl[_id]}
                                                onClose={() => handleCloseMenu(_id)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                PaperProps={{
                                                    sx: { boxShadow: '0 2px 10px rgba(5, 5, 5, 0.1)', color: "#808080" },
                                                }}
                                            >
                                                {
                                                    !(payment === "request for refund") && isTodayOrFutureDate(purchaseDate) && (
                                                        <MenuItem onClick={() => handleCloseMenu(_id)} >
                                                            <button
                                                                className="bg-white font-bold py-2 rounded"
                                                                onClick={(event) => handleSendMail(event, _id)}
                                                            >
                                                                <FontAwesomeIcon className='pr-2' icon={faEnvelope} />
                                                                Mail Ticket
                                                            </button>
                                                        </MenuItem>
                                                    )
                                                }
                                                {
                                                    (!((payment === "request for refund") || (payment === "reject refund")) && isTodayOrFutureDate(purchaseDate)) && (
                                                        <MenuItem onClick={() => handleCloseMenu(_id)}>
                                                            <Link to={`${_id}`}>
                                                                <button className="bg-white font-bold py-2 rounded">
                                                                    <FontAwesomeIcon icon={faBan} className='pr-2' />
                                                                    Cancel Ticket
                                                                </button>
                                                            </Link>
                                                        </MenuItem>
                                                    )

                                                }
                                                {
                                                    (payment === "request for refund" && isTodayOrFutureDate(purchaseDate)) && (
                                                        <MenuItem onClick={() => handleCloseMenu(_id)}>
                                                            <button
                                                                onClick={(event) => handleRefund(event, _id, "Paid")}
                                                                className="bg-white font-bold py-2 rounded"
                                                            >
                                                                <FontAwesomeIcon icon={faBan} className='pr-2' />
                                                                Cancel refund request
                                                            </button>
                                                        </MenuItem>
                                                    )

                                                }
                                            </Popover>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>)
            }
        </>
    );
};

export default Tickets;