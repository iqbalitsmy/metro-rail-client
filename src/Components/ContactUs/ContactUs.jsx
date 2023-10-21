import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <section className='container mx-auto mb-16'>
            <h1 className='text-2xl font-medium mb-6'>Contact Us</h1>
            <hr className='border-t border-green-600 mb-6' />
            <div className='flex flex-col justify-center items-center gap-8'>
                <div className='shadow-md rounded-md'>
                    <div className='text-sm text-gray-400 tracking-wide p-4 border-b'>
                        <p>For refund of unsuccessful purchases and card
                            <br />charging issues</p>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>bKash</div>
                        <div className='text-green-800'>16247</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Nagad</div>
                        <div className='text-green-800'>16167</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Rocket / DBBL Nexus</div>
                        <div className='text-green-800'>16216</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Upay</div>
                        <div className='text-green-800'>16268</div>
                    </div>
                    <div className='text-2xl font-bold flex justify-between items-center p-4 border-b'>
                        <div>Visa / Mastercard</div>
                        <div className='text-green-800'>N/A</div>
                    </div>
                </div>
                <div>
                    <div className='text-sm text-gray-400 tracking-wide p-4 border-b'>
                        <p>Refund and Cancellation</p>
                    </div>
                    <div>
                        <p>For online refund:</p>
                        <ol>
                            <li>Login to your account</li>
                            <li>Go to Purchase History</li>
                            <li>Find your ticket and refund it online</li>
                        </ol>
                        <p>If any of your online ticket is printed from the counter before the journey date it will not be eligible for refund from the online refund system. It will be eligible for refund from the station counters only.</p>
                    </div>
                    <div>
                        <p>For counter refund:</p>
                        <ol>
                            <li>Visit your originating station (departure station) and contact the refund counter.</li>
                        </ol>
                        <p>Please read the Online Refund Instructions & Ticket Refund Policy before canceling your ticket.</p>
                    </div>
                </div>
                <div>
                    <p>For Technical Support</p>
                    <div>
                        <div>Tech Support Team</div>
                        <p>support@eticket.railway.gov.bd</p>
                    </div>
                </div>
                <div>
                    <Link>TERMS AND CONDITIONS</Link>
                    <Link>PRIVACY POLICY</Link>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;