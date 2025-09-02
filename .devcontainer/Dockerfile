# Usamos uma imagem base LTS do Node.js.
FROM node:18-bullseye-slim

# Definimos o diretório de trabalho.
WORKDIR /app

# Instalação do pnpm e do Git em uma única etapa para otimização do Docker.
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm

# Apenas para garantir que o usuário 'node' tenha permissão para o diretório de trabalho.
RUN chown -R node:node /app

# Definimos o usuário para 'node' para segurança.
USER node