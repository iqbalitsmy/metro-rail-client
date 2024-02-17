import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import InstructionsSection from '../InstructionsSection/InstructionsSection';
import trainInformationImg from '../../assets/train-information-illustration.svg';
import SearchTrain from '../SearchTrain/SearchTrain';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import generateSubarray from '../../utils/subArray';
import calculateRealTimeUpdates from "../../utils/StationUpdate"
import roundTimeToSlot from '../../utils/roundedTimeSlote';
import { UserContext } from '../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';


const TrainInformation = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [station, setStation] = useState([]);
    const [fromSelectedValue, setFromSelectedValue] = useState(null);
    const [toSelectedValue, setToSelectedValue] = useState(null);
    const [fromOptionList, setFromOptionList] = useState([]);
    const [toOptionList, setToStation] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const [selectedStations, setSelectedStations] = useState(null);
    const [selectedStationData, setSelectedStationData] = useState(null)
    const [ticketUnitPrice, setTicketUnitPrice] = useState(10)
    const [ticketPrice, setTicketPrice] = useState(0);
    const [navigateToHome, setNavigateToHome] = useState(false);
    const [formData, setFormData] = useState({})
    const [ticketQuantity, setTicketQuantity] = useState(1)

    // // Ticket buy
    // useEffect(() => {
    //     const ticketFetch = async () => {
    //         // console.log(object)
    //         // Retrieving data
    //         const storedData = localStorage.getItem('myData');
    //         let parsedData;
    //         if (storedData) {
    //             parsedData = JSON.parse(storedData);
    //             // console.log(parsedData);
    //         } else {
    //             return console.log('No data found in local storage');
    //         }

    //         if (from.includes("/success") && storedData) {
    //             try {
    //                 console.log("block")
    //                 const response = await fetch('http://localhost:3001/api/v1/add-ticket', {
    //                     method: 'POST',
    //                     credentials: 'include',
    //                     headers: {
    //                         'Content-Type': 'application/json', // Set the Content-Type header
    //                     },
    //                     body: JSON.stringify(parsedData),
    //                 });
    //                 if (response.ok) {
    //                     localStorage.removeItem('myData');

    //                     Swal.fire({
    //                         position: "top-end",
    //                         icon: "success",
    //                         title: "Ticket is successfully purchase.",
    //                         text: "Please check the email",
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //                 }
    //             } catch (error) {
    //                 console.error('Error:', error);
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "error",
    //                     title: "Something is wrong",
    //                     text: "Please try again later",
    //                     showConfirmButton: false,
    //                     timer: 1000
    //                 });
    //                 localStorage.clear();
    //             }
    //         } else if (from.includes("cancel") && storedData) {
    //             location.state.from.pathname = "";
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "error",
    //                 title: "Payment cancel",
    //                 text: "Please try again",
    //                 showConfirmButton: false,
    //                 timer: 1000
    //             });
    //             localStorage.clear();
    //         } else {
    //             return;
    //         }
    //     }
    //     ticketFetch();
    // }, [])

    // from home page data
    useEffect(() => {
        const searchTrain = JSON.parse(localStorage.getItem('searchTrain'));
        // console.log((searchTrain));

        if (searchTrain) {
            const { data, ticketPrice, trainData } = searchTrain;
            const { from, to, time, purchaseDate } = trainData
            // console.log(data, ticketPrice, trainData);
            // console.log(from, to, time, purchaseDate);
            if (data.length > 1) {
                setSelectedStationData(data);
                setTicketPrice(ticketPrice);
                setTicketUnitPrice(ticketPrice);
            }
            if (time) setSelectedTime(time);
            if (purchaseDate) setSelectedDate(purchaseDate);
            if (to) setToSelectedValue(to);
            if (from) setFromSelectedValue(from);


            console.log((purchaseDate))
            // localStorage.removeItem('searchTrain');
        }
        setLoading(false);

    }, [])

    // console.log(selectedDate)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/stations', { withCredentials: true });
                setStation(response.data);
            } catch (error) {
                console.log("Error :", error);
            }
        };

        fetchData();
    }, []);
    // console.log(station);

    useEffect(() => {
        if (station.length > 0) {
            setFromOptionList(station.map(s => s.name));
        } else {
            setFromOptionList([]);
        }
    }, [station]);


    const handleFromAutocompleteChange = (event, newValue) => {
        setFromSelectedValue(newValue);
        setToStation([])
        if (newValue) {
            const to = station.filter(s => s.name !== newValue);
            setToStation(to.map(s => s.name)); // Set toOptionList directly to the names of filtered stations
        } else {
            setToStation([]); // Handle the case when newValue is null
        }
    };

    const handleToAutocompleteChange = (event, newValue) => {
        setToSelectedValue(newValue);
    };

    const handleNumOfTickets = (event) => {
        console.log(ticketUnitPrice)
        const n = event.target.value;
        setTicketPrice(ticketUnitPrice * n);
        setTicketQuantity(n);
    }

    const handleDateChange = (date) => {
        // console.log(date)
        setSelectedDate(date);

        localStorage.removeItem('searchTrain');
        // console.log(selectedDate.format('dddd'));
    };

    const handleTimeChange = (newValue) => {
        // console.log(newValue)
        setSelectedTime(newValue);
        // setSelectedTime(newValue.format('YYYY-MM-DDTHH:mm:ss'));
    };

    // Send station request
    const handleSearchTrain = (e) => {
        e.preventDefault();

        // Collect the form data
        const newFromData = {
            from: fromSelectedValue,
            to: toSelectedValue,
            purchaseDate: selectedDate,
            time: selectedTime,
        };
        // Sub array of station
        const stationToFrom = generateSubarray(newFromData.from, newFromData.to, station)
        setSelectedStations(stationToFrom);
        console.log(selectedTime)

        // for halt and deprture calculation
        const stationNameToCalculate = [...stationToFrom.map(s => s.name)];
        const data = calculateRealTimeUpdates(stationNameToCalculate, 3, 7, new Date(roundTimeToSlot(dayjs(selectedTime).format('YYYY-MM-DDTHH:mm:ss'))))


        setTicketPrice(0);
        setTicketUnitPrice(10);
        setTicketQuantity(1);
        setTicketPrice(10 * data.length);
        setTicketUnitPrice(10 * data.length);

        setSelectedStationData(data)
        // console.log(data)

        setFormData(newFromData)

        // Remove home page data
        localStorage.removeItem('searchTrain');

        // Storing data
        localStorage.setItem('myData', JSON.stringify(newFromData));
    };
    // console.log(selectedStationData)

    const stationFindByName = (name) => {
        return station.find(s => s.name === name)?._id;
    }

    const handleBuyTickets = async (e) => {
        e.preventDefault();

        console.log(user)
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

        if (!(fromSelectedValue && toSelectedValue && selectedTime && selectedDate)) {
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
            userId: user._id,
            quantity: ticketQuantity,
            price: ticketPrice,
            time: dayjs(selectedTime).format('YYYY-MM-DDTHH:mm:ss'),
            purchaseDate: dayjs(selectedDate).format('YYYY-MM-DD'),
        }

        setFormData({
            ...newFormData,
        });

        try {
            const response = await fetch('http://localhost:3001/api/v1/payment/process', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify(newFormData),
            });
            if (response.ok) {
                // Storing data
                localStorage.setItem('myData', JSON.stringify(newFormData));

                const data = await response.json();
                window.location = data.url;
            }
        } catch (error) {
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
                loading ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : <>
                    <section className='container mx-auto flex flex-col md:flex-row justify-center gap-8 pb-16 mb-10'>
                        <SearchTrain train={{ station, fromOptionList, fromSelectedValue, handleFromAutocompleteChange, toOptionList, toSelectedValue, handleToAutocompleteChange, handleDateChange, handleTimeChange, handleSearchTrain, selectedTime }}></SearchTrain>
                        <aside className='bg-white shadow-lg rounded-md pb-12 pt-5 w-full lg:w-3/5'>
                            {
                                !(selectedStationData && (selectedStationData.length > 1)) ? (<div className=''>
                                    <figure className='flex flex-col justify-center items-center'>
                                        <img src={trainInformationImg} alt="" />
                                        <figcaption className='w-1/2 text-center text-gray-500 text-sm'>
                                            Please select your preferred station to see the detailed information of your selected metro.
                                        </figcaption>
                                    </figure>
                                </div>)
                                    : (<div className='p-4'>
                                        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center py-2 lg:py-3 mb-3 border-b-[1px]'>
                                            <h3 className='font-bold'>Agargaon COMMUTER 1 (1001)</h3>
                                            <div className='flex flex-row gap-4 text-sm'>
                                                <p className='text-gray-500'>Runs On:</p>
                                                <ul className='flex flex-row gap-4 text-[#13258c]'>
                                                    <li className='text-black bg-green-50 font-bold'>Fri</li>
                                                    <li>Sat</li>
                                                    <li>Sun</li>
                                                    <li>Mon</li>
                                                    <li>Tu</li>
                                                    <li>Wed</li>
                                                    <li>Thu</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='inline-block text-[#13258c] mb-4'>
                                                <p className='text-sm font-semibold border-b-2 border-green-900'>Routes</p>
                                            </div>
                                            {
                                                selectedStationData?.map((selectedStation, i) => (
                                                    <div key={i} className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                                        <div className='text-[#13258c] relative py-4'>
                                                            {
                                                                ((i === 0) || (i === selectedStationData.length - 1)) && <FontAwesomeIcon
                                                                    className='absolute -left-[6px]'
                                                                    icon={faLocationDot}
                                                                />
                                                            }
                                                            <p className='ml-4'>{selectedStation.station}</p>
                                                        </div>
                                                        <div className='flex justify-between text-gray-700 ml-4'>
                                                            <p><span className='text-[10px] text-gray-500'>New Train Arrival In</span> {selectedStation.estimatedArrival}</p>
                                                            <p><span className='text-[10px] text-gray-500'>Halt:</span> {selectedStation.estimatedHalt}</p>
                                                            <p><span className='text-[10px] text-gray-500'>Departure:</span> {selectedStation.estimatedDeparture}</p>
                                                            <p><span className='text-[10px] text-gray-500'>Duration:</span> {selectedStation.totalDuration} Min</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='grid grid-cols-2 md:grid-cols-3 justify-around items-center gap-4'>
                                                <h4 className='font-bold text-lg'>Total: {ticketPrice} tk</h4>
                                                <div className='flex gap-2 items-center'>
                                                    <label htmlFor="quantity" className='text-sm'>Number of Tickets</label>
                                                    <input
                                                        className='py-1 pl-2 font-medium text-lg rounded-md border-2 border-black'
                                                        style={{}}
                                                        value={ticketQuantity}
                                                        name='quantity' id='quantity' type='number'
                                                        pattern="[1-9]*"
                                                        min="1"
                                                        title="Please enter a non-negative integer"
                                                        onChange={handleNumOfTickets}
                                                    />
                                                </div>
                                                <input
                                                    className='bg-[#d00] w-full hover:bg-[#e00] py-1 font-medium text-lg uppercase rounded-md text-white col-span-4 md:col-auto cursor-pointer'
                                                    type='submit'
                                                    value={"Buy"}
                                                    onClick={handleBuyTickets}
                                                />
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </aside>
                    </section>
                    <InstructionsSection></InstructionsSection>
                    {navigateToHome && <Navigate to="/login" />}
                </>
            }

        </>
    );
};

export default TrainInformation;