# Adição genérica de eventos no EventStore com EntityAwareEvent

🔍️ **Local de criação:** `sgpp-services`  
⌛️ **Tempo estimado:** 30 minutos (evento) + 15 minutos (uso do serviço) + 45 minutos (teste unitário)  
🔧 **Função:** Padronizar a criação e o envio de eventos de **CRUD de entidades de domínio** ao EventStore, anexando a entidade ao evento quando este implementa `EntityAwareEvent`

---

## Visão geral

### Eventos no `sgpp-services`

Neste projeto, os eventos são, em sua maior parte, **eventos sobre alteração de entidades de domínio**. Na prática, eles representam as operações de **CRUD** realizadas no sistema:

| Operação | Convenção de nome do evento | Significado |
|---|---|---|
| **Create** | `*EntityCreateEvent` / `*EntityCreatedEvent` | Persistência de uma nova entidade |
| **Update** | `*EntityUpdatedEvent` / `*EntityUpdateEvent` | Atualização de uma entidade existente |
| **Delete** | `*EntityDeleteEvent` / `*EntityDeletedEvent` | Remoção (lógica ou efetiva) de uma entidade |

Cada evento carrega o **estado da entidade** no momento da operação e é enviado ao EventStore. Handlers reaplicam esses eventos para reconstruir e manter o estado das entidades.

💡 Em outras palavras: no `sgpp-services`, **criar/atualizar/excluir entidade ≈ publicar o evento de CRUD correspondente** (não há, em geral, “salvar direto” sem evento).

### Componentes do padrão genérico

| Componente | FQN | Papel |
|---|---|---|
| Interface de evento com entidade | `sgpp.services.common.EntityAwareEvent` | Contrato para anexar a entidade de domínio ao evento de CRUD de forma tipada |
| Serviço genérico | `sgpp.services.service.GenericEventStoreService` | A partir da classe do evento CRUD e da entidade, monta metadados, anexa a entidade e envia (ou apenas monta) o evento |

💡 **Quando usar:** sempre que for necessário publicar um evento de Create/Update/Delete de entidade sem montar manualmente `aggregateId`, `aggregateType`, `version`, `eventDate`, `username` e o attach da entidade.

💡 **Ciclo de vida CCO:** em etapas do ciclo de vida, preferir `sgpp.services.service.EventoPendenteService.addEvent(Class, TEntity, EtapaRequisicaoImpl)`, que reutiliza internamente o `GenericEventStoreService` e aplica as regras de evento pendente. Consulte [Criação de Etapas do Ciclo de Vida de Contas de Custo em Óleo](ciclo-vida.md).

---

## Etapas de execução

### 1. Criar a classe de evento de CRUD com `EntityAwareEvent`

📦️ **Pacote:** mesmo pacote da entidade de domínio (ex.: `sgpp.services.remessa`)  
🏷️ **Nome:** deve refletir a **entidade** e a **operação de CRUD**, terminando com `Event`  
  - Create: `RemessaEntityCreateEvent`, `RemessaDerivadaPorCampoEntityCreateEvent`  
  - Update: `RemessaEntityUpdatedEvent`, `ConteudoLocalEntityUpdatedEvent`  
  - Delete: `ConteudoLocalEntityDeleteEvent`  
📤️ **Ascendência:** deve estender `sgpp.services.common.BaseEvent`  
🔗 **Interface:** deve implementar `sgpp.services.common.EntityAwareEvent<T>`, onde `T` é a entidade de domínio (`T extends BaseEntity`)  
#️⃣ **Anotações (recomendadas):**
  - `@lombok.Data`
  - `@lombok.EqualsAndHashCode(callSuper = true)` (ou `callSuper = false`, conforme padrão do pacote)
  - `@lombok.NoArgsConstructor` — **obrigatório** para o serviço genérico (instanciação via reflexão)

📄 **Descrição:** o evento representa uma operação de CRUD sobre a entidade e carrega o snapshot (payload) dessa entidade. Com `EntityAwareEvent`, a entidade deixa de ser setada apenas por setters específicos no chamador e passa a ser anexada de forma genérica pelo serviço.

▶️ **Métodos obrigatórios da interface:**

```java
void attachEntity(T entity);
Class<T> getEntityClass();
```

🔹 **`attachEntity`:** deve atribuir a entidade de domínio ao atributo de payload do evento (ex.: `this.remessaEntity = entity`). Esse é o “corpo” do CRUD.  
🔹 **`getEntityClass`:** deve retornar a classe da entidade esperada (ex.: `return RemessaEntity.class`). Usado para validar compatibilidade com `isAssignableFrom` antes do attach.  
🔹 **Construtor padrão:** o evento **deve** possuir construtor sem argumentos. O `GenericEventStoreService` usa `eventClass.getConstructor().newInstance()`.  
🔹 Em geral há **um evento por operação de CRUD** da entidade (Create, Update e, quando aplicável, Delete), cada um com a mesma entidade tipada em `EntityAwareEvent<T>`.

