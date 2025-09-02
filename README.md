# SGPP Tech Guide & Architecture

Este repositório reúne a **documentação técnica** e a **arquitetura oficial** do Sistema de Gestão de Partilha de Produção (SGPP).

Ele combina:
- O **guia técnico (Tech Guide)** com padrões, building blocks e boas práticas já estabelecidas.
- O **repositório central de arquitetura**, incluindo:
  - **ADRs (Architecture Decision Records)** versionados e auditáveis.
  - **Diagramas de Arquitetura** em Structurizr DSL, PlantUML e BPMN.
  - Publicação automática em site Docusaurus para consulta navegável.

---

## 📚 Estrutura de Conteúdo

- **Documentação técnica**  
  - Documento de Arquitetura  
  - Building Blocks (IBM BAW, serviços, templates, etc.)  
  - Definições Arquiteturais  
  - Style Guides (Java, entre outros)

- **Arquitetura**  
  - `adr/` – Registros de Decisão de Arquitetura  
  - `diagrams/` – Diagramas em Structurizr DSL, PlantUML e BPMN  
  - Publicação no Docusaurus em `docs/adr/` e `docs/architecture/`

---

## 🧭 ADRs (Architecture Decision Records)

As **decisões arquiteturais** são registradas como ADRs em Markdown.

- Cada ADR possui status (`Proposed`, `Accepted`, `Rejected`, `Superseded`).
- São aprovados via **Pull Request**.
- Aparecem automaticamente como páginas do Docusaurus em `docs/adr/`.
- Os diagramas podem conter links diretos para ADRs relevantes.

👉 Para criar um novo ADR, use o [template disponível](adr/0000-template.md).

---

## 🖼️ Diagramas

Os diagramas da arquitetura são mantidos em `diagrams/`:

- **Structurizr DSL / C4** – visão de contexto, containers e componentes.  
- **PlantUML** – diagramas de sequência e detalhamentos técnicos.  
- **BPMN.io** – fluxos de processo relacionados ao IBM BAW.  

No pipeline de CI, esses diagramas são renderizados em SVG e publicados em `docs/architecture/`.

---

## 🚀 Publicação e Automação

- **GitHub Actions** valida ADRs e gera os diagramas em cada PR.
- A branch `main` publica automaticamente o site do Docusaurus no GitHub Pages.  
- O site está disponível em:  
  👉 [https://ppsa-sgpp.github.io/sgpp-tech-guide](https://ppsa-sgpp.github.io/sgpp-tech-guide)

---

## 🤝 Contribuindo

1. Crie uma branch para sua alteração.  
2. Se adicionar ou alterar uma decisão arquitetural, crie/edite um ADR em `adr/`.  
3. Abra um Pull Request.  
   - Um ADR só é aceito após aprovação de pelo menos 1 arquiteto ou responsável técnico.  
4. Ao ser aceito, ele será publicado automaticamente no Docusaurus.

---

## 📖 Referências

- [TOGAF – Architecture Content Framework](https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap31.html)  
- [ADR – Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html)  
- [Structurizr DSL](https://structurizr.com/dsl)  
- [PlantUML](https://plantuml.com/)  
- [BPMN.io](https://bpmn.io/)  

---
