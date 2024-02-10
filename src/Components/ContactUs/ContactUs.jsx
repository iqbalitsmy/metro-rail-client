import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../Pages/Dashboard/Dashboard/DashboardCard';

const dashboardCard = [
    {
        name: `201 S. Grand Ave., 1st Floor New York City, NY 28020`,
        quantity: "Location",
        path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
        gStop1: "3eb98f",
        gStop2: 'eefee7',
        id: "gradient1"
    },
    {
        quantity: "Phone Number",
        name: "01xxxxxxxxx",
        path: "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z",
        gStop1: 'c084fc',
        gStop2: 'f2e6fe',
        id: "gradient2"
    },
    {
        quantity: "Email",
        name: "dhaka.metro@gmail.com",
        path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
        gStop1: "f8b320",
        gStop2: 'fdefce',
        id: "gradient3"
    },
]


const ContactUs = () => {
    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mb-6'>Contact Us</h1>
            <hr className='border-t border-[#e00] mb-6' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between w-full gap-6'>
                {
                    dashboardCard.map((item, i) => <DashboardCard item={item} key={i}></DashboardCard>)
                }
            </div>
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