import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {  
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const baseUrl = useBaseUrl('/docs/intro');
  return (
    <ProtectedRoute>
      <HomepageHeader />
      <Redirect to={baseUrl} />
    </ProtectedRoute>
  );
}
