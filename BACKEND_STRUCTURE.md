# A.I. KIDS LABS - Estrutura do Backend

## Visão Geral
A.I. Kids Labs é uma plataforma educacional completa com 50 módulos organizados em 5 fases pedagógicas, com suporte a vídeos, quizzes interativos, progresso rastreável, gamificação e controle parental.

## Arquitetura Backend

### 1. Estrutura de Pastas
```
backend/
├── server.js                 # Servidor principal
├── package.json             # Dependências
├── seedData.js              # Dados iniciais
├── models/                  # Modelos de dados
│   ├── User.js             # Usuário (aluno, pai, admin)
│   ├── Module.js           # Módulo educacional
│   └── Progress.js         # Progresso do aluno
├── routes/                  # Rotas da API
│   ├── auth.js             # Autenticação
│   ├── modules.js          # Módulos
│   ├── progress.js         # Progresso
│   └── quizzes.js          # Quizzes
└── middleware/              # Middlewares
```

### 2. Modelos de Dados

#### User Model
- `username`: string (único)
- `email`: string (único)
- `password`: string (criptografado)
- `role`: enum ['student', 'parent', 'admin']
- `age`: number (para alunos)
- `parentId`: ObjectId (referência para pai)
- `createdAt`, `lastLogin`, `isActive`

#### Module Model
- `id`: string (único)
- `title`, `description`: strings
- `ageRange`: enum ['5-7', '8-10', '11-12']
- `difficulty`: enum ['easy', 'medium', 'hard']
- `duration`: string
- `videoUrl`: string (caminho para vídeo)
- `thumbnailUrl`: string (caminho para thumbnail)
- `phase`: number (1-5)
- `seasonId`: string
- `quizzes`: array de perguntas
- `badges`: array de conquistas
- `skills`, `tags`: arrays
- `isActive`, `createdAt`, `updatedAt`

#### Progress Model
- `userId`: ObjectId (referência)
- `moduleId`: string (referência)
- `isCompleted`: boolean
- `videoWatched`: boolean
- `quizAttempt`: objeto com respostas e pontuação
- `progressPercentage`: number (0-100)
- `badgesEarned`: array de ObjectIds
- `createdAt`, `updatedAt`

### 3. Endpoints da API

#### Autenticação (`/api/auth`)
- `POST /register` - Registro de usuário
- `POST /login` - Login de usuário
- `POST /forgot-password` - Recuperação de senha
- `POST /reset-password` - Redefinição de senha

#### Módulos (`/api/modules`)
- `GET /` - Listar todos os módulos (com filtros)
- `GET /:id` - Obter módulo por ID
- `GET /season/:seasonId` - Obter módulos por temporada
- `GET /user/:userId` - Módulos com progresso do usuário
- `POST /` - Criar módulo (admin)
- `PUT /:id` - Atualizar módulo (admin)
- `DELETE /:id` - Deletar módulo (admin)

#### Progresso (`/api/progress`)
- `GET /user/:userId` - Progresso do usuário
- `GET /user/:userId/module/:moduleId` - Progresso específico
- `POST /` - Atualizar progresso
- `POST /quiz` - Enviar quiz
- `GET /user/:userId/stats` - Estatísticas do usuário

#### Quizzes (`/api/quizzes`)
- `GET /module/:moduleId` - Obter quiz de módulo
- `POST /grade` - Corrigir quiz
- `POST /module/:moduleId` - Atualizar perguntas (admin)
- `GET /recommendations` - Recomendações

### 4. Banco de Dados
- MongoDB com Mongoose
- Estrutura escalável para 50+ módulos
- Índices para consultas rápidas
- Validação de dados

### 5. Segurança
- Autenticação JWT
- Senhas criptografadas (bcrypt)
- Validação de entrada (express-validator)
- Middleware de autorização

### 6. Funcionalidades Implementadas

#### Vídeos Placeholders
- Caminho `/videos/placeholder.mp4` por padrão
- Suporte a substituição fácil
- Lazy loading implementado

#### Autenticação
- Dois níveis: Alunos e Admin
- Recuperação de senha via token
- Controle de acesso por role

#### Progresso e Gamificação
- Rastreamento de vídeos assistidos
- 1-3 estrelas por módulo
- Conquistas e badges
- Barra de progresso

#### Quizzes Interativos
- Perguntas múltipla escolha e verdadeiro/falso
- Feedback imediato
- Revisão de respostas

#### Controle Parental
- Restrição por idade
- Avisos visuais
- Painel de supervisão

### 7. Modelo de Negócio
- Assinatura mensal
- Atualizações constantes de conteúdo
- Escalabilidade para mais módulos

### 8. Plano de Fases
- **Fase 1 (MVP)**: Vídeos placeholders, autenticação, quizzes, progresso
- **Fase 2**: Sala de troféus, pagamentos, upload de vídeos
- **Fase 3**: IA assistente, certificados, otimizações

## Frontend Integration
- Componentes React/TypeScript
- Serviço de API para comunicação
- VideoPlayer com placeholder
- Quiz interativo
- Dashboard parental

## Como Executar
1. `npm install` no diretório backend
2. `npm run dev` para desenvolvimento
3. `npm run seed` para dados iniciais
4. Acessar endpoints via http://localhost:5000/api

## Substituição de Placeholders
1. Atualizar `videoUrl` no modelo Module
2. Substituir arquivos na pasta `/uploads/videos`
3. Atualizar `thumbnailUrl` conforme necessário
4. Reexecutar seedData se necessário