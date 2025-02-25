﻿# Client-Side Exception Wrapper

> 📢 **Uso de Template no Toolkit TKTEMPL_SgppTemplates (TKTEMPL)**
> 
> Este *building block* possui um template disponível no toolkit **TKTEMPL_SgppTemplates (TKTEMPL)**. A menos que existam motivos técnicos ou operacionais razoáveis para uma implementação personalizada, o uso do template é altamente recomendado.
> 
> ✅ **Vantagens de utilizar o template:**
> - Padronização e conformidade com boas práticas.
> - Manutenção simplificada e suporte contínuo.
> - Redução de esforço e tempo de desenvolvimento.
> 
> Caso haja necessidade de uma implementação alternativa, recomenda-se justificar a decisão e avaliar possíveis impactos.
> 
> 🔗 Consulte a documentação do **TKTEMPL_SgppTemplates** para mais detalhes sobre o template disponível.

🔍️ **Local de criação:** IBM BAW  
⌛️ **Tempo estimado:** 1 horas  
🔧 **Função:** Encapsular um serviço já criado em um processo de tratamento de erro client-side
🏷️ **Nome:** O nome desse serviço deve ser o mesmo do serviço encapsulado (sem sufixo SF) + "Wrapper"

### Diagrama BPMN
![BPMN](img/client-side-exception-wrapper.svg)

### Pré requisitos
Ter um serviço do tipo **Serviço REST no IBM BAW** já criado. Vide [Configuração do Serviço REST no IBM BAW](servicos-rest.md)  
Esse serviço deve ser criado como nested service;  
![Nested Service](img/client-side-exception-wrapper-nested-service.png)

## Etapas de execução

### 1. Definir parâmetros de entrada, saída e privados

**Variáveis de entrada:** Defina os parâmetros de entrada com os mesmos nomes e tipos do serviço encapsulado

**Variáveis de saída:** Defina os parâmetros de saída com os mesmos nomes e tipos do serviço encapsulado

**Variáveis privadas:** As seguintes variáveis devem ser definidas:
- **isRest** do tipo Boolean
- **showCancel** do tipo Boolean
- **error - do tipo ErrorBO definido no toolkit TKHE_HandleErrors ○acao** do tipo String

### 2. Adicionar o Services encapsulado já criado :
**Nome:** O nome deve ser o nome do serviço  
**Função:** Exceutar o serviço encapsulado  
**Configuração:** Configure as propriedades de entrada e saída do serviço de acordo com as variáveis de entrada e saída do Wrapper  
**Erro:** Serviços encapsulados geralmente lançam uma exceção do tipo IntegrationError (que retorna um objeto do tipo ErrorBO) e um do tipo ConfigurationError (que retorna um objeto do tipo ErrorBO), definidos no toolkit TKISC_IntegracoesSistemicasComuns.  
**Boundary Event:** Adicionar um boundary event para cada um desses erros  

### 3. Adicionar Scripts para definir o valor da variável *isRest* nos fluxos dos boundary event's
**Nome:** O nome deve ser *Set isRest true* para o fluxo do *IntegrationError* e *Set isRest false* para o fluxo do *ConfigurationError*  
**Função:** Definir o valor da variável isRest  
**Definição da variável isRest:**  Defina a variável isRest como *true* para o fluxo do *IntegrationError* e *false* para o fluxo do *ConfigurationError* em seus respectivos scripts  
**Exemplo:** 
```javascript
tw.local.isRest = false;
```

### 4. Usar Nested Client-Side Service  Service Exception Treatment do toolkit *TKHE_HandleErrors*:
**Nome:** Tratar Excecao  
**Função:** Tratar a exceção de maneira amigável  
**Configuração:** Defina as propriedades de entrada error, isRest e showCancel com as variáveis privadas. Defina a propriedade acao com a variável privada 

### 5. Usar Gateway:
**Nome:** Cancelar?  
**Função:** Verificar se usuário solicitou pelo cancelamento do serviço encapsulado  
**Configuração:** no fluxo *sim* deverá se comparar a variável privada ação com a String "Cancelar"  
**Exemplo:**
```javascript
tw.local.acao === "Cancelar"
```
