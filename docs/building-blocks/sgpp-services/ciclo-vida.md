# Criação de Etapas de Ciclo de Vida de Contas de Custo em Óleo

🔍️ **Local de criação:** sgpp-services  
⌛️ **Tempo estimado:**  

## Estado atual do Ciclo de Vida de Contas de Custo em Óleo
![Etapas](img/etapas_ciclo_vida_v4.png)

## Etapas de execução

### 1. Criar classe de API REST
📦️ **pacote:** `sgpp.services.web.rest`
🏷️ **nome:** deve refletir o nome da etapa. Deve iniciar com a palavra `Etapa` e terminar com a palavra `Resource`  
📄 **descrição:** Classe que expõe a etapa do ciclo de vida como API REST. deve possuir apenas um método com a seguinte assinatura `sgpp.services.web.rest.EtapaAdicaoOverheadContaCustoOleoResource.executar(...)`. Esse método deve receber todos os parâmetros necessários para a composição do input da etapa.
Esse método deve instanciar a classe de _Requisicao_ buscar na base quantos dados forem necessários para popular essa classe e utilizar o método `sgpp.services.service.EventStoreClient.addEtapa(EtapaBaseEvent)` para adição da etapa na fila de execução.
```
💡 considere fazer dos paraâmetros do método execute o mais resumidos possíveis, lembrando que o estado da aplicação pode ser consultado da base de dados, portanto, esses inputs devem ser indentificadores sempre que possível
```

### 2. Criar classe de input de dados da etapa
📦️ **pacote:** `sgpp.ciclovidacco.etapas.`+ nome da etapa em camel case + `.` + número da versão *vide discussão a respeito de versionamento
🏷️ **nome:** deve refletir o nome da etapa. Deve iniciar com a palavra terminar com a palavra `Requisicao`  
📤️ **ascendência:** deve extender a classe `sgpp.ciclovidacco.etapas.EtapaRequisicao`
📄 **descrição:** _Value Object_ deve conter todo o estado da regra de negócio modelada na etapa. Dentro do código da etapa, dados do estado da aplicação não devem ser consultados da base (com algumas exceções), portanto todos os objetos de valor devem ser definidos com atributos dessa classe
#️⃣ **anotações:** deve ser anotada com as seguintes interfaces da biblioteca lombock `lombok.Data`, `lombok.EqualsAndHashCode(callSuper = false)` e `lombok.ToString`
▶️ **métodos:** deve conter um método que receba parâemtros correspondentes a seus atributos e instancie a classe (não um construtor) com a seguinte assintura `public static` + o nome da classe + `criarEtapa(...)`

### 3. Criar classe da etapa
📦️ **pacote:** `sgpp.ciclovidacco.etapas.`+ nome da etapa em camel case + `.` + número da versão *vide discussão a respeito de versionamento
🏷️ **nome:** deve refletir o nome da etapa.
📤️ **ascendência:** deve extender a classe `sgpp.ciclovidacco.etapas.EtapaImpl`