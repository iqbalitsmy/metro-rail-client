import React from 'react';
import SearchTrain from '../../Components/SearchTrain/SearchTrain';
import BookingSteps from '../../Components/BookingSteps/BookingSteps';
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod';
import Facilities from '../../Components/Facilities/Facilities';
import Accessibility from '../../Components/Accessibility/Accessibility';

const Home = () => {
    return (
        <>
            <SearchTrain></SearchTrain>
            <BookingSteps></BookingSteps>
            <Facilities></Facilities>
            <Accessibility></Accessibility>
            <PaymentMethod></PaymentMethod>
        </>
    );
};

export default Home;