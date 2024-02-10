import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Cancel = () => {
    const location = useLocation();

    return (<Navigate state={{ from: location }} to={'/train-information'} replace></Navigate>);
};

export default Cancel;