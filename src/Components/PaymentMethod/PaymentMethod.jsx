import React from 'react';

const PaymentMethod = () => {
    return (
        <section className='container mx-auto mb-8 px-4 md:px-0'>
            <hr className='border-t border-gray-400' />
            <div className='my-10 flex justify-center gap-5'>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/bkash-77x32.png" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/nagad-32.png" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/rocket.svg" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/upay.svg" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/master-card.png" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/visa.png" alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src="https://d19qjkjk65tfln.cloudfront.net/v2/assets/img/home/nexus-debit.svg" alt="" />
                </figure>
            </div>
            <hr className='border-t border-gray-500' />
            <div className='py-10 text-center font-bold text-[13px] text-[#333] leading-6'>
                <p>
                    * The Tickets are issued by Bangladesh Railway's Centrally Computerized Seat Reservation & Ticketing System (CCSRTS) and Shohoz-Synesis-Vincen JV is responsible for designing, development, implementation, technical operation & maintenance of the system.
                </p>
            </div>

        </section>
    );
};

export default PaymentMethod;