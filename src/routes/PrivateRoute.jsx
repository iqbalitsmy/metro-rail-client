import { useContext } from 'react';
import { UserContext } from '../AuthProvider/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(UserContext);
    const location = useLocation();
    console.log(user, isLoading)

    if (isLoading) {
        return <h1>Loading .......</h1>
    }
    if (user?.email) {
        return children;
    }

    return (<Navigate to={'/login'} state={{ from: location }} replace></Navigate>);
};

export default PrivateRoute;