"use strict";(self.webpackChunksgpp_tech_guide=self.webpackChunksgpp_tech_guide||[]).push([[441],{4815:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>t,contentTitle:()=>d,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"ibm-baw/client-side-exception-wrapper","title":"Client-Side Exception Wrapper","description":"\ud83d\udd0d\ufe0f Local de cria\xe7\xe3o: IBM BAW","source":"@site/docs/ibm-baw/client-side-exception-wrapper.md","sourceDirName":"ibm-baw","slug":"/ibm-baw/client-side-exception-wrapper","permalink":"/sgpp-tech-guide/docs/ibm-baw/client-side-exception-wrapper","draft":false,"unlisted":false,"editUrl":"https://github.com/ppsa-sgpp/sgpp-tech-guide/edit/main/docs/ibm-baw/client-side-exception-wrapper.md","tags":[],"version":"current","frontMatter":{"title":"Client-Side Exception Wrapper"},"sidebar":"tutorialSidebar","previous":{"title":"Servi\xe7o REST Ass\xedncrono","permalink":"/sgpp-tech-guide/docs/ibm-baw/servico-rest-assincrono"},"next":{"title":"Servi\xe7os de Persist\xeancia via General Purpose Entity","permalink":"/sgpp-tech-guide/docs/ibm-baw/servico-persistir-general-purpose-entity"}}');var o=s(4848),n=s(8453);const a={title:"Client-Side Exception Wrapper"},d=void 0,t={},c=[{value:"Diagrama BPMN",id:"diagrama-bpmn",level:3},{value:"Pr\xe9 requisitos",id:"pr\xe9-requisitos",level:3},{value:"Etapas de execu\xe7\xe3o",id:"etapas-de-execu\xe7\xe3o",level:2},{value:"1. Definir par\xe2metros de entrada, sa\xedda e privados",id:"1-definir-par\xe2metros-de-entrada-sa\xedda-e-privados",level:3},{value:"2. Adicionar o Services encapsulado j\xe1 criado :",id:"2-adicionar-o-services-encapsulado-j\xe1-criado-",level:3},{value:"3. Adicionar Scripts para definir o valor da vari\xe1vel <em>isRest</em> nos fluxos dos boundary event&#39;s",id:"3-adicionar-scripts-para-definir-o-valor-da-vari\xe1vel-isrest-nos-fluxos-dos-boundary-events",level:3},{value:"4. Usar Nested Client-Side Service  Service Exception Treatment do toolkit <em>TKHE_HandleErrors</em>:",id:"4-usar-nested-client-side-service--service-exception-treatment-do-toolkit-tkhe_handleerrors",level:3},{value:"5. Usar Gateway:",id:"5-usar-gateway",level:3}];function l(e){const r={a:"a",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(r.p,{children:["\ud83d\udd0d\ufe0f ",(0,o.jsx)(r.strong,{children:"Local de cria\xe7\xe3o:"})," IBM BAW",(0,o.jsx)(r.br,{}),"\n","\u231b\ufe0f ",(0,o.jsx)(r.strong,{children:"Tempo estimado:"})," 1 horas",(0,o.jsx)(r.br,{}),"\n","\ud83d\udd27 ",(0,o.jsx)(r.strong,{children:"Fun\xe7\xe3o:"})," Encapsular um servi\xe7o j\xe1 criado em um processo de tratamento de erro client-side\r\n\ud83c\udff7\ufe0f ",(0,o.jsx)(r.strong,{children:"Nome:"}),' O nome desse servi\xe7o deve ser o mesmo do servi\xe7o encapsulado (sem sufixo SF) + "Wrapper"']}),"\n",(0,o.jsx)(r.h3,{id:"diagrama-bpmn",children:"Diagrama BPMN"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.img,{alt:"BPMN",src:s(601).A+"",width:"480",height:"307"})}),"\n",(0,o.jsx)(r.h3,{id:"pr\xe9-requisitos",children:"Pr\xe9 requisitos"}),"\n",(0,o.jsxs)(r.p,{children:["Ter um servi\xe7o do tipo ",(0,o.jsx)(r.strong,{children:"Servi\xe7o REST no IBM BAW"})," j\xe1 criado. Vide ",(0,o.jsx)(r.a,{href:"/sgpp-tech-guide/docs/ibm-baw/servicos-rest",children:"Configura\xe7\xe3o do Servi\xe7o REST no IBM BAW"}),(0,o.jsx)(r.br,{}),"\n","Esse servi\xe7o deve ser criado como nested service;",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.img,{alt:"Nested Service",src:s(3547).A+"",width:"480",height:"336"})]}),"\n",(0,o.jsx)(r.h2,{id:"etapas-de-execu\xe7\xe3o",children:"Etapas de execu\xe7\xe3o"}),"\n",(0,o.jsx)(r.h3,{id:"1-definir-par\xe2metros-de-entrada-sa\xedda-e-privados",children:"1. Definir par\xe2metros de entrada, sa\xedda e privados"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Vari\xe1veis de entrada:"})," Defina os par\xe2metros de entrada com os mesmos nomes e tipos do servi\xe7o encapsulado"]}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Vari\xe1veis de sa\xedda:"})," Defina os par\xe2metros de sa\xedda com os mesmos nomes e tipos do servi\xe7o encapsulado"]}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Vari\xe1veis privadas:"})," As seguintes vari\xe1veis devem ser definidas:"]}),"\n",(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.strong,{children:"isRest"})," do tipo Boolean"]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.strong,{children:"showCancel"})," do tipo Boolean"]}),"\n",(0,o.jsxs)(r.li,{children:[(0,o.jsx)(r.strong,{children:"error - do tipo ErrorBO definido no toolkit TKHE_HandleErrors \u25cbacao"})," do tipo String"]}),"\n"]}),"\n",(0,o.jsx)(r.h3,{id:"2-adicionar-o-services-encapsulado-j\xe1-criado-",children:"2. Adicionar o Services encapsulado j\xe1 criado :"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Nome:"})," O nome deve ser o nome do servi\xe7o",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Fun\xe7\xe3o:"})," Exceutar o servi\xe7o encapsulado",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Configura\xe7\xe3o:"})," Configure as propriedades de entrada e sa\xedda do servi\xe7o de acordo com as vari\xe1veis de entrada e sa\xedda do Wrapper",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Erro:"})," Servi\xe7os encapsulados geralmente lan\xe7am uma exce\xe7\xe3o do tipo IntegrationError (que retorna um objeto do tipo ErrorBO) e um do tipo ConfigurationError (que retorna um objeto do tipo ErrorBO), definidos no toolkit TKISC_IntegracoesSistemicasComuns.",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Boundary Event:"})," Adicionar um boundary event para cada um desses erros"]}),"\n",(0,o.jsxs)(r.h3,{id:"3-adicionar-scripts-para-definir-o-valor-da-vari\xe1vel-isrest-nos-fluxos-dos-boundary-events",children:["3. Adicionar Scripts para definir o valor da vari\xe1vel ",(0,o.jsx)(r.em,{children:"isRest"})," nos fluxos dos boundary event's"]}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Nome:"})," O nome deve ser ",(0,o.jsx)(r.em,{children:"Set isRest true"})," para o fluxo do ",(0,o.jsx)(r.em,{children:"IntegrationError"})," e ",(0,o.jsx)(r.em,{children:"Set isRest false"})," para o fluxo do ",(0,o.jsx)(r.em,{children:"ConfigurationError"}),(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Fun\xe7\xe3o:"})," Definir o valor da vari\xe1vel isRest",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Defini\xe7\xe3o da vari\xe1vel isRest:"}),"  Defina a vari\xe1vel isRest como ",(0,o.jsx)(r.em,{children:"true"})," para o fluxo do ",(0,o.jsx)(r.em,{children:"IntegrationError"})," e ",(0,o.jsx)(r.em,{children:"false"})," para o fluxo do ",(0,o.jsx)(r.em,{children:"ConfigurationError"})," em seus respectivos scripts",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Exemplo:"})]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-javascript",children:"tw.local.isRest = false;\n"})}),"\n",(0,o.jsxs)(r.h3,{id:"4-usar-nested-client-side-service--service-exception-treatment-do-toolkit-tkhe_handleerrors",children:["4. Usar Nested Client-Side Service  Service Exception Treatment do toolkit ",(0,o.jsx)(r.em,{children:"TKHE_HandleErrors"}),":"]}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Nome:"})," Tratar Excecao",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Fun\xe7\xe3o:"})," Tratar a exce\xe7\xe3o de maneira amig\xe1vel",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Configura\xe7\xe3o:"})," Defina as propriedades de entrada error, isRest e showCancel com as vari\xe1veis privadas. Defina a propriedade acao com a vari\xe1vel privada"]}),"\n",(0,o.jsx)(r.h3,{id:"5-usar-gateway",children:"5. Usar Gateway:"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Nome:"})," Cancelar?",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Fun\xe7\xe3o:"})," Verificar se usu\xe1rio solicitou pelo cancelamento do servi\xe7o encapsulado",(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Configura\xe7\xe3o:"})," no fluxo ",(0,o.jsx)(r.em,{children:"sim"}),' dever\xe1 se comparar a vari\xe1vel privada a\xe7\xe3o com a String "Cancelar"',(0,o.jsx)(r.br,{}),"\n",(0,o.jsx)(r.strong,{children:"Exemplo:"})]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-javascript",children:'tw.local.acao === "Cancelar"\n'})})]})}function p(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},3547:(e,r,s)=>{s.d(r,{A:()=>i});const i=s.p+"assets/images/client-side-exception-wrapper-nested-service-15b44e2117d7079793cac7577fae76b7.png"},601:(e,r,s)=>{s.d(r,{A:()=>i});const i=s.p+"assets/images/client-side-exception-wrapper-f8771c12f9afb436bd3c03802971994b.png"},8453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>d});var i=s(6540);const o={},n=i.createContext(o);function a(e){const r=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(n.Provider,{value:r},e.children)}}}]);