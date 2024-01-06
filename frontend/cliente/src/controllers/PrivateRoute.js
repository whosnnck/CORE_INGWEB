import React from 'react';
import { Route, Navigate } from 'react-router-dom';


export const PrivateRoute = ({ element, isAuthenticated, fallbackPath }) => {
    return isAuthenticated ? (
      React.cloneElement(element, { key: fallbackPath })
    ) : (
      <Navigate to={fallbackPath} replace />
    );
  };