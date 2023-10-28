import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const a = 5;
    // const [userInfo, setUserInfo] = useState({});

    // Set up an Axios instance with credentials
    // const axiosInstance = axios.create({    //Axios Instance will include cookies in the request
    //     withCredentials: true,
    // });

    useEffect(() => {

        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const data = await axios.get('http://localhost:3000/api/v1/me', {
                    credentials: 'include', // Include credentials (cookies) in the request
                })
                console.log(data)
            } catch (error) {
                console.log("Error :", error)
            }
        }
        fetchData()
    }, [])

    // // Make a GET request with cookies
    // axiosInstance.get('http://localhost:5000/api/v1/me')
    //     .then(response => {
    //         console.log(response);
    //         setUserInfo(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });

    return (
        <UserContext.Provider value={a}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;