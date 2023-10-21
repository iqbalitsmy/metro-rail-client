import React from 'react';
import SearchTrain from '../../Components/SearchTrain/SearchTrain';
import BookingSteps from '../../Components/BookingSteps/BookingSteps';
import InstructionsSection from '../../Components/InstructionsSection/InstructionsSection';
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod';

const Home = () => {
    return (
        <>
            <SearchTrain></SearchTrain>
            <BookingSteps></BookingSteps>
            <InstructionsSection></InstructionsSection>
            <PaymentMethod></PaymentMethod>
        </>
    );
};

export default Home;