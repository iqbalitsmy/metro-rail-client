import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mb-6'>Contact Us</h1>
            <hr className='border-t border-[#e00] mb-6' />
            <div className='flex flex-col justify-center items-center gap-8'>
                <div className='shadow-sm rounded-md w-11/12 md:w-3/5 lg:w-2/5'>
                    <div className='text-sm text-gray-400 tracking-wide p-4 border-b'>
                        <p>For refund of unsuccessful purchases and card
                            <br />charging issues</p>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>bKash</div>
                        <div className='text-[#13258c]'>16247</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Nagad</div>
                        <div className='text-[#13258c]'>16167</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Rocket / DBBL Nexus</div>
                        <div className='text-[#13258c]'>16216</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Upay</div>
                        <div className='text-[#13258c]'>16268</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Visa / Mastercard</div>
                        <div className='text-[#13258c]'>N/A</div>
                    </div>
                </div>
                <div className='shadow-sm rounded-md p-8  w-11/12 md:w-3/5 lg:w-2/5'>
                    <div className='text-sm text-gray-400 tracking-wide py-4 border-b'>
                        <p>Refund and Cancellation</p>
                    </div>
                    <div className='text-gray-700'>
                        <p className='py-2'>For online refund:</p>
                        <ol className='text-gray-500 text-sm list-decimal pl-8 pb-2'>
                            <li>Login to your account</li>
                            <li>Go to Purchase History</li>
                            <li>Find your ticket and refund it online</li>
                        </ol>
                        <p className='pb-2'>If any of your online ticket is printed from the counter before the journey date it will not be eligible for refund from the online refund system. It will be eligible for refund from the station counters only.</p>
                    </div>
                    <div className='text-gray-700'>
                        <p className='pb-2'>For counter refund:</p>
                        <ol className='text-gray-500 text-sm list-decimal pb-2 pl-8'>
                            <li>Visit your originating station (departure station) and contact the refund counter.</li>
                        </ol>
                        <p>Please read the <span className='text-[#13258c] underline'>Online Refund Instructions & Ticket Refund Policy</span> before canceling your ticket.</p>
                    </div>
                </div>
                <div className='shadow-sm rounded-md px-8  w-11/12 md:w-3/5 lg:w-2/5'>
                    <div className='text-sm text-gray-400 tracking-wide py-4 border-b'>
                        <p className=''>For Technical Support</p>
                    </div>
                    <div className='flex justify-between py-4'>
                        <div className='text-lg font-semibold'>Tech Support Team</div>
                        <p className='text-[#13258c] font-semibold'>support@eticket.railway.gov.bd</p>
                    </div>
                </div>
                <div className='text-[#13258c] text-lg font-semibold underline shadow-sm rounded-md p-8 w-11/12 md:w-3/5 lg:w-2/5'>
                    <Link>TERMS AND CONDITIONS</Link>
                    <Link>PRIVACY POLICY</Link>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;