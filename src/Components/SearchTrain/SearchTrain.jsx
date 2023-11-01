import React from 'react';
import './SearchTrain.css'

const SearchTrain = () => {

    return (
        <section className='container mx-auto mb-16 md:flex justify-center items-center gap-4 '>
            <aside className=''>
                <form>
                    <div className='flex flex-col md:flex-row gap-8 mb-4'>
                        <div className='flex flex-col'>
                            <label className='font-medium mb-2' htmlFor="from">From</label>
                            <input
                                className='in-search-train rounded pl-3 py-1 w-full'
                                type="text"
                                name="" id="form"
                                placeholder='From Station'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium mb-2' htmlFor="to">To</label>
                            <input
                                className='in-search-train rounded pl-3 py-1 w-full'
                                type="text"
                                name="" id="to"
                                placeholder='To Station'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-8 mb-4'>
                        <div className='flex flex-col mb-8 w-full'>
                            <label className='font-medium mb-2' htmlFor="to">Date of Journey</label>
                            <input
                                className='in-search-train rounded pl-3 py-1 w-full'
                                type="text"
                                name="" id="to"
                                placeholder='Pick a date'
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium mb-2' htmlFor="to">Time</label>
                            <input
                                className='in-search-train rounded pl-3 py-1 w-full'
                                type="text"
                                name="" id="to"
                                placeholder='Pick a time'
                                onFocus={(e) => (e.target.type = "time")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                        </div>
                    </div>
                    <div className='text-center font-semibold text-white bg-[#ee0000] hover:bg-[#de0000] py-2 rounded'>
                        <input className='uppercase tracking-wider cursor-pointer w-full' type="submit" name="" id="" value={"Search Trains"} />
                    </div>
                </form>
            </aside>
            <aside className='relative'>
                <div className='absolute right-0 text-right pt-8 pr-4'>
                    <p className='pb-4'>
                        Easy <strong className='text-[#ee0000]'>purchase</strong> of <strong className='text-[#ee0000]'>tickets</strong> using<br />
                        online payment method
                    </p>
                    <div className='flex justify-end gap-4'>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/bkash-77x32.png" alt="" />
                        </div>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/nagad-32.png" alt="" />
                        </div>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/upay.svg" alt="" />
                        </div>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/master-card.png" alt="" />
                        </div>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/visa.png" alt="" />
                        </div>
                        <div className='h-5 w-auto'>
                            <img className='h-full' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/nexus-debit.svg" alt="" />
                        </div>
                    </div>
                </div>
                <figure className='lg:h-[400px] w-auto'>
                    <img className='h-full w-full rounded-lg' src="https://www.railway-technology.com/wp-content/uploads/sites/13/2019/10/1l-Image-Dhaka-Metro-Mass-Rapid-Transit-System.jpg" alt="" />
                    {/* <img className='h-full w-full rounded-lg' src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/b66f9a625698a6728b8824899d19a771.jpg" alt="" /> */}
                </figure>
            </aside>
        </section>
    );
};

export default SearchTrain;