import fs from 'fs';
import path from 'path';

// Define os tipos base para categorias e documentos
type SidebarCategory = {
  type: 'category';
  label: string;
  items: SidebarItem[];
};

type SidebarDoc = string;

type SidebarItem = SidebarCategory | SidebarDoc;

// Função para capitalizar palavras
function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Função para construir o sidebar
export function buildSidebar(dirPath: string, basePath = ''): SidebarItem[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  // Processa primeiro os arquivos na raiz
  const docsInRoot = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const relativePath = path.join(basePath, entry.name);
      return relativePath.replace(/\.md$/, ''); // Remove a extensão .md
    });

  // Processa as subcategorias depois
  const categories = entries
    .filter((entry) => entry.isDirectory() && entry.name !== 'img') // Ignora pastas 'img'
    .map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

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
