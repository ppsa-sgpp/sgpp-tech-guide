# RemessaEntity

🔍️ **Módulo:** `sgpp-services`  
📦️ **Pacote:** `sgpp.services.remessa`  
🗄️ **Coleção MongoDB:** `remessa_entity`  
🧬 **Ascendência:** `sgpp.services.common.BaseEntity`  
🏷️ **Anotações:** `@Document`, `@QueryEntity`, `@Data`, `@EqualsAndHashCode(callSuper = true)`

---

## Visão geral

`RemessaEntity` é o **agregado raiz** do domínio de remessas de gastos no SGPP. Representa uma remessa de custos em óleo associada a um contrato CPP, campo, exercício/período e fase do processo (MEN → FISC).

Os gastos (`GastoEntity`) e o status de envio de documentos ao Alice (`StatusEnvioDocumentoAlice`) são **embutidos** no documento MongoDB. Especializações temporárias e derivadas reutilizam o mesmo modelo via herança.

| Aspecto | Detalhe |
| --- | --- |
| Persistência | MongoDB — documento único por remessa |
| Identificação de negócio | `ChaveRemessa` (`remessa`, `contratoCPP`, `campo`, `mesAnoReferencia`) |
| Origem / patamar | `OrigemDoGastoEnum` define se o gasto é compartilhado e o patamar numérico da remessa |
| Ballot de validação | Referência lógica via `idBallotValidacao` → `ListaBallotEntity` |

---

## Diagrama Entidade-Relacionamento (DER)

O diagrama abaixo modela `RemessaEntity` e as classes/coleções mais diretamente relacionadas (composição embutida, herança e referências lógicas).

> 📎 **Recurso estático:** o mesmo diagrama Mermaid está versionado em [`/der/remessa-entity.mmd`](/der/remessa-entity.mmd) (`static/der/remessa-entity.mmd`).

