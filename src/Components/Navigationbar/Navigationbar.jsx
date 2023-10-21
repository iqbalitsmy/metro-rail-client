import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from '../Link/Link';
import logo from '../../assets/logo/Dhaka Metro Rail -logos_black.png'

const Navigationbar = () => {
    const [open, setOpen] = useState(false);
    const routes = [
        {
            id: 1,
            name: "Home",
            path: "/"
        },
        {
            id: 2,
            name: "Login",
            path: "login"
        },
        {
            id: 3,
            name: "Register",
            path: "/signup"
        },
        {
            id: 4,
            name: "Train Information",
            path: "/train-information"
        },
        {
            id: 5,
            name: "Contact Us",
            path: "/contact-us"
        }
    ];


    return (
        <nav className='shadow-lg mb-10'>
            <div className='container mx-auto flex items-center justify-between'>
                <a href='/'>
                    <div className='flex items-center'>
                        <figure className='h-20 w-28'>
                            <img className='h-full w-full object-contain' src={logo} alt="" />
                        </figure>
                        <h1 className='text-xl font-extrabold'>Dhaka <br /> Railway</h1>
                    </div>
                </a>
                <div >
                    <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer">
                        <span>
                            {
                                open === true ? <XMarkIcon className='h-6 w-6'></XMarkIcon>
                                    : <Bars3Icon className='h-6 w-6'></Bars3Icon>
                            }
                        </span>
                    </div>
                    <ul className={`text-base font-medium text-gray-500 md:pb-0 pb-4 w-full pl-8 md:pl-0 md:flex justify-center lg:gap-8 items-center absolute md:static duration-500 shadow-lg md:shadow-none bg-white
                ${open ? 'top-20 right-0' : '-top-60 right-0'}`
                    }>
                        {
                            routes.map(route => <Link
                                key={route.id}
                                route={route}
                            >
                            </Link>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigationbar;