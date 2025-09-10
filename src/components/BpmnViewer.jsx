import React, { useEffect, useRef } from 'react';
import BpmnJS from 'bpmn-js';
import useBaseUrl from '@docusaurus/useBaseUrl';

const BpmnViewer = ({ src }) => {
  console.log("File",src);
  const viewerRef = useRef(null);
  const bpmnUrl = useBaseUrl(src);

  useEffect(() => {
    const viewer = new BpmnJS({ container: viewerRef.current });
    fetch(bpmnUrl)
      .then((response) => response.text())
      .then((bpmnXml) => {
        console.log('Conteúdo XML:', bpmnXml);
        viewer.importXML(bpmnXml)
        .then(() => {
            // Ajusta o zoom para que o diagrama inteiro caiba no contêiner
            viewer.get('canvas').zoom('fit-viewport', { padding: 50 });
          })
          .catch((err) => console.error('Erro ao renderizar o diagrama:', err));
      })
      .catch((err) => console.error('Erro ao carregar o diagrama BPMN:', err));
  }, [src]);

  return <div ref={viewerRef} style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}></div>;
};

export default BpmnViewer;
