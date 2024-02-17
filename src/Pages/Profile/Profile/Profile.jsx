import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../../AuthProvider/UserProvider';

const Profile = () => {
    const { user } = useContext(UserContext);
    return (
        <section className='container mx-auto flex sm:flex-col md:flex-row gap-4 min-h-screen mb-20'>
            <aside>
                <div className='bg-white shadow-lg p-4 rounded-md'>
                    <figure className='mb-4'>
                        <img src={user.image} className='object-contain rounded-md max-h-72 w-full' alt="image" />
                    </figure>
                    <div className='text-gray-600 text-center'>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            </aside>
            <aside className='grow'>
                <Outlet></Outlet>
            </aside>
        </section>
    );
};

export default Profile;