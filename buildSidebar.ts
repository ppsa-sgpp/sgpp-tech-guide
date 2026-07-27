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
      // intro.md sempre no topo da categoria (seção de abertura)
      const aIntro = isIntroFile(a.name) ? 0 : 1;
      const bIntro = isIntroFile(b.name) ? 0 : 1;
      if (aIntro !== bIntro) {
        return aIntro - bIntro;
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

  // Docusaurus remove prefixos numéricos (ex.: 01-foo.md → foo) do id/slug.
  // O prefixo serve só para ordenação no filesystem; o sidebar precisa usar o id real.
  const cleaned = nameNoExt.replace(/^\d+-/, '');
  return path.posix.join(norm(basePath), cleaned);
}

/** intro.md / intro.mdx — página de abertura da pasta */
function isIntroFile(fileName: string): boolean {
  return /^(\d+-)?intro\.(md|mdx)$/i.test(fileName);
}

/** Normaliza separador para POSIX (Docusaurus usa ids com /) */
function norm(p: string): string {
  return p.split(path.sep).join('/');
}

function capitalizeWords(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}