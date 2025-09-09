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

// Função para extrair o heading 1 de um arquivo Markdown
function extractHeading1(filePath: string): string | null {
  const content = fs.readFileSync(filePath, 'utf8');
  const normalizedContent = content.replace(/^\uFEFF/, '').trim();
  const match = normalizedContent.match(/^# (.+)/m);
  if (match && match[1]) {
    return match[1].trim();
  } else {
    console.log(filePath);
  }
  return null;
}

function toPosix(p: string) {
  // garante links markdown com "/" mesmo no Windows
  return p.replace(/\\/g, "/");
}

function sortAdrNames(dir: string, names: string[]): string[] {
  const num = (s: string) => {
    const m = s.match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : NaN;
  };
  const ymd = (s: string) => {
    const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
  };

  return [...names].sort((a, b) => {
    const na = num(a), nb = num(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;

    const da = ymd(a), db = ymd(b);
    if (da && db) return da.localeCompare(db);

    const sa = fs.statSync(path.join(dir, a)).mtimeMs;
    const sb = fs.statSync(path.join(dir, b)).mtimeMs;
    return sa - sb;
  });
}

// Função para construir o Markdown
function buildMarkdown(dirPath: string, basePath = '', level = 3): string {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  // Processa os arquivos na raiz
  let docsInRoot = entries
    .filter(entry => entry.isFile() 
      && !entry.name.startsWith("adrs")
      && entry.name.endsWith('.md') 
      && entry.name !== 'intro.md'
    )
    .map(entry => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);
      const fileName = entry.name.replace(/\.md$/, '');
      const heading = extractHeading1(fullPath) || capitalizeWords(fileName.replace(/-/g, ' '));
      return `- [${heading}](docs/${relativePath})`;
    })
    .filter(Boolean);

  // Processa as subcategorias
  const categories = entries
    .filter(entry => entry.isDirectory() && entry.name !== 'img')
    .map(entry => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.name === '+confidential') {
        return buildMarkdown(fullPath, relativePath);
      }

      if(entry.name === "adrs") {
        const adrFiles = fs.readdirSync(fullPath, { withFileTypes: true})
          .filter(f => f.isFile() && f.name.endsWith(".md") && f.name !== "intro.md")
          .map(f => f.name);

        if(adrFiles.length === 0) return null;
        
        const sorted = sortAdrNames(fullPath, adrFiles);
        const last5 = sorted.slice(-5);

        const list = last5.map(name => {
          const full = path.join(fullPath, name);
          const rel = toPosix(path.posix.join(relativePath, name));
          const fileName = name.replace(/\.md$/, "");
          const heading = extractHeading1(full) || capitalizeWords(fileName.replace(/-/g, " "));
          return `- [${heading}](docs/${rel})`;
        }).join("\n");

        const header = `${"#".repeat(level)} Últimas ADRs`;
        return `${header}\n${list}`;
      }

      const items = buildMarkdown(fullPath, relativePath, level + 1);
      if (!items) return null;

      const header = `${'#'.repeat(level)} ${capitalizeWords(entry.name.replace(/-/g, ' '))}`;
      return `${header}\n${items}`;
    })
    .filter(Boolean) as String[];

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
