import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const jwtCookie = Cookies.get('jwt');
                // console.log(jwtCookie)
                if (jwtCookie) {
                    const response = await axios.get('http://localhost:3001/api/v1/me', { withCredentials: true });
                    // console.log(response.data.user);
                    setUser(response.data.user);
                }

            } catch (error) {
                setError(error.message || 'An error occurred');
                console.log("Error :", error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [])

    const userInfo = {
        user,
        isLoading,
        error
    }

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;