```mermaid
erDiagram
    BASE_ENTITY {
        string id PK "MongoDB @Id"
        long version "Controle de concorrência"
    }

    REMESSA_ENTITY {
        string id PK "herdado de BaseEntity"
        long version "herdado de BaseEntity"
        integer exercicio
        integer periodo
        string contratoCPP
        string campo
        string etapa
        string processoAdministrativo
        string faseRemessa "valores de FaseRemessaEnum"
        integer remessa "número com patamar de origem"
        integer remessaExposicao "remessa base sem patamar"
        string usuarioResponsavel
        string mesAnoReferencia "MM/yyyy"
        boolean gastosCompartilhados "derivado de origemDoGasto"
        string origemDoGasto "OrigemDoGastoEnum"
        string uep
        string contextId
        string idBallotValidacao FK "ref. ListaBallotEntity"
        boolean revisaoEmAndamento
        boolean reconhecimentoFinalizado
        string dataLancamento
    }

    GASTO_ENTITY {
        integer item
        integer mesCompetencia "apenas HH"
        integer anoCompetencia "apenas HH"
        string classificacaoGastoTipo "NaoHH | HH | H"
        string tipoGasto
        string projeto
        string descricaoProjeto
        string elementoPEP
        string numItemOrcamento1
        string descricaoItemOrcamento1
        string numItemOrcamento2
        string descricaoItemOrcamento2
        string numItemOrcamento3
        string descricaoItemOrcamento3
        string descricaoClasseCusto
        string descricaoMaterial
        string icj
        string contrato
        string pedidoCompras
        string descricaoFornecedor
        double quantidade
        string unidadeMedida
        string descricaoUnidadeMedida
        double valorMoedaOBJReal
        double valorMoedaACC
        string moedaTransacao
        double valorMoedaTrans
        string documentoAprovacao
        string numeroDocumentoAprovacao
        string observacaoGestora
        string observacaoOperador
        string reconhecimentoTipo "ReconhecimentoTipoEnum"
        string dataReconhecimento
        string statusGastoTipo "StatusGastoTipoEnum"
        double valorReconhecido
        double valorNaoReconhecido
        string respostaGestora
        string respostaOperador
        string indicacaoAuditoria
        string responsavel
        string ressalvaAEF
        boolean declaracaoInconsistencia
        string faseRemessa
        string status
        string statusValidacao "StatusValidacaoGastoEnum"
        integer remessa
        string reconhecido "ReconhecidoGastoEnum"
        string dataDecurso
        double valorHC
        double valorCorrigidoHC
        string fase "FaseGastoEnum"
        string dataLancamento
        string faseRespostaGestora
        double valorRecusado
        double valorMoedaOBJRealOriginal
        decimal tractParticipationPercentual
        double valorGlosado
        boolean transferenciaEmAndamento
        string responsavelTransferencia
        double valorDaRevisao
        string direcaoDaRevisao "DirecaoDaRevisaoEnum"
    }

    GLOSA_AUDITORIA_ENTITY {
        double recGlosa
        string glosa
        double valorGlosado
        string nota
        string processoAdm
    }

    STATUS_ENVIO_DOCUMENTO_ALICE {
        string nomeArquivo
        int codigo
        string mensagem
    }

    CHAVE_REMESSA {
        integer numeroRemessa
        string contratoCPP
        string campo
        string mesAnoReferencia
    }

    ORIGEM_DO_GASTO_ENUM {
        int id
        boolean gastoCompartilhado
        int patamar
        string descricao
        string descricaoCompleta
    }

    FASE_REMESSA_ENUM {
        int ordem "MEN ROP RAD REC REV PREV FISC"
    }

    STATUS_GASTO_TIPO_ENUM {
        string value
    }

    RECONHECIMENTO_TIPO_ENUM {
        string name "PARCIAL TOTAL TOTAL_POR_DECURSO_DE_PRAZO TOTAL_AUTOMATICO"
    }

    DIRECAO_DA_REVISAO_ENUM {
        int valor "AUMENTOU DIMINUIU INVARIAVEL"
    }

    REMESSA_TEMP_ENTITY {
        string id PK
        long version "Spring @Version"
    }

    REMESSA_DERIVADA_POR_CAMPO_ENTITY {
        string id PK
        string idRemessaOriginal FK "ref. RemessaEntity"
        decimal fatorAlocacao
    }

    REMESSA_TEMP_FISC_ENTITY {
        string id PK
        long originalVersion
        string processoAdmFisc
        string idRemessaOriginal FK
    }

    REVISAO_REMESSA_ENTITY {
        string inicioRevisao
        string idRemessa FK "ref. RemessaEntity"
        string faseRespostaGestora
        long versionRemessaNoInicioDaRevisao
    }

    LISTA_BALLOT_ENTITY {
        string id PK
        long version
        string usuarioResponsavel
        datetime dataEnvio
    }

    %% Herança / especializações
    BASE_ENTITY ||--|| REMESSA_ENTITY : "extends"
    REMESSA_ENTITY ||--|| REMESSA_TEMP_ENTITY : "extends"
    REMESSA_ENTITY ||--|| REMESSA_DERIVADA_POR_CAMPO_ENTITY : "extends"
    REMESSA_DERIVADA_POR_CAMPO_ENTITY ||--|| REMESSA_TEMP_FISC_ENTITY : "extends"

    %% Composição embutida (documento MongoDB)
    REMESSA_ENTITY ||--o{ GASTO_ENTITY : "gastos 1:N embutido"
    REMESSA_ENTITY ||--o{ STATUS_ENVIO_DOCUMENTO_ALICE : "statusEnvioDocumentoAlice 1:N embutido"
    GASTO_ENTITY ||--o| GLOSA_AUDITORIA_ENTITY : "glosaAuditoria 0..1 embutido"

    %% Value objects / chaves lógicas
    REMESSA_ENTITY ||--|| CHAVE_REMESSA : "getChaveRemessa()"

    %% Enumerações / domínios controlados
    REMESSA_ENTITY }o--|| ORIGEM_DO_GASTO_ENUM : "origemDoGasto"
    REMESSA_ENTITY }o--|| FASE_REMESSA_ENUM : "faseRemessa"
    GASTO_ENTITY }o--|| STATUS_GASTO_TIPO_ENUM : "statusGastoTipo"
    GASTO_ENTITY }o--|| RECONHECIMENTO_TIPO_ENUM : "reconhecimentoTipo"
    GASTO_ENTITY }o--|| DIRECAO_DA_REVISAO_ENUM : "direcaoDaRevisao"
    GASTO_ENTITY }o--|| FASE_REMESSA_ENUM : "faseRemessa"

    %% Referências lógicas entre coleções
    REMESSA_ENTITY }o--o| LISTA_BALLOT_ENTITY : "idBallotValidacao"
    REVISAO_REMESSA_ENTITY }o--|| REMESSA_ENTITY : "idRemessa"
    REMESSA_DERIVADA_POR_CAMPO_ENTITY }o--|| REMESSA_ENTITY : "idRemessaOriginal"
    REMESSA_TEMP_FISC_ENTITY }o--|| REMESSA_ENTITY : "idRemessaOriginal / toRemessaEntity()"
```

---

## Classes e relacionamentos

### Agregado principal

| Classe | Coleção / papel | Relação com `RemessaEntity` |
| --- | --- | --- |
| `BaseEntity` | — | Superclasse (`id`, `version`) |
| `RemessaEntity` | `remessa_entity` | Agregado raiz |
| `GastoEntity` | embutido em `gastos` | Composição **1:N** |
| `GlosaAuditoriaEntity` | embutido em `GastoEntity.glosaAuditoria` | Composição **0..1** por gasto |
| `StatusEnvioDocumentoAlice` | embutido em `statusEnvioDocumentoAlice` | Composição **1:N** |
| `ChaveRemessa` | value object | Derivado de campos de negócio da remessa |

