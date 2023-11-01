import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faElevator, faSignsPost, faTriangleExclamation, faWheelchair } from '@fortawesome/free-solid-svg-icons';


const Accessibility = () => {
    return (
        <section className='container mx-auto mb-16 lg:w-8/12'>
            <h1 className='text-3xl font-bold mb-4'>Accessibility</h1>
            <p className='text-[#53565a] mb-4'>Convenience for the commuters has always been a prime focus of the Dhaka Metro service, and in that regard, below are the accessibility services that are available for the metro users:</p>
            <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-5'>
                <div className='flex gap-5'>
                    <div>
                        <div className='h-12 w-14 text-[#13258c]'>
                            <FontAwesomeIcon className='h-full w-auto' icon={faWheelchair} />
                        </div>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Wheelchair Access</h3>
                        <p className='text-[#53565a]'>Dedicated spaces for wheelchair users on all trains.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-12 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faTriangleExclamation} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Platform Alerts</h3>
                        <p className='text-[#53565a]'>Platform alerts such as audible beeps when doors open and close and corresponding flashing light signals.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-12 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faSignsPost} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Tactile Guidance Path</h3>
                        <p className='text-[#53565a]'>Contrasting tactile guidance path for those with difficulty in seeing.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-14 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faElevator} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Lift Access</h3>
                        <p className='text-[#53565a]'>Lift access available to all metro station levels.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='h-14 w-14 text-[#13258c]'>
                        <FontAwesomeIcon className='h-full w-auto' icon={faCircleInfo} />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Informative Displays</h3>
                        <p className='text-[#53565a]'>Information displayed on screens throughout trains and stations.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accessibility;