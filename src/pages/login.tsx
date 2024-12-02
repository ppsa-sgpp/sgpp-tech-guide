import React from 'react';
import Login from '../components/Login';
import { Redirect } from '@docusaurus/router';

export default function LoginPage(): JSX.Element {
  const handleLogin = () => {
    window.location.href = '/sgpp-tech-guide/';
  };

  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  if (isAuthenticated) {
    return <Redirect to="/sgpp-tech-guide/" />;
  }

  return <Login onLogin={handleLogin} />;
}
