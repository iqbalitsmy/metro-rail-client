import React, { useContext } from 'react';
import { UserContext } from '../../AuthProvider/UserProvider';


const NavLink = ({ route }) => {
    // const { userInfo } = useContext(UserContext);
    // console.log(userInfo);
    return (
        <li className='p-2'>
            <a
                className='h-full hover:bg-white hover:text-black pb-2 md:p-3  hover:border-b-2 border-white transition-all'
                href={route?.path}
            >
                {route?.name}
            </a>
        </li>
    );
};

export default NavLink;