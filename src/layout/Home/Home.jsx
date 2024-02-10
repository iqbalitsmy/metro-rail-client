import SearchTrain from '../../Components/SearchTrain/SearchTrain';
import BookingSteps from '../../Components/BookingSteps/BookingSteps';
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod';
import Facilities from '../../Components/Facilities/Facilities';
import Accessibility from '../../Components/Accessibility/Accessibility';
import HomeBanner from '../../Components/HomeBanner/HomeBanner';
import { Autocomplete, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import generateSubarray from '../../utils/subArray';
import calculateRealTimeUpdates from '../../utils/StationUpdate';
import roundTimeToSlot from '../../utils/roundedTimeSlote';
import { UserContext } from '../../AuthProvider/UserProvider';

const Home = () => {

    const { user } = useContext(UserContext);
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

    const today = dayjs();

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // console.log(selectedDate.format('dddd'));
    };

    const handleTimeChange = (newValue) => {
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
            purchaseDate: selectedDate.format('YYYY-MM-DD'),
            time: selectedTime.format('YYYY-MM-DDTHH:mm:ss'),
        };
        // Sub array of station
        const stationToFrom = generateSubarray(newFromData.from, newFromData.to, station)
        setSelectedStations(stationToFrom);


        // for halt and deprture calculation
        const stationNameToCalculate = [...stationToFrom.map(s => s.name)];
        const data = calculateRealTimeUpdates(stationNameToCalculate, 3, 7, new Date(roundTimeToSlot(newFromData.time)))
        setTicketPrice(ticketUnitPrice * data.length);
        setTicketUnitPrice(ticketUnitPrice * data.length);

        setSelectedStationData(data)

        setFormData(newFromData)
        console.log(formData)

        // Storing data
        localStorage.setItem('myData', JSON.stringify(newFromData));
    };


    return (
        <>
            <section className='container mx-auto mb-16 md:flex justify-center items-center gap-4 px-4 md:px-0'>
                <aside className=''>
                    <form className='flex flex-col gap-4' onSubmit={handleSearchTrain}>
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
                                        defaultValue={today}
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
                        <div className='text-center font-semibold text-white bg-[#ee0000] hover:bg-[#de0000] py-2 rounded'>
                            {/* <Link to={"/train-information"}> */}
                            <input className='uppercase tracking-wider cursor-pointer w-full' type="submit" name="" id="" value={"Search Trains"} />
                            {/* </Link> */}
                        </div>
                    </form>
                </aside>
                <HomeBanner></HomeBanner>
            </section>
            <BookingSteps></BookingSteps>
            <Facilities></Facilities>
            <Accessibility></Accessibility>
            <PaymentMethod></PaymentMethod>
        </>
    );
};

export default Home;