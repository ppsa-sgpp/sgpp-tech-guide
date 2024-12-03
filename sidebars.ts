import path from 'path';
import { buildSidebar } from './buildSidebar'; // Ajuste o caminho conforme necessário
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Caminho da pasta de documentos
let docsPath = path.resolve(__dirname, 'docs');

// Cria o objeto de sidebars dinamicamente
const sidebars: SidebarsConfig = {
  tutorialSidebar: buildSidebar(docsPath),
};

export default sidebars;
