# 1. Define a imagem de origem base
FROM node:24-alpine

# 2. define o diretório de trabalho interno do container
WORKDIR /app

# 3. instalar o pnpm globalmente para gerenciar as dependências
RUN npm install -g pnpm@11.20

# desativa a restrição do pnpm 11
RUN echo "strictDepBuilds: false" > pnpm-workspace.yaml

# 4. Copiar apenas o manifesto de dependências
COPY package.json ./

# 5. instalar as dependências do projeto
RUN pnpm install

# 6. Copiar todo o restante do código
# da raiz do projeto para a raiz do container
COPY . .

# 7. expoe a porta padrão LDW
EXPOSE 3000

# 8. Comando para inicializar a aplicação
CMD ["pnpm", "dev"]