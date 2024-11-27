---
title: Criação de planilha a partir de classe POJO
---

🔍️ **Local de criação:** sgpp-services  
⌛️ **Tempo estimado:** 10 minutos por atributo + 1 hora método de criação de planilha + 30 minutos resource + 1 hora criação teste automatizado

## Etapas de execução criação

### Anotações
O sgpp-services fornece uma biblioteca de transformação de objetos POJO para planilhas do Excel. Para tanto deve-se utilizar a seguinte anotação nos atributos da classe POJO *sgpp.fileprocessor.annotations.RelacionamentoPlanilhaCriacao*  
Cada um desses atributos deve receber a coluna a qual o atributo será aplicado na planilha excel, adicionalmente pode-se adicionar o nome da  coluna (cabeçalho) na qual o atributo será aplicado. e.g
```javascript
@RelacionamentoPlanilhaCriacao(coluna="A", nomeCabecalho = "Contrato CPP")
private String contratoCpp;
```
💡 Essa anotação também pode ser aplicada em métodos acessores do tipo  *get.* Em versões anteriores dessa biblioteca, essa era a única forma de aplicar essa anotação

### Método de criação de planilha
Para criação do método de criação de planilha, deve-se utilizar o serviço fornecido pela seguinte classe:  
-*sgpp.fileprocessor.service.XlsCreatorService*  
O tipo genério *T* se refere à classe anotada com o atributo *RelacionamentoPlanilhaCriacao*
Deve-se usar o seguinte método para criação da planilha: *sgpp.fileprocessor.service.XlsCreatorService.criar(T)*  
Como parâmetro deve-se passar o objeto que representa a linha que será  aplicada na planilha e.g
```javascript
ListaBallotEntity lista = listas.get(0);
XlsCreatorService<ListaBallotEntity> creatorService = new XlsCreatorService<>();
return creatorService
        .cabecalho(true)
        .nomePlanilha(NOME_PLANILHA)
        .transformarCelula(new BigDecimalValueTransformation(Double.class), "K")
        .transformarCelula(new BigDecimalValueTransformation(Double.class), "L")
        .transformarCelula(new BigDecimalValueTransformation(Double.class), "M")
        .ajustarColunas(true)
        .criar(lista);
```
💡 Objetos de transformação de dados poderão ser aplicados como observado no exemplo. Vide o elemento de construção *Transformando atributos de uma planilha durante sua criação*  
É possível receber a planilha em formato base64, utilizando o seguinte  método *sgpp.fileprocessor.service.XlsCreatorService.getBase64Workbook()* e.g.
```javascript
XlsCreatorService<PlanilhaRemessa> remessaCreatorService = new XlsCreatorService<>();    	
String xlsBase64 = remessaCreatorService
        .cabecalho(true)
        .nomePlanilha("LG")
        .transformarCelula(new BooleanToStringValueTransformation(String.class), "AF")
        .criar(planilhaRemessa)
        .getBase64Workbook();
```

## Teste automatizado
O teste automatizado da criação de uma planilha, exige que um método que extração da planilha seja criado, para tanto observe o elemento de  construção *Extração de planilha em classe java*  
O teste automatizado deverá ser composto de 3 etapas:  
- Definição do objeto mock a partir da classe anotada
- Chamada do serviço a ser testado
- Receber a planilha em formato base64
- Chamada do serviço de extração de planilha equivalente e armazenamento do resultado em um objeto equivalente
- Comparação dos campos do mock e da classe gerada
