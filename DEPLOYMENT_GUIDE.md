# Guia de Deploy - A.I. Kids Labs (Full Stack)

Este projeto está configurado para ser uma aplicação Full Stack com Backend em Node.js e Frontend em React.

## 1. Estrutura do Projeto

- **/backend**: Servidor Node.js/Express (API, Autenticação, Banco de Dados).
- **/src**: Frontend React (Interface, Player, Lógica de Apresentação).
- **.env.development**: Configuração para desenvolvimento local.
- **.env.production**: Configuração para produção.

## 2. Como Rodar Localmente (DEV)

Basta executar o script `start-fullstack.bat` na raiz do projeto. Ele abrirá dois terminais:
1. Backend na porta 5001.
2. Frontend na porta 5173.

## 3. Como Fazer Deploy em Produção (PROD)

### Backend (Render / Railway / Heroku)
1. Crie um novo serviço Web no seu provedor de hospedagem.
2. Aponte para o repositório do projeto.
3. Configure o diretório raiz (Root Directory) como `backend`.
4. Defina o comando de build: `npm install`.
5. Defina o comando de start: `npm start`.
6. Adicione as variáveis de ambiente necessárias (JWT_SECRET, etc.).

### Frontend (Vercel / Netlify / GitHub Pages)
1. Configure o build para apontar para a raiz do projeto.
2. Comando de Build: `npm run build`.
3. Diretório de saída: `dist` (ou o que estiver no vite.config.ts).
4. **IMPORTANTE**: Adicione a variável de ambiente `VITE_API_URL` apontando para a URL do seu Backend (ex: `https://seu-backend.onrender.com`).

## 4. Alternância Automática DEV/PROD

O frontend detecta automaticamente o ambiente:
- Se estiver rodando local (`npm run dev`), usa `http://localhost:5001`.
- Se for buildado (`npm run build`), usa a variável `VITE_API_URL` definida no servidor de deploy.

## 5. Banco de Dados

- Por padrão, o backend usa um arquivo JSON local (`backend/data/modules.json`) para facilitar testes.
- Para produção real, configure a variável `USE_MONGODB=true` e `MONGODB_URI` no backend para conectar a um banco MongoDB (Atlas, etc.).
