import React from 'react';

const DashboardCard = ({ item }) => {
    const { name, quantity, path, gStop1, gStop2, id } = item;
    return (
        <>
            <div className='flex items-center justify-center gap-6 rounded-xl shadow-md bg-[#f9fafb] h-48'>
                <div className='text-7xl'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="70"
                        width="70"
                        viewBox="0 0 576 512"
                    >
                        <defs>
                            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: `#${gStop1}` }} />
                                <stop offset="100%" style={{ stopColor: `#${gStop2}` }} />
                            </linearGradient>
                        </defs>

                        <path
                            d={path}
                            fill={`url(#${id})`}
                        />
                    </svg>
                </div>
                <div>
                    <p className='text-2xl font-semibold mb-3'>{quantity}</p>
                    <p className='text-lg font-semibold text-gray-400'>{name}</p>
                </div>
            </div>
        </>
    );
};

export default DashboardCard;