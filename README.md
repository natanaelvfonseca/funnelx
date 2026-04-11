# FunnelX

FunnelX e a replica operacional desta base, preparada para rodar separada da Kogna usando o mesmo PostgreSQL com tabelas isoladas em um `schema` proprio.

## Setup

1. Clone o repositorio:
   ```bash
   git clone https://github.com/natanaelvfonseca/funnelx.git
   cd funnelx
   ```

2. Instale as dependencias:
   ```bash
   npm install
   ```

3. Configure o `.env` com foco nestas variaveis:
   ```bash
   APP_URL=http://localhost:8080
   VITE_APP_URL=http://localhost:8080
   DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
   DATABASE_SCHEMA=funnelx
   PRISMA_DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres?schema=funnelx
   EVOLUTION_API_URL=https://evo.kogna.co
   EVOLUTION_API_KEY=seu-token
   VITE_EVOLUTION_API_URL=https://tech.kogna.online
   VITE_EVOLUTION_API_KEY=seu-token
   ```

4. Prepare o banco e publique as tabelas do FunnelX:
   ```bash
   npm run db:sync
   ```

5. Suba frontend e backend:
   ```bash
   npm run dev:full
   ```

## Separacao do banco

- O backend usa `DATABASE_URL` e `DATABASE_SCHEMA` para aplicar `search_path` no schema do FunnelX.
- O Prisma usa `PRISMA_DATABASE_URL` com `?schema=funnelx`.
- As integrações externas podem continuar as mesmas da Kogna; a separação aqui ficou concentrada no Postgres.
- Isso permite manter o mesmo servidor/PostgreSQL da Kogna sem misturar as tabelas entre as duas aplicacoes.
