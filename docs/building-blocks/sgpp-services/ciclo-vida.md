# Criação de Etapas de Ciclo de Vida de Contas de Custo em Óleo

🔍️ **Local de criação:** sgpp-services  
⌛️ **Tempo estimado:**  

## Etapas de execução

### 1. Criar classe de API REST
📦️ **pacote:** `sgpp.services.web.rest`  
🏷️ **nome:** deve refletir o nome da etapa. Deve iniciar com a palavra `Etapa` e terminar com a palavra `Resource`  
📄 **descrição:** Classe que expõe a etapa do ciclo de vida como API REST. deve possuir apenas um método com a seguinte assinatura `sgpp.services.web.rest.EtapaAdicaoOverheadContaCustoOleoResource.executar(...)`. Esse método deve receber todos os parâmetros necessários para a composição do input da etapa.
Esse método deve instanciar a classe de _Requisicao_ buscar na base quantos dados forem necessários para popular essa classe e utilizar o método `sgpp.services.service.EventStoreClient.addEtapa(EtapaBaseEvent)` para adição da etapa na fila de execução.
```
💡 considere fazer dos paraâmetros do método execute o mais resumidos possíveis, lembrando que o estado da aplicação pode ser consultado da base de dados, portanto, esses inputs devem ser indentificadores sempre que possível
```

### 2. Criar classe de Requisicao (input de dados) da Etapa
📦️ **pacote:** `sgpp.ciclovidacco.etapas.`+ nome da etapa em camel case + `.` + número da versão *vide discussão a respeito de versionamento 
🏷️ **nome:** deve refletir o nome da etapa. Deve iniciar com a palavra terminar com a palavra `Requisicao`  
📤️ **ascendência:** deve extender a classe `sgpp.ciclovidacco.etapas.EtapaRequisicao` 
#️⃣ **anotações:** deve ser anotada com as seguintes interfaces da biblioteca lombock `lombok.Data`, `lombok.EqualsAndHashCode(callSuper = false)` e `lombok.ToString` 
📄 **descrição:** _Value Object_ deve conter todo o estado da regra de negócio modelada na etapa. Dentro do código da etapa, dados do estado da aplicação não devem ser consultados da base (com algumas exceções), portanto todos os objetos de valor devem ser definidos com atributos dessa classe 
▶️ **métodos:** deve conter um método que receba parâemtros correspondentes a seus atributos e instancie a classe (não um construtor) com a seguinte assintura `public static` + o nome da classe + `criarEtapa(...)`

### 3. Criar classe da Etapa
📦️ **pacote:** `sgpp.ciclovidacco.etapas.`+ nome da etapa em camel case + `.` + número da versão *vide discussão a respeito de versionamento 
🏷️ **nome:** deve refletir o nome da etapa. 
📤️ **ascendência:** deve extender a classe `sgpp.ciclovidacco.etapas.EtapaImpl` 
📄 **descrição:** Clase que contém a regra de negócio. Deve obedecer às seguintes regras:
- deve ser indepontente: deve-se garantir que mesmo após múltiplas execuções, os métodos dessa classe sempre alterem o estado da aplicação da mesma forma. Ou seja, execuções consecutivas devem ser sem efeito.
- não deve consultar o estado da aplicação: todos os dados considerados pelos métodos dessa classe devem ser recebidos vindos de um objeto do tipo _Requisicao_
- deve capturar todas suas excções: deve-se encapsular toda sua excecução em um try-catch que capture `java.lang.Exception` *vide mais a respeito na discussão sobre o método executar
▶️ **métodos:** deve conter quantos métodos forem necessários, mas apenas um público com a seguinte assinatura `public void executar(EtapaRequisicaoImpl etapaRequisicao)` *vide mais a respeito na discussão sobre o método executar

#### 3.1 Definir o método executar da etapa
📄 **descrição:** O método executar de uma etapa requer considerações específicas. Esse método deve chamar os seguintes métodos em seu corpo
- `sgpp.services.service.EventoPendenteService.addEvent(BaseEvent, EtapaRequisicao)`: método chamado para alterar o estado da aplicação no final da aplicação das regras de negócio. Deve passar um objeto populado descendente de `sgpp.services.common.BaseEvent` e o atributo `etapaRequisica` recebido pelo método executar
- `sgpp.ciclovidacco.etapas.EtapaImpl.lancarExcecaoConclusaoEtapa(CicloVidaCcoService, EtapaRequisicaoImpl, Exception)`: método chamado no `catch(Exception e)` do método executar. Deve receber uma instância do Spring Service `sgpp.services.contacustooleo.ciclovida.CicloVidaCcoService`, o atributo `etapaRequisica` recebido pelo método executar e a exceção capturada.
- `sgpp.services.contacustooleo.ciclovida.CicloVidaCcoService.concluirEtapa(EtapaBaseEvent)`: método que deve ser chamado fora do tratamento de exceção ao finalizar a etapa. Deve receber o atributo `etapaRequisica` recebido pelo método executar

### 4. Atualizar a criação do Ciclo de Vida de Contas de Custo em Óleo
▶️ **métodos:** deve ser alterado o método `sgpp.services.contacustooleo.ciclovida.CicloVidaCcoService.createCicloVidaDefault(FaseRemessaEnum, String, boolean iniciadoEmFaseRecursiva)` considerando em que processo a etapa será ativada. Utiliza-se o método `sgpp.services.contacustooleo.ciclovida.CicloVidaCcoEntity.adicionarEtapaNoFim(CicloVidaCcoEtapaEnum, CicloVidaCcoEtapaVersaoLogicaEnum, CicloVidaCcoEtapaVersaoRequisicaoEnum)`para adicionar a etapa aos pŕoximos ciclos de vida gerados. Deve-se também atentar para a necessidade de criar um item na enumeração `sgpp.services.contacustooleo.ciclovida.CicloVidaCcoEtapaEnum`que represente a etapa criada 

### 5. Atualizar o diagrama do estado atual do Ciclo de Vida de Contas de Custo em Óleo
📄 **descrição:** Deve-se atualizar o diagrama e atualizar a imagem abaixo nesse documento
![Etapas](img/etapas_ciclo_vida_v4.png)