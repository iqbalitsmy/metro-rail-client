import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faShieldHalved, faVideo, faWalkieTalkie } from '@fortawesome/free-solid-svg-icons';

const Facilities = () => {

    return (
        <section className='container mx-auto mb-20 lg:w-8/12'>
            <h1 className='text-3xl font-bold mb-4'>Facilities & Equipment</h1>
            <p className='text-[#53565a] mb-5'>Here is all the information you need to know about the facilities and equipment while you are on-board the Metro.</p>
            <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-5'>
                <div className='flex gap-5'>
                    <div>
                        <div className='h-12 w-14 text-[#13258c]'>
                            <FontAwesomeIcon className='h-full w-auto' icon={faVideo} />
                        </div>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>3000+ CCTVs</h3>
                        <p className='text-[#53565a]'>Over 3000 CCTVs in trains and stations to monitor any security infringements on the trains.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-12 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faShieldHalved} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Dedicated Metro Police</h3>
                        <p className='text-[#53565a]'>Dedicated Metro Police force to enforce rules</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-12 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faPhoneVolume} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Emergency Call Box</h3>
                        <p className='text-[#53565a]'>Emergency Call Box (ECB) available in each train and station.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-14 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faWalkieTalkie} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Radio Link</h3>
                        <p className='text-[#53565a]'>Integrated radio system between the Metro and emergency services.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Facilities;