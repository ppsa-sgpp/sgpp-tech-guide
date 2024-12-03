import path from 'path';
import { buildIntro } from './introBuilder';
import { buildSidebar } from './buildSidebar';
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Cria documento de introdução
buildIntro();

// Caminho da pasta de documentos
let docsPath = path.resolve(__dirname, 'docs');

// Cria o objeto de sidebars dinamicamente
const sidebars: SidebarsConfig = {
  tutorialSidebar: buildSidebar(docsPath),
};

export default sidebars;
