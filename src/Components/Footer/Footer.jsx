import React from 'react';
import logo from '../../assets/logo/dhaka_metro_rail -logos_black.png'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <section className=''>
            <hr className='border-t-4 border-green-600' />
            <div className='container mx-auto flex flex-col md:flex-row md:justify-evenly md:text-left gap-8 py-10'>
                <aside className='text-center'>
                    <div className='flex items-center justify-center md:justify-start'>
                        <figure className='h-28 w-28'>
                            <img className='h-full w-full object-contain' src={logo} alt="" />
                        </figure>
                        <h1 className='text-xl font-extrabold text-green-800'>Dhaka <br /> Railway</h1>
                    </div>
                    <div className='text-lg'>
                        <p className='mb-4'>
                            201 S. Grand Ave., 1st Floor <br />New York City, NY 28020
                        </p>
                        <p>
                            +1 (772) 290-2999
                        </p>
                    </div>
                </aside>
                <aside className='text-center'>
                    <h4 className='text-lg font-semibold mb-4 text-green-800'>Main Navigation</h4>
                    <div className='flex flex-col text-lg gap-2'>
                        <Link>Home</Link>
                        <Link>Login</Link>
                        <Link>Register</Link>
                        <Link>Train Information</Link>
                        <Link>Contact Us</Link>
                    </div>
                </aside>
                <aside className='text-center md:text-left'>
                    <h4 className='text-lg font-semibold mb-4 text-green-800'>Newsletter</h4>
                    <div className='flex items-center justify-center gap-2 mb-4 w-full '>
                        <input
                            className='in-footer rounded pl-3 py-1 w-3/5'
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Your email'
                        />
                        <button className='bg-gray-700 hover:bg-black font-bold text-white rounded py-1 px-1 md:px-2 w-auto' type="submit">SUBSCRIBE</button>
                    </div>
                    <div className='flex justify-center md:justify-start text-3xl gap-4'>
                        <Link>
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Footer;