import bkash  from '../../assets/home/bkash.png'
import masterCard  from '../../assets/home/master-card.png'
import nagad  from '../../assets/home/nagad.png'
import nexusDebit  from '../../assets/home/nexus-debit.svg'
import upay  from '../../assets/home/upay.svg'
import visa  from '../../assets/home/visa.png'

const PaymentMethod = () => {
    return (
        <section className='container mx-auto mb-8 px-4 md:px-0'>
            <hr className='border-t border-gray-400' />
            <div className='my-10 flex justify-center gap-5'>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={bkash} alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={nagad} alt="" />
                </figure>
                {/* <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={} alt="" />
                </figure> */}
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={upay} alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={masterCard} alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={visa} alt="" />
                </figure>
                <figure className='h-9'>
                    <img className='h-full w-auto object-contain' src={nexusDebit} alt="" />
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