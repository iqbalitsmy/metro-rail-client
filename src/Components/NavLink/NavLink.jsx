import React, { useContext } from 'react';
import { UserContext } from '../../AuthProvider/UserProvider';


const NavLink = ({ route }) => {
    // const { userInfo } = useContext(UserContext);
    // console.log(userInfo);
    return (
        <li className='p-2'>
            <a
                className='hover:border-b-2 border-black pb-2 md:p-3 transition-all'
                href={route?.path}
            >
                {route?.name}
            </a>
        </li>
    );
};

export default NavLink;