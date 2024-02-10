import { faBell, faChartSimple, faCircleStop, faTicket, faTrainSubway, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/logo/images.png'
import { UserContext } from '../../AuthProvider/UserProvider';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@mui/material';

const navList = [
    {
        name: "Dashboard",
        icon: faChartSimple,
        to: "dashboard"
    },
    {
        name: "User",
        icon: faUsers,
        to: "users",
    },
    // {
    //     name: "Train List",
    //     icon: faTrainSubway,
    //     to: "train-list"
    // },
    {
        name: "Station List",
        icon: faCircleStop,
        to: "station-list"
    },
    {
        name: "Tickets List",
        icon: faTicket,
        to: "tickets"
    },
    {
        name: "Refund Request",
        icon: faTicket,
        to: "refund-tickets"
    },
]

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const { numberOfRefund, setNumberOfRefund } = useState(0);

    // Station List data
    useEffect(() => {
        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const response = await axios.get('http://localhost:3001/api/v1//numof-cancel-tickets', { withCredentials: true });
                console.log(response.data);
                setNumberOfRefund(response.data);
            } catch (error) {
                // setError(error.message || 'An error occurred');
                console.log("Error :", error)
            }
        }
        fetchData()
    }, [setNumberOfRefund])

    console.log(numberOfRefund);

    return (
        <>
            <section className='grid grid-cols-12 gap-8 min-h-screen'>
                <aside className='col-span-3 px-4 space-y-6 shadow-md h-full'>
                    <figure className='h-16'>
                        <img className='h-full w-auto object-contain' src={logo} alt="" />
                    </figure>
                    <div className='p-4 flex gap-3 items-center bg-[#edeff1] rounded-md'>
                        <figure className='h-12 w-12'>
                            <img className='object-contain rounded-full' src={user.image} alt="Avatar" />
                        </figure>
                        <h3 className='text-base font-medium'>{user.name}</h3>
                    </div>
                    <div className='space-y-1'>
                        {
                            navList.map((item, i) => (<NavLink
                                key={i}
                                to={item?.to}
                                className={({ isActive }) => isActive ? "p-4 flex gap-3 items-center bg-blue-50 rounded-md text-blue-500" : "p-4 flex gap-3 items-center"}
                            >
                                <FontAwesomeIcon className='text-xl' icon={item?.icon} />
                                <p className='text-lg'>{item?.name}</p>
                                {
                                    item.to === "refund-tickets" ? (<Badge color="secondary" badgeContent={numberOfRefund}>
                                        <FontAwesomeIcon icon={faBell} />
                                    </Badge>) : ""
                                }

                            </NavLink>))
                        }
                    </div>
                </aside>
                <aside className='col-span-9 md:mr-8'>
                    <Outlet />
                </aside>
            </section>
        </>
    );
};

export default Dashboard;