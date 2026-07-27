# Modelo de Dados

Esta seção documenta o **modelo de dados** do SGPP sob a ótica de entidades de domínio (agregados, documentos MongoDB, value objects e enums), com **diagramas entidade-relacionamento (DER)** em Mermaid.

## Objetivo

- Registrar a estrutura das principais entidades persistidas pelo `sgpp-services`.
- Explicitar composições embutidas, heranças e referências lógicas entre coleções.
- Manter os diagramas versionados como recurso estático reutilizável em `static/der/`.

## Convenções

| Item | Convenção |
| --- | --- |
| Página | Um documento Markdown por entidade agregada (ex.: `remessa-entity.md`) |
| DER embutido | Bloco ` ```mermaid ` com `erDiagram` na própria página |
| DER estático | Arquivo `.mmd` em `static/der/<entidade>.mmd` |
| Coleção MongoDB | Indicada no cabeçalho da página e no diagrama |

## Entidades documentadas

- [ContaCustoOleoEntity](./conta-custo-oleo-entity.md) — agregado da conta de custo em óleo (`conta_custo_oleo_entity`)
- [RemessaEntity](./remessa-entity.md) — agregado de remessas de gastos (`remessa_entity`)
