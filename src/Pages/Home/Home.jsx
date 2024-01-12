import React from 'react';
import SearchTrain from '../../Components/SearchTrain/SearchTrain';
import BookingSteps from '../../Components/BookingSteps/BookingSteps';
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod';
import Facilities from '../../Components/Facilities/Facilities';
import Accessibility from '../../Components/Accessibility/Accessibility';
import HomeBanner from '../../Components/HomeBanner/HomeBanner';

const Home = () => {
    return (
        <>
            <section className='container mx-auto mb-16 md:flex justify-center items-center gap-4 px-4 md:px-0'>
                <SearchTrain></SearchTrain>
                <HomeBanner></HomeBanner>
            </section>
            <BookingSteps></BookingSteps>
            <Facilities></Facilities>
            <Accessibility></Accessibility>
            <PaymentMethod></PaymentMethod>
        </>
    );
};

export default Home;