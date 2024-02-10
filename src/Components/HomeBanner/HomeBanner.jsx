import metroImg  from '../../assets/metro.webp'
import bkash  from '../../assets/home/bkash.png'
import masterCard  from '../../assets/home/master-card.png'
import nagad  from '../../assets/home/nagad.png'
import nexusDebit  from '../../assets/home/nexus-debit.svg'
import upay  from '../../assets/home/upay.svg'
import visa  from '../../assets/home/visa.png'


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
                        <img className='h-full' src={bkash} alt="" />
                    </div>
                    <div className='h-5 w-auto'>
                        <img className='h-full' src={nagad} alt="" />
                    </div>
                    <div className='h-5 w-auto'>
                        <img className='h-full' src={upay} alt="" />
                    </div>
                    <div className='h-5 w-auto'>
                        <img className='h-full' src={masterCard} alt="" />
                    </div>
                    <div className='h-5 w-auto'>
                        <img className='h-full' src={visa} alt="" />
                    </div>
                    <div className='h-5 w-auto'>
                        <img className='h-full' src={nexusDebit} alt="" />
                    </div>
                </div>
            </div>
            <figure className='lg:h-[400px] w-auto'>
                <img className='h-full w-full rounded-lg' src={metroImg} alt="" />
                {/* <img className='h-full w-full rounded-lg' src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/b66f9a625698a6728b8824899d19a771.jpg" alt="" /> */}
            </figure>
        </aside>
    );
};

export default HomeBanner;