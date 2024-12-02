import React from 'react';
import { Redirect } from '@docusaurus/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  if (!isAuthenticated) {
    return <Redirect to="/sgpp-tech-guide/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
