import fs from 'fs';
import path from 'path';

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

// Função para construir o Markdown
function buildMarkdown(dirPath: string, basePath = '', level = 3): string {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  // Processa os arquivos na raiz
  const docsInRoot = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'intro.md')
    .map(entry => {
      const relativePath = path.join(basePath, entry.name);
      const fileName = entry.name.replace(/\.md$/, '');
      return `- [${capitalizeWords(fileName.replace(/-/g, ' '))}](docs/${relativePath})`;
    });

  // Processa as subcategorias
  const categories = entries
    .filter(entry => entry.isDirectory() && entry.name !== 'img')
    .map(entry => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

      const items = buildMarkdown(fullPath, relativePath, level + 1);

      if (items) {
        const header = `${'#'.repeat(level)} ${capitalizeWords(entry.name.replace(/-/g, ' '))}`;
        return `${header}\n${items}`;
      }
      return null;
    })
    .filter(Boolean);

  return [...categories, ...docsInRoot].join('\n');
}

// Função para gerar o Markdown completo
export function buildIntro() {
  const docsPath = path.resolve(__dirname, 'docs');
  const sidebarContent = buildMarkdown(docsPath);

  const intro = `---
sidebar_position: 1
---

# Documentação
<!-- Documentação da arquitetura e padrões de desenvolvimento do sistema SGPP. -->

${sidebarContent}`;

  const outputPath = path.resolve(__dirname, 'docs', 'intro.md');
  fs.writeFileSync(outputPath, intro, 'utf8');
}
