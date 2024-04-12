import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
    return  navigate('/');
    }
  }, [token, navigate]);

  return token ? null : children;
};

export default PublicRoute;
