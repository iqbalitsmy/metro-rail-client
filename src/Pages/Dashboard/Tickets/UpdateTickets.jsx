import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import generateSubarray from '../../../utils/subArray';
import Swal from 'sweetalert2';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { UserContext } from '../../../AuthProvider/UserProvider';
import '../../../Components/SearchTrain/SearchTrain.css'

const today = dayjs();

const UpdateTickets = () => {
    const ticket = useLoaderData();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [station, setStation] = useState([]);
    const [fromSelectedValue, setFromSelectedValue] = useState(null);
    const [toSelectedValue, setToSelectedValue] = useState(null);
    const [fromOptionList, setFromOptionList] = useState([]);
    const [toOptionList, setToOptionList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedStations, setSelectedStations] = useState(null);
    const [selectedStationData, setSelectedStationData] = useState(null)
    const [ticketUnitPrice, setTicketUnitPrice] = useState(10)
    const [ticketPrice, setTicketPrice] = useState(0);
    const [navigateToHome, setNavigateToHome] = useState(false);
    const [formData, setFormData] = useState({})
    const [ticketQuantity, setTicketQuantity] = useState(1)
    const [email, setEmail] = useState([])
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [defaultTicket, setDefaultTicket] = useState({
        from: "",
        to: "",
        userEmail: "",
        purchaseDate: "",
        time: "",
        price: 0,
        quantity: 0,
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // get ticket data
                const ticketsResponse = await axios.get('http://localhost:3001/api/v1/stations', { withCredentials: true });
                const stationData = ticketsResponse.data;
                // get user data
                const userResponse = await axios.get(`http://localhost:3001/api/v1/user/${ticket.userId}`, { withCredentials: true });
                const userData = userResponse.data;

                setStation(stationData);
                const ticketFetch = {
                    ...defaultTicket,
                    from: stationData.find(s => s._id === ticket.fromStationId).name,
                    to: stationData.find(s => s._id === ticket.toStationId).name,
                    purchaseDate: ticket.purchaseDate,
                    userEmail: userData.email,
                    time: ticket.time,
                    price: ticket.price,
                    quantity: ticket.quantity
                }
                setDefaultTicket({ ...ticketFetch })

                // default value for every input
                setFromSelectedValue(ticketFetch.from);
                setToSelectedValue(ticketFetch.to);
                setSelectedTime(ticketFetch.time);
                setTicketPrice(ticketFetch.price)

                setLoading(false)
            } catch (error) {
                console.log("Error :", error);
            }
        };
        fetchData();
    }, []);
    // console.log(station);
    // console.log(ticket);
    // console.log(defaultTicket);

    useEffect(() => {
        setLoading(true)
        if (station.length > 0) {
            setFromOptionList(station.map(s => s.name));

            // set to option list
            const toData = station.filter((s) => s.name !== defaultTicket.from);
            setToOptionList(toData.map(s => s.name)); // Set toOptionList directly to the names of filtered stations
            setLoading(false);
        } else {
            setFromOptionList([]);
        }
    }, [station, email, defaultTicket]);

    // console.log(toOptionList)

    const handleFromAutocompleteChange = (event, newValue) => {
        setTicketPrice(0)
        setFromSelectedValue(newValue);
        setToOptionList([])
        if (newValue) {
            const to = station.filter(s => s.name !== newValue);
            setToOptionList(to.map(s => s.name)); // Set toOptionList directly to the names of filtered stations
        } else {
            setToOptionList([]); // Handle the case when newValue is null
        }

        // Sub array of station
        const stationToFrom = generateSubarray(newValue, toSelectedValue, station);
        console.log(stationToFrom)
        // Ticket price change
        setTicketPrice(ticketUnitPrice * ticketQuantity * stationToFrom.length);
    };

    const handleToAutocompleteChange = (event, newValue) => {
        setTicketPrice(0);
        setToSelectedValue(newValue);
        // Sub array of station
        const stationToFrom = generateSubarray(fromSelectedValue, newValue, station)
        console.log(stationToFrom)
        setTicketPrice(ticketUnitPrice * ticketQuantity * stationToFrom.length);
    };

    const handleNumOfTickets = (event) => {
        const n = event.target.value;
        // Sub array of station
        const stationToFrom = generateSubarray(fromSelectedValue, toSelectedValue, station)
        console.log(stationToFrom)
        setTicketPrice(ticketUnitPrice * n * stationToFrom.length);
        setTicketQuantity(n);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // console.log(selectedDate.format('dddd'));
    };

    const handleTimeChange = (newValue) => {
        setSelectedTime(newValue);
        // setSelectedTime(newValue.format('YYYY-MM-DDTHH:mm:ss'));
    };

    const stationFindByName = (name) => {
        return station.find(s => s.name === name)?._id;
    }

    const handleBuyTickets = async (e) => {
        e.preventDefault();
        setLoading(true);

        // console.log(user)
        if (!user._id) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please Login First",
                text: "Please try again later",
                showConfirmButton: false,
                timer: 1000
            });
            return setNavigateToHome(true)
        }

        if (!(fromSelectedValue && toSelectedValue && selectedTime && selectedDate && selectedEmail)) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something is wrong",
                text: "Please try again later",
                showConfirmButton: false,
                timer: 1000
            });
        }
        // // Collect id the form data
        const fromFromStationId = stationFindByName(fromSelectedValue);
        const fromToStationId = stationFindByName(toSelectedValue);

        const newFormData = {
            fromStationId: fromFromStationId,
            toStationId: fromToStationId,
            userId: ticket.userId,
            quantity: ticketQuantity,
            payment: "cash payment",
            price: ticketPrice,
            time: selectedTime,
            purchaseDate: selectedDate.format('YYYY-MM-DD'),
        }

        setFormData({
            ...newFormData,
        });

        try {
            const response = await fetch(`http://localhost:3001/api/v1/update-ticket/${ticket._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify(newFormData),
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                console.log(data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Ticket is successfully purchase.",
                    text: "Please check the email",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something is wrong",
                text: "Please try again later",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }


    return (
        <>
            {
                loading ?
                    (<Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>) :
                    <aside className='mt-10 mx-auto shadow-md rounded-md h-full p-4'>
                        <h1 className='text-2xl font-medium mb-6'>Update Tickets</h1>
                        <hr className='border-t border-[#e00] mb-10' />
                        <form
                            className='flex flex-col gap-4 w-2/4 mx-auto'
                        >
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-medium mb-2' htmlFor="from">From</label>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={fromOptionList}
                                        value={fromSelectedValue}
                                        onChange={handleFromAutocompleteChange}
                                        renderInput={(params) => <TextField {...params}
                                            placeholder="From Station"
                                        />}
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label className='font-medium mb-2' htmlFor="to">To</label>
                                    <Autocomplete
                                        disablePortal
                                        id="to"
                                        // defaultValue={defaultTicket.to}
                                        options={toOptionList}
                                        value={toSelectedValue}
                                        onChange={handleToAutocompleteChange}
                                        className=''
                                        renderInput={(params) => <TextField {...params} placeholder="To Station" />}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row items-end gap-4'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-medium mb-2' htmlFor="to">Date of Journey</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            disablePast
                                            defaultValue={dayjs(defaultTicket.purchaseDate)}
                                            onChange={handleDateChange}
                                            className='in-search-train rounded pl-3 py-1 w-full'
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <label className='font-medium mb-2' htmlFor="time">Time</label>
                                        <TimePicker
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-medium mb-2' htmlFor="from">User Email</label>
                                    <Autocomplete
                                        disablePortal
                                        id="email"
                                        readOnly
                                        options={[]}
                                        value={defaultTicket.userEmail}
                                        renderInput={(params) => <TextField {...params}
                                            placeholder="User Email"
                                        />}
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label className='font-medium mb-2' htmlFor="quantity">Number of Tickets</label>
                                    <TextField
                                        id="outlined-number"
                                        type="number"
                                        onChange={handleNumOfTickets}
                                        defaultValue={defaultTicket.quantity}
                                        inputProps={{
                                            min: 1,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 justify-between gap-4 font-semibold pt-4 rounded'>
                                <div className='flex justify-between items-center'>
                                    <input
                                        className='bg-[#d00] hover:bg-[#e00] py-1 md:w-3/4 font-medium text-lg uppercase rounded-md text-white col-span-4 md:col-auto cursor-pointer'
                                        type='submit'
                                        value={"Buy"}
                                        onClick={handleBuyTickets}
                                    />
                                </div>
                                <div className='items-center'>
                                    <h4 className='font-bold text-lg'>Total: {ticketPrice} ৳</h4>
                                </div>
                            </div>
                        </form>
                    </aside>
            }
        </>
    );
};

export default UpdateTickets;