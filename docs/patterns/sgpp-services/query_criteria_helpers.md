# Helpers genéricos de composição de query por criteria

🔍️ **Local de criação:** `sgpp-services`  
⌛️ **Tempo estimado:** 15 minutos  
🔧 **Função:** Aplicar filtros de criteria em `SpringDataMongodbQuery` e paginação via `PageCtl`

---

## O que é

Métodos auxiliares em `sgpp.services.service.BaseQueryService` usados pelos `*QueryService` para montar a query Mongo/QueryDSL a partir de um criteria.

| Método | Classe | Uso |
|---|---|---|
| `whereIf` | `BaseQueryService` | Aplica filtro no documento raiz (`where`) |
| `anyEmbeddedIf` | `BaseQueryService` | Aplica filtro em coleção embutida (`anyEmbedded`) |
| `applyPage` | `BaseQueryService` | Aplica `limit` e `offset` a partir de `PageCtl` |

Os métodos são `protected`. Estão disponíveis em qualquer classe que estenda `BaseQueryService`.

Para converter o filtro em `Predicate`, use os builders já existentes na mesma classe, por exemplo:

- `buildStringExpression`
- `buildNumberExpression`
- `buildExpression`
- `buildExtendedExpression`
- `buildStringRangeExpression`
- `buildComparableExpression`

---

## Pré-requisito

O `*QueryService` deve estender `BaseQueryService`:

```java
public class MinhaEntityQueryService extends BaseQueryService {
    // ...
}
```

---

## `whereIf`

### Assinatura

```java
protected <T, F, E> SpringDataMongodbQuery<T> whereIf(
        SpringDataMongodbQuery<T> query,
        F filter,
        E field,
        BiFunction<F, E, Predicate> expressionBuilder)
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `query` | `SpringDataMongodbQuery<T>` | Query em construção (`repository.getQuery()` ou resultado de chamada anterior) |
| `filter` | `F` | Filtro do criteria (ex.: `StringFilter`, `IntegerFilter`, `ExtendedFilter`) |
| `field` | `E` | Path QueryDSL do campo (ex.: `QMinhaEntity.minhaEntity.contratoCPP`) |
| `expressionBuilder` | `BiFunction<F, E, Predicate>` | Método que gera o `Predicate` (ex.: `this::buildStringExpression`) |

### Retorno

A mesma query, com `where` aplicado quando filtro e predicate forem válidos.

### Comportamento

- Se `query`, `filter` ou `expressionBuilder` for `null`, retorna `query` sem alteração.
- Se `expressionBuilder` retornar `null`, retorna `query` sem alteração.
- Caso contrário, executa `query.where(predicate)` e devolve o resultado.

### Exemplo

```java
QMinhaEntity q = QMinhaEntity.minhaEntity;

query = whereIf(query, criteria.getContratoCPP(), q.contratoCPP, this::buildStringExpression);
query = whereIf(query, criteria.getRemessa(), q.remessa, this::buildNumberExpression);
query = whereIf(query, criteria.getAtivo(), q.ativo, this::buildExpression);
```

---

## `anyEmbeddedIf`

### Assinatura

```java
protected <T, E, F, P> SpringDataMongodbQuery<T> anyEmbeddedIf(
        SpringDataMongodbQuery<T> query,
        Path<? extends Collection<E>> collectionPath,
        Path<E> elementPath,
        F filter,
        P field,
        BiFunction<F, P, Predicate> expressionBuilder)
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `query` | `SpringDataMongodbQuery<T>` | Query em construção |
| `collectionPath` | `Path<? extends Collection<E>>` | Path da lista embutida (ex.: `q.gastos`) |
| `elementPath` | `Path<E>` | Path Q do elemento da lista (ex.: `QGastoEntity.gastoEntity`) |
| `filter` | `F` | Filtro do criteria sobre o elemento embutido |
| `field` | `P` | Path QueryDSL do campo no elemento (ex.: `qGasto.item`) |
| `expressionBuilder` | `BiFunction<F, P, Predicate>` | Método que gera o `Predicate` |

