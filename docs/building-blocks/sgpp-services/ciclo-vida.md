# Criação de novas etapas de Ciclo de Vida de Contas de Custo em Óleo

🔍️ **Local de criação:** sgpp-services
⌛️ **Tempo estimado:**

## Estado atual do Ciclo de Vida de Contas de Custo em Óleo
![Etapas](img/etapas_ciclo_vida_v4.png)

## Etapas de execução

### 1. Criar classe de interface REST
📦️ **pacote:** sgpp.services.web.rest
🏷️ **nome:** deve refletir o nome da etapa. Deve iniciar com a palavra `Etapa` e terminar com a palavra `Resource`
📄 **descrição:** deve possuir apenas um método com a seguinte assinatura `sgpp.services.web.rest.EtapaAdicaoOverheadContaCustoOleoResource.executar(...)`. Esse método deve receber todos os parâmetros necessários para a composição do input da etapa (considere fazer desses inputs o mais resumidos possíveis, lembrando que o estado da aplicação pode ser consultado da base de dados, portanto, esses inputs devem ser indentificadores sempre que possível).
Esse método deve instanciar a classe de _Requisicao_ buscar na base quantos dados forem necessários para popular essa classe e utilizar o método `sgpp.services.service.EventStoreClient.addEtapa(EtapaBaseEvent)` para adição da etapa na fila de execução.