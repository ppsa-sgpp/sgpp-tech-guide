import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SGPP Docs',
  tagline: 'Documentação do Sistema SGPP',
  favicon: 'img/favicon.ico',
  url: 'https://ppsa-sgpp.github.io',
  baseUrl: '/sgpp-tech-guide/',
  organizationName: 'ppsa-sgpp',
  projectName: 'sgpp-tech-guide',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: ({ docPath }) => {
            if (docPath.startsWith('+confidential/')) {
              let confidentialPath = docPath.replace(/^\+confidential\//, '');
              return `https://github.com/ppsa-sgpp/sgpp-tech-guide-confidential/edit/main/${confidentialPath}`;
            }

            return `https://github.com/ppsa-sgpp/sgpp-tech-guide/edit/main/docs/${docPath}`;
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'SGPP',
      logo: {
        alt: 'SGPP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          href: 'https://github.com/ppsa-sgpp/sgpp-tech-guide',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },    
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} PPSA, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
