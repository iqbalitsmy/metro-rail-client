import './SearchTrain.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const today = dayjs();

const SearchTrain = ({ train }) => {
    const { fromOptionList, fromSelectedValue, handleFromAutocompleteChange, toOptionList, toSelectedValue, handleToAutocompleteChange, handleDateChange, handleTimeChange, handleSearchTrain, selectedTime, selectedDate } = train;

    const [travelDate, setTravelDate] = useState("")


    // from home page data
    useEffect(() => {
        const searchTrain = JSON.parse(localStorage.getItem('searchTrain'));
        console.log((searchTrain));
        const date = searchTrain?.trainData?.purchaseDate
        console.log(date)

        if (date) {
            setTravelDate(date);

            // Remove data
        } else {
            setTravelDate(dayjs());
        }

    }, [])

    console.log(travelDate)


    return (
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
                                value={dayjs(travelDate)}
                                onChange={handleDateChange}
                                className='in-search-train rounded pl-3 py-1 w-full'
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col w-full'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <label className='font-medium mb-2' htmlFor="time">Time</label>
                            <TimePicker
                                value={dayjs(selectedTime)}
                                onChange={handleTimeChange}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='text-center font-semibold text-white bg-[#ee0000] hover:bg-[#de0000] py-2 rounded'>
                    <input className='uppercase tracking-wider cursor-pointer w-full' type="submit" name="" id="" value={"Search Trains"} />
                </div>
            </form>
        </aside>
    );
};

export default SearchTrain;