import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const {loggedIn} =  useAuth();
    const navigate = useNavigate()
  return (
    
  )
}

export default ProtectedRoute