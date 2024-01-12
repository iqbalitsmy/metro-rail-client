import React from 'react';

const HomeBanner = () => {
    return (

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
    );
};

export default HomeBanner;