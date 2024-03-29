import search from '../../assets/home/bookingSteps/search.svg'
import select from '../../assets/home/bookingSteps/select.svg'
import pay from '../../assets/home/bookingSteps/pay.svg'


const BookingSteps = () => {
    return (
        <section className='mb-16 container mx-auto flex flex-col md:flex-row justify-around items-center gap-8'>
            <div>
                <figure className='h-48'>
                    <img className='h-full w-auto' src={search} alt="" />
                </figure>
                <div>
                    <h2 className='text-3xl font-bold mb-4'>Search</h2>
                    <p className='text-gray-600'>Choose your origin, destination, <br />journey dates and search for trains</p>
                </div>
            </div>
            <div>
                <figure className='h-48'>
                    <img className='h-full w-auto' src={select} alt="" />
                </figure>
                <div>
                    <h2 className='text-3xl font-bold mb-4'>Select</h2>
                    <p className='text-gray-600'>Select your desired trip and choose <br />your seats</p>
                </div>
            </div>
            <div>
                <figure className='h-48'>
                    <img className='h-full w-auto' src={pay} alt="" />
                </figure>
                <div>
                    <h2 className='text-3xl font-bold mb-4'>Pay</h2>
                    <p className='text-gray-600'>Pay for the tickets via Debit / Credit <br />Cards or MFS</p>
                </div>
            </div>
        </section>
    );
};

export default BookingSteps;