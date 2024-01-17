import { faChartSimple, faTrainSubway, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/logo/images.png'

const navList = [
    {
        name: "Dashboard",
        icon: faChartSimple,
        to: ""
    },
    {
        name: "User",
        icon: faUsers,
        to: "user",
    },
    {
        name: "Train List",
        icon: faTrainSubway,
        to: "train-list"
    },
    {
        name: "Add Train",
        icon: faTrainSubway,
        to: "add-train"
    },
]

const Dashboard = () => {

    return (
        <>
            <section className='grid grid-cols-12 gap-8 min-h-screen'>
                <aside className='col-span-3 px-4 space-y-6 shadow-md h-full'>
                    <figure className='h-16'>
                        <img className='h-full w-auto object-contain' src={logo} alt="" />
                    </figure>
                    <div className='p-4 flex gap-3 items-center bg-[#edeff1] rounded-md'>
                        <figure className='h-12 w-12'>
                            <img className='object-contain rounded-full' src="https://cdn-icons-png.flaticon.com/512/3641/3641963.png" alt="Avatar" />
                        </figure>
                        <h3 className='text-base font-medium'>Jaydon Frankie</h3>
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