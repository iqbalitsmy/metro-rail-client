import React from 'react';

const Link = ({ route }) => {
    return (
        <li className='p-2'>
            <a 
            className='hover:border-b-2 border-black pb-2 md:p-3 transition-all' 
            href={route.path}
            >
                {route.name}
                </a>
        </li>
    );
};

export default Link;