### Especializações e versões temporárias

| Classe | Coleção | Observação |
| --- | --- | --- |
| `RemessaTempEntity` | `remessa_temp_entity` | Extende `RemessaEntity`; staging temporário |
| `RemessaDerivadaPorCampoEntity` | `remessa_derivada_campo_entity` | Alocação por campo (`idRemessaOriginal`, `fatorAlocacao`) |
| `RemessaTempFiscEntity` | `remessa_temp_fisc_entity` | Extende a derivada; staging de fiscalização (`processoAdmFisc`) |

### Referências lógicas (outras coleções)

| Classe | Coleção | Vínculo |
| --- | --- | --- |
| `ListaBallotEntity` | `lista_ballot_entity` | `RemessaEntity.idBallotValidacao` |
| `RevisaoRemessaEntity` | `revisao_remessa_entity` | `idRemessa` + snapshot de `version` |

### Domínios controlados (enums)

| Enum | Uso principal |
| --- | --- |
| `OrigemDoGastoEnum` | Origem do gasto e patamar numérico da remessa (`GASTO_AEGV`, `GASTO_ATIVO_COMPARTILHADO`, `GASTO_EXCLUSIVO`, `GASTO_JAZIDA_COMPARTILHADA`) |
| `FaseRemessaEnum` | Ciclo de fase: `MEN`, `ROP`, `RAD`, `REC`, `REV`, `PREV`, `FISC` |
| `StatusGastoTipoEnum` | Status de reconhecimento do gasto (passível, reconhecido, recusado, etc.) |
| `ReconhecimentoTipoEnum` | Tipo de reconhecimento (`PARCIAL`, `TOTAL`, `TOTAL_AUTOMATICO`, …) |
| `DirecaoDaRevisaoEnum` | Direção da revisão de valor no gasto |

---

## Atributos de `RemessaEntity`

| Atributo | Tipo | Notas |
| --- | --- | --- |
| `id` | `String` | PK MongoDB (herdado) |
| `version` | `Long` | Concorrência otimista (herdado) |
| `exercicio` | `Integer` | Exercício fiscal |
| `periodo` | `Integer` | Período |
| `contratoCPP` | `String` | Contrato de partilha |
| `campo` | `String` | Campo / área |
| `etapa` | `String` | Etapa processual |
| `processoAdministrativo` | `String` | Processo administrativo |
| `faseRemessa` | `String` | Alinhado a `FaseRemessaEnum` |
| `remessa` | `Integer` | Número da remessa (pode incluir patamar) |
| `remessaExposicao` | `Integer` | Remessa base sem patamar (`definirPatamar()`) |
| `usuarioResponsavel` | `String` | Responsável |
| `mesAnoReferencia` | `String` | Formato `MM/yyyy` |
| `gastosCompartilhados` | `boolean` | Preenchido a partir de `origemDoGasto` |
| `gastos` | `List<GastoEntity>` | Gastos embutidos |
| `origemDoGasto` | `OrigemDoGastoEnum` | Origem / patamar |
| `uep` | `String` | UEP |
| `contextId` | `String` | Contexto de processo |
| `idBallotValidacao` | `String` | Ref. lógica a ballot |
| `revisaoEmAndamento` | `boolean` | Flag de revisão |
| `reconhecimentoFinalizado` | `boolean` | Flag de reconhecimento |
| `dataLancamento` | `String` | Data de lançamento |
| `statusEnvioDocumentoAlice` | `List<StatusEnvioDocumentoAlice>` | Status de envio Alice |

Classes internas de apoio a consulta: `RemessaEntity.ContratoCampo` e `RemessaEntity.ExercicioPeriodo`.

---

## Notas de modelagem

1. **Documento embutido vs. referência:** gastos e status Alice vivem no mesmo documento da remessa; ballot e revisão usam IDs entre coleções.
2. **Patamar da remessa:** `OrigemDoGastoEnum` aplica offset de 10 000/20 000/30 000 sobre a remessa base; `remessaExposicao` guarda o valor sem patamar.
3. **Views Jackson:** `ReconhecimentoView`, `FiscalizacaoView` e `InvisibleView` controlam projeção JSON (ex.: glosa e campos de transferência).
4. **Fiscalização:** `RemessaTempFiscEntity.toRemessaEntity()` reconsolida a remessa oficial a partir do staging de fiscalização.

---

## Ver também

- [ContaCustoOleoEntity](./conta-custo-oleo-entity.md) — CCO gerada a partir da remessa (`idRemessaGeradora`)
- [Modelo de Dados](./intro.md) — convenções da seção
