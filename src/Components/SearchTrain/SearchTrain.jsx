import { useState } from 'react';
import './SearchTrain.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';

import { trainList } from '../../utils/FakeData';
import useTimeSlots from '../../utils/useTimeSlots';

const today = dayjs();

const SearchTrain = () => {
    const [fromOptionList, setfromOptionList] = useState(trainList.map(({ from }) => from));
    const [fromSelectedValue, setFromSelectedValue] = useState(null);
    const [toOptionList, setToStation] = useState([]);
    const [toSelectedValue, setToSelectedValue] = useState(null);

    const { timeSlots } = useTimeSlots('08:00', '12:00');

    const handleFromAutocompleteChange = (event, newValue) => {
        setFromSelectedValue(newValue)
        if (newValue) {
            const to = trainList.find(({ from }) => from === newValue)?.to;
            setToStation(to);
        } else {
            setToStation([]);
        }

    };
    const handleToAutocompleteChange = (event, newValue) => {
        setToSelectedValue(newValue);
    };


    return (
        <aside className=''>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium mb-2' htmlFor="from">From</label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={fromOptionList}
                            value={fromSelectedValue}
                            className=''
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
                                className='in-search-train rounded pl-3 py-1 w-full'
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium mb-2' htmlFor="to">Time</label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={timeSlots}
                            className=''
                            renderInput={(params) => <TextField {...params} placeholder="__/__/__" />}
                        />
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