#### Exemplo (Update de entidade de domínio)

```java
package sgpp.services.remessa;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import sgpp.services.common.BaseEvent;
import sgpp.services.common.EntityAwareEvent;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RemessaEntityUpdatedEvent extends BaseEvent
		implements EntityAwareEvent<RemessaEntity> {

	private static final long serialVersionUID = 1L;

	/** Snapshot da entidade no momento do Update */
	private RemessaEntity remessaEntity;

	@Override
	public String getName() {
		return getClass().getName();
	}

	@Override
	public void attachEntity(RemessaEntity entity) {
		this.remessaEntity = entity;
	}

	@Override
	public Class<RemessaEntity> getEntityClass() {
		return RemessaEntity.class;
	}
}
```

💡 Referências reais no código:
- Update: `sgpp.services.remessa.RemessaEntityUpdatedEvent`
- Create: `sgpp.services.remessa.RemessaDerivadaPorCampoEntityCreateEvent`
- Delete (padrão de nomenclatura): `sgpp.services.cl.ConteudoLocalEntityDeleteEvent`

---

### 2. Usar o `GenericEventStoreService` para publicar o CRUD

📦️ **Pacote do serviço:** `sgpp.services.service`  
🏷️ **Classe:** `sgpp.services.service.GenericEventStoreService`  
💉 **Injeção:** bean Spring (`@Service`); injetar via construtor (padrão Lombok `@RequiredArgsConstructor`)

📄 **Descrição:** em vez de instanciar o evento de Create/Update/Delete, preencher metadados e setar a entidade manualmente, o serviço recebe a **classe do evento de CRUD** e a **entidade de domínio**, monta o evento e envia ao EventStore via `EventStoreClient`.

#### 2.1. Publicar CRUD com username do SecurityContext

▶️ **Método:**

```java
sgpp.services.service.GenericEventStoreService.addEvent(Class<TEvent>, TEntity)
```

🔹 Preenche `username` com `SecurityUtils.getCurrentUserLogin()`.  
🔹 `contextId` permanece `null`.  
🔹 Equivale a “persistir a alteração da entidade” via EventStore.

```java
@Service
@RequiredArgsConstructor
public class MeuServico {

	private final GenericEventStoreService genericEventStoreService;

	/** Update de entidade de domínio via evento */
	public void atualizar(RemessaEntity remessa) {
		// ... alterações nos atributos da entidade ...
		genericEventStoreService.addEvent(RemessaEntityUpdatedEvent.class, remessa);
	}

	/** Create de entidade de domínio via evento */
	public void criar(RemessaDerivadaPorCampoEntity derivada) {
		genericEventStoreService.addEvent(
				RemessaDerivadaPorCampoEntityCreateEvent.class, derivada);
	}
}
```

#### 2.2. Publicar CRUD com username e contextId explícitos

▶️ **Método:**

```java
sgpp.services.service.GenericEventStoreService.addEvent(
		Class<TEvent>, TEntity, String username, String contextId)
```

```java
// Update com contexto de processo / etapa
genericEventStoreService.addEvent(
		RemessaEntityUpdatedEvent.class,
		remessa,
		"usuario.sistema",
		contextId);
```

#### 2.3. Apenas montar o evento de CRUD (sem enviar)

▶️ **Método:**

```java
sgpp.services.service.GenericEventStoreService.createEvent(
		Class<TEvent>, TEntity, String username, String contextId)
```

📄 **Descrição:** retorna o evento de Create/Update/Delete já personalizado **sem** chamar o EventStore. Use quando o chamador precisar aplicar regras adicionais antes da “persistência” (ex.: fluxo de pendência do ciclo de vida).

```java
RemessaEntityUpdatedEvent event = genericEventStoreService.createEvent(
		RemessaEntityUpdatedEvent.class,
		remessa,
		username,
		contextId);
// regras adicionais no evento, se necessário
eventStoreClient.addEvent(event);
```

---

### 3. Metadados preenchidos automaticamente no evento de CRUD

Ao chamar `createEvent` / `addEvent`, os seguintes campos do `BaseEvent` são definidos a partir da **entidade de domínio** e dos parâmetros:

| Campo do evento | Origem | Papel no CRUD |
|---|---|---|
| `aggregateId` | `entity.getId()` | Identificador da entidade (aggregate) |
| `aggregateType` | `entity.getClass().getName()` | Tipo da entidade de domínio |
| `version` | `entity.getVersion()` | Versão otimista da entidade após a operação |
| `eventDate` | `ZonedDateTime.now()` | Momento da operação de CRUD |
| `username` | parâmetro ou `SecurityUtils` | Quem executou Create/Update/Delete |
| `contextId` | parâmetro (pode ser `null`) | Contexto de processo, se houver |
| payload da entidade | `attachEntity(entity)` se `EntityAwareEvent` | Estado da entidade no Create/Update/Delete |

