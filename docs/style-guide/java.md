# Java
Guia de estilo Java (baseado no [guia de estilo do google](https://google.github.io/styleguide/javaguide.html))

1\. Introdução
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Este documento serve como uma definição **completa** dos padrões de acordo do Google para código-fonte na linguagem de programação Java™. Um arquivo de origem Java é descrito como estando _no estilo Google_ se e somente se estiver de acordo com as regras aqui contidas.

Como outras orientações de estilo de programação, as questões abordadas abrangem não apenas questões estéticas de formatação, mas também outros tipos de convenções ou padrões de conformidade. No entanto, este documento concentra-se principalmente nas **regras** que seguimos universalmente e evita _conselhos_ que não sejam claramente aplicáveis ​​(seja por humanos ou por ferramentas).

### 1.1 Notas terminológicas

Neste documento, salvo esclarecimento em contrário:

1.  O termo _classe_ é usado inclusive para significar uma classe "comum", classe enum, interface ou tipo de anotação ( `@interface`).
2.  O termo _membro_ (de uma classe) é usado inclusive para significar uma classe, campo, método _ou construtor_ aninhado ; isto é, todo o conteúdo de nível superior de uma aula, exceto inicializadores e comentários.
3.  O termo _comentário_ sempre se refere a comentários _de implementação_ . Não use a frase "comentários de documentação" e, em vez disso, use o termo comum "Javadoc".

Outras “notas terminológicas” aparecem ocasionalmente ao longo do documento.

### 1.2 Notas de guia

O código de exemplo deste documento **não é normativo** . Ou seja, embora os exemplos não sejam do estilo Google, eles não podem ilustrar a _única_ forma elegante de representar o código. As escolhas de formatação feitas nos exemplos não devem ser aplicadas como regras.

2 Noções básicas sobre arquivo de origem
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 2.1 Nome do arquivo

O nome do arquivo de origem consiste no nome da classe de nível superior que ele contém, diferenciando-se de minúsculas (da qual existe [exatamente uma], mais a `.java`extensão.

### 2.2 Codificação do arquivo: UTF-8

Os arquivos de origem são codificados em **UTF-8** .

### 2.3 Caracteres especiais

#### 2.3.1 Caracteres de espaço em branco

Além da sequência de terminação de linha, o **caractere de espaço horizontal ASCII** ( **0x20** ) é o único caractere de espaço em branco que aparece em qualquer lugar de um arquivo de origem. Isso implica que:

1.  Todos os outros caracteres de espaço em branco em strings e literais de caracteres têm escape.
2.  Caracteres de tabulação **não** são usados ​​para recuo.

#### 2.3.2 Sequências de escape especiais

Para qualquer caractere que tenha uma [sequência de escape especial](http://docs.oracle.com/javase/tutorial/java/data/characters.html) ( `\b`, `\t`, `\n`, `\f`, `\r`, `\"`, `\'`e `\\`), essa sequência é usada em vez do escape octal (por exemplo  `\012`) ou Unicode (por exemplo  `\u000a`) correspondente.

#### 2.3.3 Caracteres não ASCII

Para os caracteres não-ASCII restantes, o caractere Unicode real (por exemplo,  `∞`) ou o escape Unicode equivalente (por exemplo,  ) é usado. A escolha depende apenas do que torna o código **mais fácil de ler e entender** , embora o Unicode escape fora dos literais de string e os comentários sejam fortemente desencorajados.`\u221e`

**Dica:** No caso de escape Unicode, e ocasionalmente mesmo quando caracteres Unicode reais são usados, um comentário explicativo pode ser muito útil.

Exemplos:

Exemplo

Discussão

`String unitAbbrev = "μs";`

Melhor: perfeitamente claro, mesmo sem comentários.

`String unitAbbrev = "\u03bcs"; // "μs"`

Permitido, mas não há razão para fazer isso.

`String unitAbbrev = "\u03bcs"; // Greek letter mu, "s"`

Permitido, mas estranho e sujeito a erros.

`String unitAbbrev = "\u03bcs";`

Pobre: ​​o leitor não tem ideia do que é isso.

`return '\ufeff' + content; // byte order mark`

Bom: use escapes para caracteres não imprimíveis e comente se necessário.

**Dica:** Nunca torne seu código menos legível simplesmente por medo de que alguns programas possam não lidar adequadamente com caracteres não-ASCII. Se isso acontecer, esses programas estão **quebrados** e devem ser **consertados** .

3 Estrutura do arquivo fonte
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Um arquivo de origem consiste em, **em ordem** :

1.  Informações de licença ou direitos autorais, se presentes
2.  Declaração do pacote
3.  Instruções de importação
4.  Exatamente uma classe de nível superior

**Exatamente uma linha em branco** separa cada seção presente.

### 3.1 Informações sobre licença ou direitos autorais, se presentes

Se as informações de licença ou direitos autorais pertencerem a um arquivo, elas pertencerão aqui.

### 3.2 Declaração do pacote

A instrução package **não é quebrada em linha** . O limite de coluna (Seção 4.4, [Limite de coluna: 120] não se aplica a instruções de pacote.

### 3.3 Declarações de importação

#### 3.3.1 Nenhuma importação curinga

**Importações curinga** , estáticas ou não, **não são usadas** .

#### 3.3.2 Sem quebra de linha

As instruções de importação não são **quebradas em linha** . O limite de colunas (Seção 4.4, [Limite de colunas: 120] não se aplica a instruções de importação.

#### 3.3.3 Ordenação e espaçamento

As importações são ordenadas da seguinte forma:

1.  Todas as importações estáticas em um único bloco.
2.  Todas as importações não estáticas em um único bloco.

Se houver importações estáticas e não estáticas, uma única linha em branco separará os dois blocos. Não há outras linhas em branco entre as instruções de importação.

Dentro de cada bloco, os nomes importados aparecem na ordem de classificação ASCII. ( **Nota:** isso não é o mesmo que as _instruções_ de importação estarem na ordem de classificação ASCII, já que '.' classifica antes de ';'.)

#### 3.3.4 Nenhuma importação estática para classes

A importação estática não é usada para classes aninhadas estáticas. Eles são importados com importações normais.

### 3.4 Declaração de classe

#### 3.4.1 Exatamente uma declaração de classe de nível superior

Cada classe de nível superior reside em um arquivo de origem próprio.

#### 3.4.2 Ordenação dos conteúdos das aulas

A ordem que você escolhe para os membros e inicializadores da sua classe pode ter um grande efeito na capacidade de aprendizagem. No entanto, não existe uma receita única e correta de como fazer isso; classes diferentes podem ordenar seus conteúdos de maneiras diferentes.

O importante é que cada classe use **_alguma_ ordem lógica** , que seu mantenedor poderia explicar se solicitado. Por exemplo, novos métodos não são habitualmente adicionados apenas ao final da classe, pois isso produziria uma ordem "cronológica por data adicionada", o que não é uma ordem lógica.

##### 3.4.2.1 Sobrecargas: nunca dividir

Os métodos de uma classe que compartilham o mesmo nome aparecem em um único grupo contíguo, sem nenhum outro membro entre eles. O mesmo se aplica a vários construtores (que sempre têm o mesmo nome). Esta regra se aplica mesmo quando modificadores como `static`ou `private`diferem entre os métodos.

4 Formatação
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Nota sobre terminologia:** _construção semelhante a bloco_ refere-se ao corpo de uma classe, método ou construtor. Observe que, na Seção 4.8.3.1 sobre [inicializadores de array] , qualquer inicializador de array _pode_ opcionalmente ser tratado como se fosse uma construção semelhante a um bloco.

### 4.1 Chaves

#### 4.1.1 Uso de chaves opcionais

Os colchetes são usados ​​com instruções `if`, `else`, `for`e `do`, `while`mesmo quando o corpo está vazio ou contém apenas uma única instrução.

Outras chaves opcionais, como aquelas em uma expressão lambda, permanecem opcionais.

#### 4.1.2 Blocos não vazios: estilo K&R

Os colchetes seguem o estilo Kernighan e Ritchie (" [colchetes egípcios](https://web.archive.org/web/20120803045503/https://www.codinghorror.com/blog/2012/07/new-programming-jargon.html) ") para blocos _não vazios_ e construções semelhantes a blocos:

*   Nenhuma quebra de linha antes da chave de abertura, exceto conforme detalhado abaixo.
*   Quebra de linha após a chave de abertura.
*   Quebra de linha antes da chave de fechamento.
*   Quebra de linha após a chave de fechamento, _somente se_ essa chave terminar uma instrução ou terminar o corpo de um método, construtor ou classe _nomeada . Por exemplo,_ _não_ há quebra de linha após a chave se ela for seguida por `else`uma vírgula.

Exceção: Em locais onde essas regras permitem uma única instrução terminando com ponto e vírgula ( `;`), um bloco de instruções pode aparecer, e a chave de abertura deste bloco é precedida por uma quebra de linha. Blocos como esses são normalmente introduzidos para limitar o escopo de variáveis ​​locais, por exemplo, dentro de instruções switch.

Exemplos:
```
return () -> {
  while (condition()) {
    method();
  }
};

return new MyClass() {
  @Override public void method() {
    if (condition()) {
      try {
        something();
      } catch (ProblemException e) {
        recover();
      }
    } else if (otherCondition()) {
      somethingElse();
    } else {
      lastThing();
    }
    {
      int x = foo();
      frob(x);
    }
  } 
```
Algumas exceções para classes enum são fornecidas na Seção 4.8.1, [Classes enum] .

#### 4.1.3 Blocos vazios: podem ser concisos

Um bloco vazio ou uma construção semelhante a um bloco pode ser no estilo K&R (conforme descrito na [Seção 4.1.2].`if/else``try/catch/finally`

Exemplos:
```
 // This is acceptable
  void doNothing() {}

  // This is equally acceptable
  void doNothingElse() {
  }
```
```
// This is not acceptable: No concise empty blocks in a multi-block statement
  try {
    doSomething();
  } catch (Exception e) {}
```   

### 4.2 Indentação de bloco: +2 espaços

Cada vez que um novo bloco ou construção semelhante a um bloco é aberto, o recuo aumenta em dois espaços. Quando o bloco termina, o recuo retorna ao nível de recuo anterior. O nível de recuo se aplica ao código e aos comentários em todo o bloco. (Veja o exemplo na Seção 4.1.2, [Blocos não vazios: estilo K e R.]

### 4.3 Uma instrução por linha

Cada instrução é seguida por uma quebra de linha.

### 4.4 Limite de coluna: 120

O código Java tem um limite de coluna de 120 caracteres. Um "caractere" significa qualquer ponto de código Unicode. Exceto conforme indicado abaixo, qualquer linha que exceda esse limite deverá ser quebrada, conforme explicado na Seção 4.5, [Quebra de linha] .

Cada ponto de código Unicode conta como um caractere, mesmo que sua largura de exibição seja maior ou menor. Por exemplo, se estiver usando [caracteres de largura total](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) , você pode optar por quebrar a linha antes do que esta regra exige estritamente.

**Exceções:**

1.  Linhas onde não é possível obedecer ao limite da coluna (por exemplo, uma URL longa em Javadoc ou uma referência longa de método JSNI).
2.  `package`e `import`instruções (consulte as Seções 3.2 [Instrução do pacote].
3.  Linhas de comando em um comentário que pode ser copiado e colado em um shell.
4.  Identificadores muito longos, nas raras ocasiões em que são necessários, podem exceder o limite da coluna. Nesse caso, o empacotamento válido para o código circundante é o produzido por [google-java-format](https://github.com/google/google-java-format) .

### 4.5 Quebra de linha

**Nota sobre terminologia:** Quando o código que poderia ocupar legalmente uma única linha é dividido em várias linhas, essa atividade é chamada de _quebra de linha_ .

Não existe uma fórmula abrangente e determinística que mostre _exatamente_ como contornar as linhas em cada situação. Muitas vezes, existem várias maneiras válidas de quebrar a linha do mesmo trecho de código.

**Nota:** Embora o motivo típico para a quebra de linha seja evitar estourar o limite da coluna, mesmo o código que de fato caberia no limite da coluna _pode_ ser quebra de linha a critério do autor.

**Dica:** Extrair um método ou variável local pode resolver o problema sem a necessidade de quebra de linha.

#### 4.5.1 Onde quebrar

A principal diretriz da quebra de linha é: prefira quebrar em um **nível sintático mais alto** . Também:

1.  Quando uma linha é quebrada em um operador _que não é de atribuição,_ a quebra vem _antes_ do símbolo. (Observe que esta não é a mesma prática usada no estilo Google para outras linguagens, como C++ e JavaScript.)
    *   Isto também se aplica aos seguintes símbolos "semelhantes a operadores":
        *   o separador de ponto ( `.`)
        *   os dois dois pontos de uma referência de método ( `::`)
        *   um e comercial em um tipo vinculado ( )`<T extends Foo & Bar>`
        *   um cano em um bloco catch ( ).`catch (FooException | BarException e)`
2.  Quando uma linha é quebrada em um operador _de atribuição_ , a quebra normalmente vem _depois_ do símbolo, mas de qualquer forma é aceitável.
    *   Isso também se aplica aos dois pontos "semelhantes a um operador de atribuição" em uma `for`instrução aprimorada ("foreach").
3.  Um nome de método ou construtor permanece anexado ao parêntese aberto ( `(`) que o segue.
4.  Uma vírgula ( `,`) permanece anexada ao token que a precede.
5.  Uma linha nunca é quebrada adjacente à seta em um lambda, exceto que uma quebra pode ocorrer imediatamente após a seta se o corpo do lambda consistir em uma única expressão sem colchetes. Exemplos:
```
MyLambda<String, Long, Object> lambda =
    (String label, Long value, Object obj) -> {
        ...
    };

Predicate<String> predicate = str ->
    longExpressionInvolving(str);
```    

**Nota:** O objetivo principal da quebra de linha é ter um código claro, _não necessariamente_ um código que caiba no menor número de linhas.

#### 4.5.2 Indentar linhas de continuação com pelo menos +4 espaços

Ao quebrar a linha, cada linha após a primeira (cada _linha de continuação_ ) é recuada pelo menos +4 da linha original.

Quando há múltiplas linhas de continuação, o recuo pode variar além de +4 conforme desejado. Em geral, duas linhas de continuação usam o mesmo nível de indentação se e somente se começarem com elementos sintaticamente paralelos.

A Seção 4.6.3 sobre [alinhamento horizontal] aborda a prática desencorajada de usar um número variável de espaços para alinhar certos tokens com linhas anteriores.

### 4.6 Espaço em branco

#### 4.6.1 Espaço em branco vertical

Sempre aparece uma única linha em branco:

1.  _Entre_ membros consecutivos ou inicializadores de uma classe: campos, construtores, métodos, classes aninhadas, inicializadores estáticos e inicializadores de instância.
    *   **Exceção:** Uma linha em branco entre dois campos consecutivos (sem nenhum outro código entre eles) é opcional. Essas linhas em branco são usadas conforme necessário para criar _agrupamentos lógicos_ de campos.
    *   **Exceção:** linhas em branco entre constantes enum são abordadas na [Seção 4.8.1] .
2.  Conforme exigido por outras seções deste documento (como a Seção 3, [Estrutura do arquivo de origem].

Uma única linha em branco também pode aparecer em qualquer lugar que melhore a legibilidade, por exemplo, entre instruções para organizar o código em subseções lógicas. Uma linha em branco antes do primeiro membro ou inicializador, ou após o último membro ou inicializador da classe, não é incentivada nem desencorajada.

_Várias_ linhas em branco consecutivas são permitidas, mas nunca obrigatórias (ou incentivadas).

#### 4.6.2 Espaço em branco horizontal

**Além de onde exigido pela linguagem ou outras regras de estilo, e além de literais, comentários e Javadoc, um único espaço ASCII também aparece apenas** nos seguintes locais .

1.  Separar qualquer palavra reservada, como `if`, `for`ou `catch`, de um parêntese aberto ( `(`) que a segue nessa linha
2.  Separar qualquer palavra reservada, como `else`ou `catch`, de uma chave de fechamento ( `}`) que a precede naquela linha
3.  Antes de qualquer chave aberta ( `{`), com duas exceções:
    *   `@SomeAnnotation({a, b})`(nenhum espaço é usado)
    *   `String[][] x = {{"foo"}};`(não é necessário espaço entre `{{`, pelo item 9 abaixo)
4.  Em ambos os lados de qualquer operador binário ou ternário. Isto também se aplica aos seguintes símbolos "semelhantes a operadores":
    
    *   o e comercial em um tipo conjuntivo vinculado: `<T extends Foo & Bar>`
    *   o canal para um bloco catch que lida com múltiplas exceções: `catch (FooException | BarException e)`
    *   os dois pontos ( `:`) em uma `for`instrução aprimorada ("foreach")
    *   a seta em uma expressão lambda: `(String str) -> str.length()`
    
    mas não
    *   os dois dois pontos ( `::`) de uma referência de método, que é escrita como`Object::toString`
    *   o separador de ponto ( `.`), que é escrito como `object.toString()`
5.  Após `,:;`ou o parêntese de fechamento ( `)`) de uma conversão
6.  Entre qualquer conteúdo e uma barra dupla ( `//`) que inicia um comentário. Vários espaços são permitidos.
7.  Entre uma barra dupla ( `//`) que inicia um comentário e o texto do comentário. Vários espaços são permitidos.
8.  Entre o tipo e a variável de uma declaração: `List<String> list`
9.  _Opcional_ apenas dentro de ambos os colchetes de um inicializador de array
    *   `new int[] {5, 6}`e ambos são válidos`new int[] { 5, 6 }`
10.  Entre uma anotação de tipo e `[]`or `...`.

Esta regra nunca é interpretada como exigindo ou proibindo espaço adicional no início ou no final de uma linha; aborda apenas o espaço _interior_ .

#### 4.6.3 Alinhamento horizontal: nunca necessário

**Nota sobre terminologia:** _alinhamento horizontal_ é a prática de adicionar um número variável de espaços adicionais em seu código com o objetivo de fazer com que certos tokens apareçam diretamente abaixo de outros tokens nas linhas anteriores.

Esta prática é permitida, mas **nunca exigida** pelo Google Style. Nem é necessário _manter_ o alinhamento horizontal em locais onde já foi utilizado.

Aqui está um exemplo sem alinhamento e depois usando alinhamento:

privado intx ;​ // tudo bem private Color color ; // isto também  
  

privado intx ;   ​ // permitido, mas edições futuras private Color color ; // pode deixá-lo desalinhado       
   

**Dica:** O alinhamento pode ajudar na legibilidade, mas cria problemas para manutenção futura. Considere uma mudança futura que precise afetar apenas uma linha. Essa alteração pode deixar a formatação anteriormente agradável distorcida, e isso é **permitido** . Mais frequentemente, ele solicita ao codificador (talvez você) que ajuste também os espaços em branco nas linhas próximas, possivelmente desencadeando uma série de reformatações em cascata. Essa mudança de uma linha agora tem um “raio de explosão”. Na pior das hipóteses, isso pode resultar em trabalho desnecessário, mas, na melhor das hipóteses, ainda corrompe as informações do histórico de versões, retarda os revisores e agrava os conflitos de mesclagem.

### 4.7 Agrupamento de parênteses: recomendado

Os parênteses de agrupamento opcionais são omitidos somente quando o autor e o revisor concordam que não há chance razoável de o código ser mal interpretado sem eles, nem teriam tornado o código mais fácil de ler. _Não_ é razoável supor que cada leitor tenha memorizada toda a tabela de precedência de operadores Java.

### 4.8 Construtos específicos

#### 4.8.1 Classes de Enum

Após cada vírgula que segue uma constante enum, uma quebra de linha é opcional. Linhas em branco adicionais (geralmente apenas uma) também são permitidas. Esta é uma possibilidade:
```
private enum Answer {
  YES {
    @Override public String toString() {
      return "yes";
    }
  },

  NO,
  MAYBE
}
```
Uma classe enum sem métodos e sem documentação sobre suas constantes pode opcionalmente ser formatada como se fosse um inicializador de array (veja Seção 4.8.3.1 sobre [inicializadores de array].
```
private enum Suit { PAUS , CORAÇÕES , ESPADAS , DIAMANTES }   
```
Como as classes enum _são classes_ , todas as outras regras para formatação de classes se aplicam.

#### 4.8.2 Declarações de variáveis

##### 4.8.2.1 Uma variável por declaração

Cada declaração de variável (campo ou local) declara apenas uma variável: declarações como `int a, b;`não são usadas.

**Exceção:** declarações múltiplas de variáveis ​​são aceitáveis ​​no cabeçalho de um `for`loop.

##### 4.8.2.2 Declarado quando necessário

Variáveis ​​locais **não** são habitualmente declaradas no início do bloco que as contém ou na construção semelhante a um bloco. Em vez disso, as variáveis ​​locais são declaradas perto do ponto em que são usadas pela primeira vez (dentro do razoável), para minimizar seu escopo. As declarações de variáveis ​​locais normalmente possuem inicializadores ou são inicializadas imediatamente após a declaração.

#### 4.8.3 Arrays

##### 4.8.3.1 Inicializadores de array: podem ser "semelhantes a blocos"

Qualquer inicializador de array pode _opcionalmente_ ser formatado como se fosse uma "construção semelhante a um bloco". Por exemplo, os itens a seguir são todos válidos ( **não é** uma lista exaustiva):
```
new int[] {           
  0, 1, 2, 3
}

new int[] {
    0,
    1,
    2,
    3,
}

new int[] {
  0, 1,
  2, 3
}

new int[]
    {0, 1, 2, 3}
```
##### 4.8.3.2 Nenhuma declaração de array no estilo C

Os colchetes fazem parte do _tipo_ , não da variável:, não .`String[] args``String args[]`

#### 4.8.4 Declarações de comutação

**Nota sobre terminologia:** Dentro dos colchetes de um _bloco switch_ há um ou mais _grupos de instruções_ . Cada grupo de instruções consiste em um ou mais _rótulos de switch_ ( ou ), seguidos por uma ou mais instruções (ou, para o _último_ grupo de instruções, _zero_ ou mais instruções).`case FOO:``default:`

##### 4.8.4.1 Recuo

Como acontece com qualquer outro bloco, o conteúdo de um bloco switch é recuado +2.

Após um rótulo de switch, há uma quebra de linha e o nível de indentação aumenta +2, exatamente como se um bloco estivesse sendo aberto. O seguinte rótulo de switch retorna ao nível de indentação anterior, como se um bloco tivesse sido fechado.

##### 4.8.4.2 Fall-through: comentado

Dentro de um bloco switch, cada grupo de instruções termina abruptamente (com uma exceção `break`, `continue`, `return`ou lançada) ou é marcado com um comentário para indicar que a execução continuará ou _poderá_ continuar no próximo grupo de instruções. Qualquer comentário que comunique a ideia de falha é suficiente (normalmente `// fall through`). Este comentário especial não é necessário no último grupo de instruções do bloco switch. Exemplo:
```
switch (input) {
  case 1:
  case 2:
    prepareOneOrTwo();
    // fall through
  case 3:
    handleOneTwoOrThree();
    break;
  default:
    handleLargeNumber(input);
}
```
Observe que nenhum comentário é necessário depois , apenas no final do grupo de instruções.`case 1:`

##### 4.8.4.3 Presença da `default`etiqueta

Cada instrução switch inclui um `default`grupo de instruções, mesmo que não contenha código.

**Exceção:** uma instrução switch para um `enum`tipo _pode_ omitir o `default`grupo de instruções, _se_ incluir casos explícitos cobrindo _todos_ os valores possíveis desse tipo. Isso permite que IDEs ou outras ferramentas de análise estática emitam um aviso se algum caso for perdido.

#### 4.8.5 Anotações

##### 4.8.5.1 Anotações de uso de tipo

As anotações de uso de tipo aparecem imediatamente antes do tipo anotado. Uma anotação é uma anotação de uso de tipo se for meta-anotada com . Exemplo:`@Target(ElementType.TYPE_USE)`

final @Nullable String nome ;  

public @Nullable Person getPersonByName ( String nome );  

##### 4.8.5.2 Anotações de classe

As anotações aplicadas a uma classe aparecem imediatamente após o bloco de documentação e cada anotação é listada em uma linha própria (ou seja, uma anotação por linha). Essas quebras de linha não constituem quebra de linha (Seção 4.5, [Quebra de linha], portanto o nível de recuo não é aumentado. Exemplo:
```
@Deprecated @CheckReturnValue classe final pública Frozzler { ... }
      
```
##### 4.8.5.3 Anotações de método e construtor

As regras para anotações em declarações de métodos e construtores são as mesmas da [seção anterior] . Exemplo:
```
@Deprecated @Override public String getNameIfPresent () { ... }
    
```
**Exceção:** Uma _única_ anotação sem parâmetros _pode_ aparecer junto com a primeira linha da assinatura, por exemplo:
```
@Override public int hashCode () { ... }     
```
##### 4.8.5.4 Anotações de campo

As anotações aplicadas a um campo também aparecem imediatamente após o bloco de documentação, mas neste caso, _múltiplas_ anotações (possivelmente parametrizadas) podem ser listadas na mesma linha; por exemplo:
```
@Partial @Mock DataLoader carregador ;  
```
##### 4.8.5.5 Anotações de parâmetros e variáveis ​​locais

Não existem regras específicas para formatação de anotações em parâmetros ou variáveis ​​locais (exceto, é claro, quando a anotação é uma anotação de uso de tipo).

#### 4.8.6 Comentários

Esta seção aborda _comentários de implementação_ . Javadoc é abordado separadamente na Seção 7, [Javadoc] .

Qualquer quebra de linha pode ser precedida por um espaço em branco arbitrário seguido por um comentário de implementação. Tal comentário torna a linha não em branco.

##### 4.8.6.1 Estilo de comentário em bloco

Os comentários do bloco são recuados no mesmo nível do código circundante. Eles podem estar em `/* ... */`estilo ou `// ...`estilo. Para comentários de múltiplas linhas `/* ... */`, as linhas subsequentes devem começar `*`alinhadas com `*`a linha anterior.
```
/*
 * This is          // And so           /* Or you can
 * okay.            // is this.          * even do this. */
 */
```

Os comentários não são colocados em caixas desenhadas com asteriscos ou outros caracteres.

**Dica:** Ao escrever comentários de várias linhas, use o `/* ... */`estilo se desejar que os formatadores automáticos de código reenquadrem as linhas quando necessário (estilo de parágrafo). A maioria dos formatadores não quebra linhas em `// ...`blocos de comentários de estilo.

#### 4.8.7 Modificadores

Modificadores de classe e membro, quando presentes, aparecem na ordem recomendada pela Especificação da Linguagem Java:

público protegido privado abstrato padrão estático final transitório volátil sincronizado nativo strictfp

#### 4.8.8 Literais Numéricos

`long`Literais inteiros com valor usam um `L`sufixo maiúsculo, nunca minúsculo (para evitar confusão com o dígito `1`). Por exemplo, `3000000000L` em vez de `3000000000l`.

5 Nomenclatura
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 5.1 Regras comuns a todos os identificadores

Os identificadores usam apenas letras e dígitos ASCII e, em um pequeno número de casos indicados abaixo, sublinhados. Assim, cada nome de identificador válido é correspondido pela expressão regular `\w+`.

No Google Style, prefixos ou sufixos especiais **não** são usados. Por exemplo, esses nomes não são do estilo Google : `name_`, e .`mName``s_name``kName`

### 5.2 Regras por tipo de identificador

#### 5.2.1 Nomes de pacotes

Os nomes dos pacotes usam apenas letras minúsculas e dígitos (sem sublinhados). Palavras consecutivas são simplesmente concatenadas. Por exemplo, `com.example.deepspace`, não `com.example.deepSpace`ou `com.example.deep_space`.

#### 5.2.2 Nomes de classes

Os nomes das classes são escritos em [UpperCamelCase] .

Os nomes das classes são normalmente substantivos ou sintagmas nominais. Por exemplo, `Character`ou `ImmutableList`. Os nomes de interface também podem ser substantivos ou frases nominais (por exemplo, `List`), mas às vezes podem ser adjetivos ou frases adjetivas (por exemplo, `Readable`).

Não existem regras específicas ou mesmo convenções bem estabelecidas para nomear tipos de anotação.

Uma classe _de teste_ tem um nome que termina com `Test`, por exemplo, `HashIntegrationTest`. Se abranger uma única classe, seu nome será o nome dessa classe mais `Test`, por exemplo `HashImplTest`.

#### 5.2.3 Nomes de métodos

Os nomes dos métodos são escritos em [lowerCamelCase] .

Os nomes dos métodos são normalmente verbos ou frases verbais. Por exemplo, `sendMessage`ou `stop`.

_Os sublinhados podem aparecer nos nomes dos métodos de teste_ JUnit para separar os componentes lógicos do nome, com _cada_ componente escrito em [lowerCamelCase] , por exemplo `transferMoney_deductsFromSource`. Não existe uma maneira correta de nomear métodos de teste.

#### 5.2.4 Nomes constantes

Os nomes de constantes usam `UPPER_SNAKE_CASE`: todas as letras maiúsculas, com cada palavra separada da próxima por um único sublinhado. Mas o que _é_ uma constante, exatamente?

Constantes são campos finais estáticos cujo conteúdo é profundamente imutável e cujos métodos não apresentam efeitos colaterais detectáveis. Os exemplos incluem primitivos, strings, classes de valores imutáveis ​​e qualquer coisa definida como `null`. Se algum estado observável da instância puder mudar, não será uma constante. A mera _intenção_ de nunca alterar o objeto não é suficiente. Exemplos:
```
// Constants
static final int NUMBER = 5;
static final ImmutableList<String> NAMES = ImmutableList.of("Ed", "Ann");
static final Map<String, Integer> AGES = ImmutableMap.of("Ed", 35, "Ann", 32);
static final Joiner COMMA_JOINER = Joiner.on(','); // because Joiner is immutable
static final SomeMutableType[] EMPTY_ARRAY = {};

// Not constants
static String nonFinal = "non-final";
final String nonStatic = "non-static";
static final Set<String> mutableCollection = new HashSet<String>();
static final ImmutableSet<SomeMutableType> mutableElements = ImmutableSet.of(mutable);
static final ImmutableMap<String, SomeMutableType> mutableValues =
    ImmutableMap.of("Ed", mutableInstance, "Ann", mutableInstance2);
static final Logger logger = Logger.getLogger(MyClass.getName());
static final String[] nonEmptyArray = {"these", "can", "change"};
```
Esses nomes são normalmente substantivos ou sintagmas nominais.

#### 5.2.5 Nomes de campos não constantes

Nomes de campos não constantes (estáticos ou não) são escritos em [lowerCamelCase] .

Esses nomes são normalmente substantivos ou sintagmas nominais. Por exemplo, `computedValues`ou `index`.

#### 5.2.6 Nomes dos parâmetros

Os nomes dos parâmetros são escritos em [lowerCamelCase] .

Nomes de parâmetros com um caractere em métodos públicos devem ser evitados.

#### 5.2.7 Nomes de variáveis ​​locais

Os nomes das variáveis ​​locais são escritos em [lowerCamelCase] .

Mesmo quando finais e imutáveis, as variáveis ​​locais não são consideradas constantes e não devem ser denominadas como constantes.

#### 5.2.8 Digite nomes de variáveis

Cada variável de tipo é nomeada em um dos dois estilos:

*   Uma única letra maiúscula, opcionalmente seguida por um único número (como `E`, `T`, `X`, `T2`)
*   Um nome no formato usado para classes (veja Seção 5.2.2, [Nomes de classes].

### 5.3 Camel case: definido

Às vezes, há mais de uma maneira razoável de converter uma frase em inglês para camel case, como quando siglas ou construções incomuns como "IPv6" ou "iOS" estão presentes. Para melhorar a previsibilidade, o Google Style especifica o seguinte esquema (quase) determinístico.

Começando com a forma em prosa do nome:

1.  Converta a frase para ASCII simples e remova quaisquer apóstrofos. Por exemplo, o "algoritmo de Müller" pode se tornar "algoritmo de Muellers".
2.  Divida esse resultado em palavras, dividindo em espaços e qualquer pontuação restante (normalmente hífens).
    *   _Recomendado:_ se alguma palavra já tiver uma aparência convencional de camelo no uso comum, divida-a em suas partes constituintes (por exemplo, "AdWords" torna-se "palavras publicitárias"). Observe que uma palavra como "iOS" não está na caixa de camelo _em si_ ; desafia _qualquer_ convenção, portanto esta recomendação não se aplica.
3.  Agora coloque _tudo_ em letras minúsculas (incluindo siglas) e, em seguida, coloque em maiúscula apenas o primeiro caractere de:
    *   ... cada palavra, para produzir _caixa de camelo superior_ , ou
    *   ... cada palavra, exceto a primeira, para produzir _caixa de camelo minúscula_
4.  Por fim, junte todas as palavras em um único identificador.

Observe que a caixa das palavras originais é quase totalmente desconsiderada. Exemplos:

| Prose form               | Correct                           | Incorrect             |
|---------------------------|-----------------------------------|-----------------------|
| "XML HTTP request"        | `XmlHttpRequest`                 | `XMLHTTPRequest`      |
| "new customer ID"         | `newCustomerId`                  | `newCustomerID`       |
| "inner stopwatch"         | `innerStopwatch`                 | `innerStopWatch`      |
| "supports IPv6 on iOS?"   | `supportsIpv6OnIos`              | `supportsIPv6OnIOS`   |
| "YouTube importer"        | `YouTubeImporter`<br></br>`YoutubeImporter`* |                       |
| "Turn on 2SV"             | `turnOn2sv`                      | `turnOn2Sv`           |

\*Aceitável, mas não recomendado.

**Nota:** Algumas palavras são hifenizadas de forma ambígua no idioma inglês: por exemplo, "nonempty" e "non-empty" estão corretos, portanto, os nomes dos métodos `checkNonempty`e `checkNonEmpty`também estão corretos.

6 práticas de programação
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 6.1 `@Override`: sempre usado

Um método é marcado com a `@Override`anotação sempre que for legal. Isso inclui um método de classe que substitui um método de superclasse, um método de classe que implementa um método de interface e um método de interface que reespecifica um método de superinterface.

**Exceção:** `@Override` pode ser omitida quando o método pai for `@Deprecated`.

### 6.2 Exceções capturadas: não ignoradas

Exceto conforme indicado abaixo, muito raramente é correto não fazer nada em resposta a uma exceção detectada. (As respostas típicas são registrá-lo ou, se for considerado "impossível", relançá-lo como um arquivo `AssertionError`.)

Quando for realmente apropriado não realizar nenhuma ação em um bloco catch, a razão pela qual isso é justificado é explicada em um comentário.
```
try {
  int i = Integer.parseInt(response);
  return handleNumericResponse(i);
} catch (NumberFormatException ok) {
  // it's not numeric; that's fine, just continue
}
return handleTextResponse(response);
```
  
   
  

**Exceção:** em testes, uma exceção capturada pode ser ignorada sem comentários _se_ seu nome for ou começar com `expected`. A seguir está uma expressão muito comum para garantir que o código em teste _gere_ uma exceção do tipo esperado, portanto, um comentário é desnecessário aqui.
```
try {
  emptyStack.pop();
  fail();
} catch (NoSuchElementException expected) {
}
```

### 6.3 Membros estáticos: qualificados usando classe

Quando uma referência a um membro de classe estática deve ser qualificada, ela é qualificada com o nome dessa classe, e não com uma referência ou expressão do tipo dessa classe.
```
Foo aFoo = ...;
Foo.aStaticMethod(); // good
aFoo.aStaticMethod(); // bad
somethingThatYieldsAFoo().aStaticMethod(); // very bad
``` 
 
 

### 6.4 Finalizadores: não utilizados

É **extremamente raro** substituir .`Object.finalize`

**Dica:** não faça isso. Se for absolutamente necessário, primeiro leia e entenda [o Item 8](http://books.google.com/books?isbn=0134686047) [_do Java Efetivo_](http://books.google.com/books?isbn=0134686047) , "Evite finalizadores e produtos de limpeza" com muito cuidado e _depois_ não faça isso.

7 Javadoc
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 7.1 Formatação

#### 7.1.1 Forma geral

A formatação _básica_ dos blocos Javadoc é vista neste exemplo:
```
/**
 * Multiple lines of Javadoc text are written here,
 * wrapped normally...
 */
public int method(String p1) { ... }
```    

... ou neste exemplo de linha única:
```
/** An especially short bit of Javadoc. */
```
A forma básica é sempre aceitável. O formulário de linha única pode ser substituído quando todo o bloco Javadoc (incluindo marcadores de comentários) puder caber em uma única linha. Observe que isso só se aplica quando não há tags de bloco como `@return`.

#### 7.1.2 Parágrafos

Uma linha em branco — ou seja, uma linha contendo apenas o asterisco inicial alinhado ( `*`) — aparece entre os parágrafos e antes do grupo de tags de bloco, se presente. Cada parágrafo, exceto o primeiro, vem `<p>`imediatamente antes da primeira palavra, sem espaço depois dela. Tags HTML para outros elementos de nível de bloco, como `<ul>`ou `<table>`, _não_ são precedidas de `<p>`.

#### 7.1.3 Bloquear tags

Qualquer uma das "tags de bloco" padrão usadas aparece na ordem `@param`, `@return`, `@throws`, `@deprecated`, e esses quatro tipos nunca aparecem com uma descrição vazia. Quando uma tag de bloco não cabe em uma única linha, as linhas de continuação são recuadas quatro (ou mais) espaços da posição do `@`.

### 7.2 O fragmento de resumo

Cada bloco Javadoc começa com um breve **fragmento de resumo** . Este fragmento é muito importante: é a única parte do texto que aparece em determinados contextos, como índices de classes e métodos.

Este é um fragmento – um sintagma nominal ou verbal, não uma frase completa. Não **começa** com `A {@code Foo} is a...`, ou `This method returns...`, nem forma uma frase imperativa completa como `Save the record.`. No entanto, o fragmento está em maiúscula e pontuado como se fosse uma frase completa.

**Dica:** Um erro comum é escrever Javadoc simples no formato `/** @return the customer ID */`. Isso está incorreto e deve ser alterado para `/** Returns the customer ID. */`.

### 7.3 Onde o Javadoc é usado

No _mínimo_ , o Javadoc está presente para todas `public`as classes e para todos `public`os `protected`membros de tal classe, com algumas exceções indicadas abaixo.

Conteúdo Javadoc adicional também pode estar presente, conforme explicado na Seção 7.3.4, [Javadoc não obrigatório] .

#### 7.3.1 Exceção: membros autoexplicativos

Javadoc é opcional para membros "simples e óbvios" como , nos casos em que _realmente_ não há mais nada que valha a pena dizer a não ser "Retorna o foo".`getFoo()`

**Importante:** não é apropriado citar esta exceção para justificar a omissão de informações relevantes que um leitor típico possa precisar saber. Por exemplo, para um método chamado `getCanonicalName`, não omita sua documentação (com a justificativa de que diria apenas `/** Returns the canonical name. */`) se um leitor típico não tiver ideia do que significa o termo "nome canônico"!

#### 7.3.2 Exceção: substituições

O Javadoc nem sempre está presente em um método que substitui um método de supertipo.

#### 7.3.4 Javadoc não obrigatório

Outras classes e membros possuem Javadoc _conforme necessário ou desejado_ .

Sempre que um comentário de implementação for usado para definir o propósito ou comportamento geral de uma classe ou membro, esse comentário será escrito como Javadoc (usando `/**`).

O Javadoc não é obrigatório, não é obrigado a seguir as regras de formatação das Seções 7.1.1, 7.1.2, 7.1.3 e 7.2, embora seja obviamente recomendado.
