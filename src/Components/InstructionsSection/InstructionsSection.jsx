import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

const InstructionsSection = () => {
    return (
        <section className='container mx-auto mb-20'>
            <div className='flex flex-col md:flex-row justify-center lg:mx-10 md:mx-4 gap-10'>
                <figure className='mx-auto md:w-9/12'>
                    <img className='md:h-4/5 w-full object-center' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/instruction-secion-image.png" alt="" />
                </figure>
                <div className='w-full'>
                    <h3 className='text-center md:text-left text-2xl font-bold tracking-wide mb-6'>Instructions to Purchase Tickets</h3>
                    <ul className='text-base tracking-wide text-[#023623]'>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                Tickets can be bought online ten days in advance.
                            </p>
                        </li>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                You can pay for the tickets using mobile financial services: bKash, Nagad, Rocket, Upay or debit/credit cards: Mastercard, Visa, DBBL Nexus. Other payment options will be available soon.
                            </p>
                        </li>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                In case of payment or transaction failure, the deducted amount would be refunded by your bank or MFS provider within 8 business days.
                            </p>
                        </li>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                In case money has been deducted from your card / mobile wallet but you have not received a ticket confirmation, the deducted amount would be refunded by your bank or MFS provider within 8 business days.
                            </p>
                        </li>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                If you have not received your ticket copy in email, kindly check your Spam / Junk folder. You can also download your ticket copy from the purchase history of your account after you login.
                            </p>
                        </li>
                        <li className='flex gap-4 mb-4'>
                            <FontAwesomeIcon icon={faCircleArrowRight} className='h-7 text-green-800' />
                            <p>
                                In case of passengers downloading fake apps or any other app from Google Play which claim to sell train tickets of Bangladesh Railway, the authorities will not take any liability.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default InstructionsSection;