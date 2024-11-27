import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/sgpp-tech-guide/blog',
    component: ComponentCreator('/sgpp-tech-guide/blog', 'bbe'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/archive',
    component: ComponentCreator('/sgpp-tech-guide/blog/archive', 'dd5'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/authors',
    component: ComponentCreator('/sgpp-tech-guide/blog/authors', 'ae8'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/sgpp-tech-guide/blog/authors/all-sebastien-lorber-articles', 'ba7'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/authors/yangshun',
    component: ComponentCreator('/sgpp-tech-guide/blog/authors/yangshun', '73d'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/first-blog-post',
    component: ComponentCreator('/sgpp-tech-guide/blog/first-blog-post', 'caf'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/long-blog-post',
    component: ComponentCreator('/sgpp-tech-guide/blog/long-blog-post', 'b7e'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/mdx-blog-post',
    component: ComponentCreator('/sgpp-tech-guide/blog/mdx-blog-post', '3de'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/tags',
    component: ComponentCreator('/sgpp-tech-guide/blog/tags', '16f'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/tags/docusaurus',
    component: ComponentCreator('/sgpp-tech-guide/blog/tags/docusaurus', '0b6'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/tags/facebook',
    component: ComponentCreator('/sgpp-tech-guide/blog/tags/facebook', '56f'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/tags/hello',
    component: ComponentCreator('/sgpp-tech-guide/blog/tags/hello', '3fd'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/tags/hola',
    component: ComponentCreator('/sgpp-tech-guide/blog/tags/hola', 'd5b'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/blog/welcome',
    component: ComponentCreator('/sgpp-tech-guide/blog/welcome', 'f8b'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/markdown-page',
    component: ComponentCreator('/sgpp-tech-guide/markdown-page', '064'),
    exact: true
  },
  {
    path: '/sgpp-tech-guide/docs',
    component: ComponentCreator('/sgpp-tech-guide/docs', 'f75'),
    routes: [
      {
        path: '/sgpp-tech-guide/docs',
        component: ComponentCreator('/sgpp-tech-guide/docs', '8ea'),
        routes: [
          {
            path: '/sgpp-tech-guide/docs',
            component: ComponentCreator('/sgpp-tech-guide/docs', '4d5'),
            routes: [
              {
                path: '/sgpp-tech-guide/docs/ibm-baw/client-side-exception-wrapper',
                component: ComponentCreator('/sgpp-tech-guide/docs/ibm-baw/client-side-exception-wrapper', '5c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/sgpp-tech-guide/docs/ibm-baw/servico-persistir-general-purpose-entity',
                component: ComponentCreator('/sgpp-tech-guide/docs/ibm-baw/servico-persistir-general-purpose-entity', '1bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/sgpp-tech-guide/docs/ibm-baw/servico-rest-assincrono',
                component: ComponentCreator('/sgpp-tech-guide/docs/ibm-baw/servico-rest-assincrono', '48e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/sgpp-tech-guide/docs/ibm-baw/servicos-rest',
                component: ComponentCreator('/sgpp-tech-guide/docs/ibm-baw/servicos-rest', '918'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/sgpp-tech-guide/docs/intro',
                component: ComponentCreator('/sgpp-tech-guide/docs/intro', 'a4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/sgpp-tech-guide/docs/sgpp-services/servico_criacao_planilha_classe',
                component: ComponentCreator('/sgpp-tech-guide/docs/sgpp-services/servico_criacao_planilha_classe', 'dfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/sgpp-tech-guide/',
    component: ComponentCreator('/sgpp-tech-guide/', '69e'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
