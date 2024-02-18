import { useContext, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import NavLink from '../NavLink/NavLink';
import logo from '../../assets/logo/images.png'
import { UserContext } from '../../AuthProvider/UserProvider';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';


const Navigationbar = () => {
    const [drawerOpen, setOpen] = useState(false);
    const { user } = useContext(UserContext);
    // console.log(user)

    // Menu mui
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
        },
    ];

    const handleLogOut = (async () => {
        // Make a GET request with cookies using fetch
        try {
            const res = await axios.get('http://localhost:3001/api/v1/logout', { withCredentials: true })
            console.log(res)
            Cookies.remove("token");
            window.location.reload();
        } catch (error) {
            console.log("Error :", error)
        }
    })


    return (
        <nav className='shadow-lg mb-10 bg-[#ee0000] px-4 md:px-0'>
            <div className='container mx-auto flex items-center justify-between'>
                <a href='/'>
                    <div className='flex items-center gap-2 py-2'>
                        <figure className='h-16'>
                            <img className='h-full w-auto object-contain' src={logo} alt="" />
                        </figure>
                        <h1 className='text-xl font-extrabold text-white'>Dhaka <br />Metro Rail</h1>
                    </div>
                </a>
                <div className=''>
                    <div onClick={() => setOpen(!drawerOpen)} className="md:hidden cursor-pointer">
                        <span>
                            {
                                drawerOpen === true ? <XMarkIcon className='h-6 w-6'></XMarkIcon>
                                    : <Bars3Icon className='h-6 w-6'></Bars3Icon>
                            }
                        </span>
                    </div>
                    <ul className={`text-base font-bold text-white bg-[#e00] md:pb-0 pb-4 h-full w-full pl-8 md:pl-0 md:flex justify-center lg:gap-8 items-center absolute md:static duration-500 shadow-lg md:shadow-none
                        ${drawerOpen ? 'top-20 right-0' : '-top-60 right-0'}`
                    }>
                        {
                            routes.map(route => {
                                if ((Object.keys(user).length !== 0) && (route.name === 'Login' || route.name === 'Register')) {
                                    return
                                } else {
                                    return (<NavLink
                                        key={route.id}
                                        route={route}
                                    >
                                    </NavLink>)
                                }
                            }
                            )
                        }
                        {
                            (Object.keys(user).length !== 0) &&
                            (<li className='rounded-full bg-slate-100 shadow-lg relative'>
                                <figure
                                    className='h-10 w-10'
                                    aria-controls={drawerOpen ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={drawerOpen ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <img className='object-contain rounded-full' src={user.image} alt="Avatar" />
                                </figure>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>{user.name}</MenuItem>
                                    <MenuItem onClick={handleClose}>{user.email}</MenuItem>
                                    <Link to={'/profile/tickets'}>
                                        <MenuItem onClick={handleClose}>My Tickets</MenuItem>
                                    </Link>
                                    {
                                        user.role === "admin" &&
                                        (<MenuItem onClick={handleClose}>
                                            <Link
                                                to={'/admin/dashboard'}
                                            >
                                                Dashboard
                                            </Link>
                                        </MenuItem>)
                                    }
                                    <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
                                </Menu>
                            </li>)
                        }
                        {/* {
                            (Object.keys(user).length !== 0) &&
                            (<li className='rounded-full bg-slate-100 shadow-lg relative' onClick={() => setimgClick(true)} onMouseLeave={() => setimgClick(false)}>
                                <figure className='h-10 w-10'>
                                    <img className='object-contain rounded-full' src={avatar} alt="Avatar" />
                                </figure>
                                <button
                                    className={`bg-white text-black absolute mb-4 ${imgClick ? 'block' : 'hidden'}`}
                                    onClick={() => handleLogOut()}
                                >
                                    Logout
                                </button>
                            </li>)
                        } */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigationbar;