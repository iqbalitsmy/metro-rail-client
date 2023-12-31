import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import InstructionsSection from '../InstructionsSection/InstructionsSection';


const TrainInformation = () => {
    const [open, setOpen] = useState(false);
    // const [trainInfo, setTrainInfo] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         // Make a GET request with cookies using fetch
    //         try {
    //             const res = await fetch('trainInfo.json')
    //             const json = await res.json();
    //             setTrainInfo(json);
    //         } catch (error) {
    //             console.log("Error :", error)
    //         }
    //     }
    //     fetchData()
    // }, [])
    // console.log(trainInfo)

    return (
        <div className=''>
            <section className='container mx-auto flex flex-col md:flex-row justify-center gap-8 pb-16 mb-10'>
                <aside className='w-full lg:w-1/4'>
                    <div className='bg-[#f0f1fa] p-4 rounded-md'>
                        <h3 className='text-lg font-medium mb-2'>Select Your Preferred Station</h3>
                        <form className='relative'>
                            <div className='flex flex-col bg-white p-2 rounded-md hover:bg-[#eee]'>
                                <label
                                    htmlFor="trainName"
                                    className='text-[10px] text-[#b4b6cc] uppercase'
                                >
                                    Station Name
                                </label>
                                <input
                                    className='hover:bg-[#eee]'
                                    type="text"
                                    name="trainName"
                                    id="trainName"
                                    value={"Agargaon Station 1 (1001)"}
                                    placeholder='SELECT STATION'
                                    onSelect={() => setOpen(true)}
                                    onBlur={() => setOpen(false)}
                                    style={{ outline: "none" }}
                                />
                            </div>
                            <div className={`${open ? 'block' : "hidden"} absolute bg-white shadow-md p-2 h-52 overflow-y-scroll`}>
                                <ul className=''>
                                    <li className='hover:bg-gray-200 p-1 rounded-md transition-colors'>Agargaon Station 1 (1001)</li>
                                    <li className='hover:bg-gray-200 p-1 rounded-md transition-colors'>Agargaon Station 2 (1002)</li>
                                    <li className='hover:bg-gray-200 p-1 rounded-md transition-colors'>Agargaon Station 3 (1003)</li>
                                    <li className='hover:bg-gray-200 p-1 rounded-md transition-colors'>Agargaon Station 4 (1004)</li>
                                </ul>
                            </div>
                            <input className='w-full bg-[#d00] hover:bg-[#e00] py-1 mt-2 font-medium text-lg uppercase rounded-md text-white cursor-pointer' type='submit' value={"search"} />
                        </form>
                    </div>

                </aside>
                <aside className='bg-white shadow-lg rounded-md pb-12 pt-5 w-full lg:w-3/5'>
                    <div className='hidden'>
                        <figure className='flex flex-col justify-center items-center'>
                            <img src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/train-information/train-information-illustration.svg" alt="" />
                            <figcaption className='w-1/2 text-center text-gray-500 text-sm'>
                                Please select your preferred train to see the detailed information of your selected train.
                            </figcaption>
                        </figure>
                    </div>
                    <div className='p-4'>
                        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center py-2 lg:py-3 mb-3 border-b-[1px]'>
                            <h3 className='font-bold'>Agargaon COMMUTER 1 (1001)</h3>
                            <div className='flex flex-row gap-4 text-sm'>
                                <p className='text-gray-500'>Runs On:</p>
                                <ul className='flex flex-row gap-4 text-[#13258c]'>
                                    <li>Fri</li>
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
                            <div className='border-l-[1px] border-b-[1px] pb-8'>
                                <div className='text-[#13258c] relative pb-4'>
                                    <FontAwesomeIcon
                                        className='absolute -left-[6px]'
                                        icon={faLocationDot}
                                    />
                                    <p className='ml-4'>Agargaon</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span>0 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 0 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span>2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Shewrapara</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 10 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 14 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Uttara North</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 20 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 26 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Kazipara</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 30 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 38 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Mirpur-10</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 40 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 50 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 5 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Mirpur-11</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 45 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 60 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Pallabi</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 55 min </p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 65 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'>Uttara South</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 65 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 70 min </p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 5 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-3'>
                                <div className='text-[#13258c] relative py-4'>

                                    <p className='ml-4'> Uttara Centre</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 70 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 80 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 10 min</p>
                                </div>
                            </div>
                            <div className='border-l-[1px] border-b-[1px] pb-8 mb-4'>
                                <div className='text-[#13258c] relative py-4'>
                                    <FontAwesomeIcon
                                        className='absolute -left-[6px]'
                                        icon={faLocationDot}
                                    />
                                    <p className='ml-4'>Uttara North</p>
                                </div>
                                <div className='flex justify-between text-gray-700 ml-4'>
                                    <p><span className='text-[10px] text-gray-500'>Arraival:</span> 80 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Halt:</span> 2 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Departure:</span> 85 min</p>
                                    <p><span className='text-[10px] text-gray-500'>Duration:</span> 0 min</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 justify-around items-center gap-4'>
                                <h4 className='font-bold text-lg'>Total: 500tk</h4>
                                <div className='flex gap-2 items-center'>
                                    <label htmlFor="quantity" className='text-sm'>Number of Tickets</label>
                                    <input className='py-1 pl-2 font-medium text-lg rounded-md border-2 border-black' style={{}} name='quantity' id='quantity' type='number' />
                                </div>
                                <input className='bg-[#d00] w-full hover:bg-[#e00] py-1 font-medium text-lg uppercase rounded-md text-white col-span-4 md:col-auto' type='submit' value={"Buy"} />
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
            <InstructionsSection></InstructionsSection>
        </div>

    );
};

export default TrainInformation;