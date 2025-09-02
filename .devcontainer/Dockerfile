# Usamos uma imagem base LTS do Node.js, com as últimas atualizações de segurança.
FROM node:18-bullseye-slim

# Definimos o diretório de trabalho dentro do container.
WORKDIR /app

# Instalação global do pnpm.
RUN npm install -g pnpm

# Apenas para garantir que o usuário 'node' tenha permissão para o diretório de trabalho.
RUN chown -R node:node /app

# Definimos o usuário para o 'node' para segurança.
USER node