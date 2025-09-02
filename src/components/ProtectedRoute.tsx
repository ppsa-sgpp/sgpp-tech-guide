import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Redirect } from '@docusaurus/router';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <BrowserOnly fallback={<div>Carregando...</div>}>
      {() => {
        const isAuthenticated = localStorage.getItem('authenticated');
        if (!isAuthenticated) {
          return <Redirect to="/sgpp-tech-guide/login" />;
        }
        return <>{children}</>;
      }}
    </BrowserOnly>
  );
}

export default ProtectedRoute;