### Retorno

A mesma query, com `anyEmbedded(...).on(predicate)` aplicado quando filtro e predicate forem válidos.

### Comportamento

- Se `query`, `filter`, `expressionBuilder`, `collectionPath` ou `elementPath` for `null`, retorna `query` sem alteração.
- Se `expressionBuilder` retornar `null`, retorna `query` sem alteração.
- Caso contrário, executa `query.anyEmbedded(collectionPath, elementPath).on(predicate)` e devolve o resultado.

### Exemplo

```java
QMinhaEntity q = QMinhaEntity.minhaEntity;
QGastoEntity qGasto = QGastoEntity.gastoEntity;

if (criteria.getGastos() != null) {
    query = anyEmbeddedIf(query, q.gastos, qGasto,
            criteria.getGastos().getItem(), qGasto.item, this::buildNumberExpression);
    query = anyEmbeddedIf(query, q.gastos, qGasto,
            criteria.getGastos().getStatusGastoTipo(), qGasto.statusGastoTipo,
            this::buildExtendedExpression);
}
```

### Filtro com mais de um campo no mesmo `on`

Quando o `on` precisa de vários predicates (ex.: mês e ano juntos), monte a cláusula manualmente:

```java
query = query.anyEmbedded(q.gastos, qGasto).on(
        qGasto.mesCompetencia.eq(mes),
        qGasto.anoCompetencia.eq(ano));
```

---

## `applyPage`

### Assinatura

```java
protected <T> SpringDataMongodbQuery<T> applyPage(
        SpringDataMongodbQuery<T> query,
        PageCtl pageCtl)
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `query` | `SpringDataMongodbQuery<T>` | Query em construção |
| `pageCtl` | `PageCtl` | Paginação (`page`, `size`); pode ser `null` |

### Retorno

A mesma instância de `query`, com paginação aplicada quando `pageCtl` não for `null`.

### Comportamento

- Se `query` ou `pageCtl` for `null`, retorna `query` sem alteração.
- Se `pageCtl.getSize() != null`, chama `query.limit(size)`.
- Sempre chama `query.offset(pageCtl.offset())` quando `pageCtl` não é nulo (`offset()` já trata page/size nulos ou inválidos).

### Exemplo

```java
query = applyPage(query, criteria.getPageCtl());
```

---

## Uso completo em `getQueryWithCriteria`

```java
private <T extends MinhaEntity> SpringDataMongodbQuery<T> getQueryWithCriteria(
        SpringDataMongodbQuery<T> query,
        MinhaEntityCriteria criteria) {
    if (criteria == null) {
        return query;
    }

    QMinhaEntity q = QMinhaEntity.minhaEntity;

    query = whereIf(query, criteria.getId(), q.id, this::buildStringExpression);
    query = whereIf(query, criteria.getNome(), q.nome, this::buildStringExpression);
    query = whereIf(query, criteria.getVersion(), q.version, this::buildNumberExpression);

    if (criteria.getItens() != null) {
        QItemEntity qItem = QItemEntity.itemEntity;
        query = anyEmbeddedIf(query, q.itens, qItem,
                criteria.getItens().getCodigo(), qItem.codigo, this::buildStringExpression);
    }

    return applyPage(query, criteria.getPageCtl());
}
```

Chamada típica a partir do serviço:

```java
public List<MinhaEntity> findByCriteria(MinhaEntityCriteria criteria) {
    return getQueryWithCriteria(repository.getQuery(), criteria).fetch();
}
```

---

## Teste automatizado

Classe: `sgpp.services.service.BaseQueryServiceTest`

O teste usa mock de `SpringDataMongodbQuery` e cobre:

- aplicação de `whereIf` / `anyEmbeddedIf` / `applyPage` com parâmetros válidos;
- ausência de alteração da query quando filtro, predicate ou `pageCtl` são nulos;
- encadeamento de vários `whereIf`.
