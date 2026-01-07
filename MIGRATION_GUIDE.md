# Guia de Migração para MongoDB (Produção)

Este guia explica como sair do modo de desenvolvimento (arquivos JSON) para o modo de produção (MongoDB Atlas), garantindo escalabilidade e persistência real.

## Passo 1: Criar Banco de Dados no MongoDB Atlas
1.  Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Crie um Cluster (o plano "Shared" ou "Free" é suficiente para começar).
3.  Em "Database Access", crie um usuário e senha.
4.  Em "Network Access", permita o IP `0.0.0.0/0` (para acesso de qualquer lugar) ou apenas o seu IP.
5.  Clique em "Connect" > "Connect your application".
6.  Copie a **Connection String** (ex: `mongodb+srv://user:pass@cluster.mongodb.net/...`).

## Passo 2: Configurar o Backend
1.  Abra o arquivo `backend/.env`.
2.  Cole sua connection string em `MONGODB_URI`.
3.  Altere `USE_MONGODB` para `true`.

Exemplo:
```env
MONGODB_URI=mongodb+srv://admin:senha123@cluster0.abcde.mongodb.net/ai-kids-labs?retryWrites=true&w=majority
USE_MONGODB=true
```

## Passo 3: Migrar Dados (Opcional)
Se você já tem usuários e progresso salvos nos arquivos JSON e quer levá-los para o MongoDB:

1.  No terminal, vá para a pasta `backend`.
2.  Execute o script de migração:
    ```bash
    node migrate-to-mongo.js
    ```
3.  Aguarde a mensagem "✅ Data Imported Successfully!".

## Passo 4: Reiniciar
Reinicie o servidor backend:
```bash
npm run dev
```
Agora o sistema estará lendo e gravando no MongoDB na nuvem.
