import React from 'react';
import DefaultLayout from '@theme-original/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Layout(props) {
  return (
    <ProtectedRoute>
      <DefaultLayout {...props} />
    </ProtectedRoute>
  );
}