---

### 4. Uso no fluxo de evento pendente (ciclo de vida)

▶️ **Método preferencial em etapas** (CRUD de entidade durante a etapa):

```java
sgpp.services.service.EventoPendenteService.addEvent(
		Class<TEvent>, TEntity, EtapaRequisicaoImpl)
```

📄 **Descrição:** o ciclo de vida frequentemente **cria ou atualiza entidades de domínio** (remessa, CCO, etc.). Internamente o `EventoPendenteService` monta o evento de CRUD com:

```java
genericEventStoreService.createEvent(
		eventClass, entity,
		etapaRequisicao.getUsername(),
		etapaRequisicao.getContextId());
```

e em seguida aplica o fluxo de pendência / envio com token:

```java
EventoPendenteService.addEvent(BaseEvent, EtapaRequisicao)
```

```java
// Update de RemessaEntity durante a execução de uma etapa
eventStore.addEvent(
		RemessaEntityUpdatedEvent.class,
		remessaEntity,
		etapaRequisicao);
```

💡 Não reimplemente a montagem manual do evento de CRUD em etapas; reutilize o método genérico acima.

---

### 5. Regras e erros comuns

| Situação | Comportamento |
|---|---|
| Evento implementa `EntityAwareEvent` e a entidade é do tipo esperado (ou subclasse) | `attachEntity` é chamado |
| Entidade incompatível com `getEntityClass()` | `IllegalArgumentException` encapsulada em `SgppServicesException` — *"Entidade fornecida é incompatível com o evento."* |
| Evento **não** implementa `EntityAwareEvent` | Metadados são preenchidos; nenhum attach é feito |
| Evento sem construtor padrão | `SgppServicesException` ("Erro ao criar e personalizar evento") |

🔹 O evento **deve** ter construtor público sem argumentos.  
🔹 A entidade passada deve ser compatível com o tipo genérico de `EntityAwareEvent<T>` (validação em runtime).  
🔹 Em fluxo de pendência, `contextId` é obrigatório no evento (`EventoPendenteService` lança erro se for `null`).

---

## Teste automatizado

📄 **Descrição:** o teste unitário deve isolar o serviço com mocks de `EventStoreClient` (e, se aplicável, de `GenericEventStoreService`).

### 5.1. Teste do `GenericEventStoreService`

O teste deve cobrir:

1. **Definição** de uma entidade e de um evento fixture (`EntityAwareEvent`) no próprio teste  
2. **Chamada** de `addEvent` / `createEvent`  
3. **Verificação** (via `ArgumentCaptor` no `EventStoreClient`) de:
   - `aggregateId`, `aggregateType`, `version`, `username`, `contextId`
   - entidade anexada no payload (`attachEntity`)
4. **Cenários negativos:** entidade incompatível; evento sem construtor padrão

💡 Referência: `sgpp.services.service.GenericEventStoreServiceTest`

### 5.2. Teste do uso em `EventoPendenteService`

O teste deve cobrir:

1. Mock de `GenericEventStoreService.createEvent` retornando o evento montado  
2. Etapa **não pendente** → envio ao EventStore com token  
3. Etapa **pendente** → persistência em `EventoPendenteRepository`  
4. Propagação de falha do `createEvent`

💡 Referência: `sgpp.services.service.EventoPendenteServiceTest`

#### Esqueleto de teste (serviço genérico)

```java
@Test
public void deveCriarEventoEntityAwareEEnviarAoEventStore() {
	TestEntity entity = new TestEntity();
	entity.setId("agg-1");
	entity.setVersion(3L);

	ArgumentCaptor<BaseEvent> captor = ArgumentCaptor.forClass(BaseEvent.class);

	service.addEvent(TestEntityAwareEvent.class, entity, "usuario.teste", "ctx-1");

	verify(eventStoreClient).addEvent(captor.capture());
	TestEntityAwareEvent event = (TestEntityAwareEvent) captor.getValue();
	assertEquals("agg-1", event.getAggregateId());
	assertSame(entity, event.getEntity());
}
```

---

## Relação entre componentes

```text
 Operação de CRUD na aplicação
 (Create / Update / Delete)
           │
           ▼
┌──────────────────────────────────┐
│ Entidade de domínio (BaseEntity) │
│ + Evento de CRUD (BaseEvent +    │
│   EntityAwareEvent<T>)           │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ GenericEventStoreService         │
│  createEvent(...)  → monta CRUD  │
│  addEvent(...)     → monta+envia │
└──────────┬───────────────────────┘
           │
     ┌─────┴─────────────────────┐
     ▼                           ▼
 EventStoreClient          EventoPendenteService
 (persistência via         (CRUD + pendência do
  evento / envio direto)    ciclo de vida CCO)
           │
           ▼
     Handlers aplicam o evento
     e atualizam o estado da entidade
```
