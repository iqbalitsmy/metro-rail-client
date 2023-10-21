import React from 'react';
import Navigationbar from '../../Components/Navigationbar/Navigationbar';
import Footer from '../../Components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <header className='sticky top-0 z-50 bg-white'>
                <Navigationbar></Navigationbar>
            </header>
            <main className='relative'>
                <Outlet></Outlet>
            </main>
            <footer className='bg-[#f6f9ff]'>
                <Footer></Footer>
            </footer>

        </>
    );
};

export default Main;