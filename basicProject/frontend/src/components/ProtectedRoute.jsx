import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const { loggedIn, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!loggedIn) return <Navigate to="/login" replace />;

    return children;

};

export default ProtectedRoute