import fs from 'fs';
import path from 'path';
import type {
  SidebarsConfig,
  SidebarItem,
  SidebarItemCategory as SidebarCategory,
} from '@docusaurus/plugin-content-docs';

// Define os tipos base para categorias e documentos
type SidebarCategory = {
  type: 'category';
  label: string;
  items: SidebarItem[];
};

type SidebarDoc = string;

type SidebarItem = SidebarCategory | SidebarDoc;

// Função para construir o sidebar
export function buildSidebar(dirPath: string, basePath = ''): SidebarItem[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const isADR = basePath.split(path.sep).includes('adrs');

  // Processa primeiro os arquivos na raiz
  const docsInRoot: SidebarItem[] = entries
    .filter((entry) => entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) )
    .sort((a, b) => {
      if (isADR) {
        const numA = parseInt(a.name.match(/^(\d+)/)?.[1] || '0', 10);
        const numB = parseInt(b.name.match(/^(\d+)/)?.[1] || '0', 10);
        return numB - numA;
      }
      return a.name.localeCompare(b.name);
    })
    .map((entry) => {
      const docId = toDocId(basePath, entry.name);
      return docId;
    });

  // Processa as subcategorias depois
  const categories = entries
    .filter((entry) => entry.isDirectory() && entry.name !== 'img') // Ignora pastas 'img'
    .map((entry) => {

      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.name === '+confidential') {
        return buildSidebar(fullPath, relativePath);
      }

      const items = buildSidebar(fullPath, relativePath);

      // Retorna a categoria apenas se tiver itens
      if (items.length > 0) {
        return {
          type: 'category',
          label: capitalizeWords(entry.name.replace(/-/g, ' ')), // Capitaliza as palavras
          items,
        };
      }
      return null; // Ignora categorias vazias
    })
    .filter(Boolean) as SidebarCategory[];

  // Combina os documentos na raiz primeiro e depois as categorias
  return [...docsInRoot, ...categories];
}

function toDocId(basePath: string, fileName: string): string {
  const nameNoExt = fileName.replace(/\.(md|mdx)$/, '');

  // Detecta se estamos dentro de 'adr' (direto ou em subpastas)
  const isADR = basePath.split(path.sep).includes('adrs');

  if (isADR) {
    // Remove prefixo numérico (1+ dígitos) seguido de hífen, se existir
    const cleaned = nameNoExt.replace(/^\d+-/, '');
    return path.posix.join(norm(basePath), cleaned);
  }

  // Padrão para outros docs
  return path.posix.join(norm(basePath), nameNoExt);
}

/** Normaliza separador para POSIX (Docusaurus usa ids com /) */
function norm(p: string): string {
  return p.split(path.sep).join('/');
}

function capitalizeWords(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}