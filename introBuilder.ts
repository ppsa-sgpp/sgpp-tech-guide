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
function buildMarkdown(dirPath: string, basePath = '', indent = ''): string {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  // Processa os arquivos na raiz
  const docsInRoot = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith('.md'))
    .filter((entry) => entry.name !== 'intro.md')
    .map((entry) => {
      console.log(entry.name)
      const relativePath = path.join(basePath, entry.name);
      const fileName = entry.name.replace(/\.md$/, '');
      return `${indent}-   [${capitalizeWords(fileName.replace(/-/g, ' '))}](docs/${relativePath})`;
    });
    console.log

  // Processa as subcategorias
  const categories = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry => entry.name !== 'img'))
    .map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

      const items = buildMarkdown(fullPath, relativePath, `${indent}    `);

      if (items) {
        return `${indent}#### ${capitalizeWords(entry.name.replace(/-/g, ' '))}\n${items}`;
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

### Elementos de Construção
${sidebarContent}`;

const outputPath = path.resolve(__dirname, 'docs', 'intro.md');
fs.writeFileSync(outputPath, intro, 'utf8');
}
