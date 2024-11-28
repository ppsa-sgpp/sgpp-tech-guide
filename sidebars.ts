import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
 const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro'
    },
    {
      type: 'category',
      label: 'Elmentos de Construção',
      items: [
        {
          type: 'category',
          label: 'IBM BAW',
          items: [
            'ibm-baw/servicos-rest',
            'ibm-baw/servico-rest-assincrono',
            'ibm-baw/client-side-exception-wrapper',
            'ibm-baw/servico-persistir-general-purpose-entity'
          ],
        },
        {
          type: 'category',
          label: 'Java',
          items: [
            {
              type: 'category',
              label: 'SGPP Services',
              items: [
                'sgpp-services/servico_criacao_planilha_classe'
              ],
            }
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guias de Estilo',
      items: [
        'guia-estilo/java'
      ]
    }
  ],
};

export default sidebars;

