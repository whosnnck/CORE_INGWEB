import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export const PrivateAdmin = ({ element, isAuthenticated, requiredRol, fallbackPath }) => {
    return isAuthenticated && localStorage.getItem('rol') === requiredRol ? (
      React.cloneElement(element, { key: fallbackPath })
    ) : (
      <Navigate to={fallbackPath} replace />
    );
  };