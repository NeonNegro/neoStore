# Verdil

Loja SPA (React + Vite) com identidade escura premium e proposta de “bolsa botanica”: um catalogo para plantas ornamentais (curadoria para colecionadores), com vitrine, detalhe, autenticacao e rota protegida.

## Como rodar

```bash
npm install
npm run dev
```

## Credenciais de teste

- Usuario: `aluno`
- Senha: `1234`

Tambem e possivel criar uma nova conta na rota `/cadastro` (cadastro local salvo no navegador).

## Rotas

- `/` — catalogo (lista de produtos, busca e filtro por categoria)
- `/produto/:id` — detalhe do produto
- `/login` — login
- `/cadastro` — cadastro (simulacao local)
- `/minha-conta` — area protegida (redireciona para `/login` se nao estiver autenticado)
- `*` — pagina 404

## Funcionalidades implementadas

- Componentizacao (reutilizaveis)
  - `Layout` com `children`/`Outlet`, `Cabecalho`, `Rodape`, `Vitrine`, `ProdutoCard`, `Botao`, `Selo`
  - Renderizacao condicional e listas com `.map()`
- Estado, hooks e API
  - Consumo de produtos via DummyJSON
  - Estados de carregamento e erro
  - Busca por texto e filtro por categoria
- Navegacao SPA
  - React Router com lista, detalhe por `:id` e pagina 404
  - Clique no produto abre detalhe
- Autenticacao (simulada no front)
  - Login e cadastro com “API fake” (persistencia em `localStorage`)
  - Sessao em Context
  - Rota protegida e logout
- Bonus
  - Carrinho basico em Context (contagem no header, resumo na area protegida e funcionalidade de remover)
  - Identidade visual refinada com tema escuro, tipografia e iconografia (SVG) proprios.

## Entrega do Projeto (GitHub + Deploy)

Como o projeto agora já tem um repositório Git inicializado na sua máquina, siga os passos abaixo para entregar:

### 1. Subir para o GitHub (A forma mais simples)
1. Acesse o [GitHub](https://github.com/new) e crie um **novo repositório** chamado `neostore` (deixe ele Público).
2. Não marque nenhuma opção (não adicione README nem .gitignore, deixe o repositório totalmente vazio).
3. Após criar, copie os dois comandos da segunda caixa que o GitHub mostra ("push an existing repository") e rode no seu terminal. Serão parecidos com isso:
```bash
git remote add origin https://github.com/SEU-USUARIO/neostore.git
git push -u origin main
```

### 2. Publicar na Vercel (Ponto Extra)
Essa é a plataforma mais simples do mundo para publicar React.
1. Crie uma conta gratuita em [Vercel.com](https://vercel.com/signup) usando seu próprio **GitHub**.
2. Clique no botão **"Add New..." > "Project"**.
3. Na lista, encontre o repositório `neostore` que você acabou de criar e clique em **"Import"**.
4. Não precisa mudar nenhuma configuração. Só clicar em **"Deploy"**.
5. Em 1 minuto ele vai gerar o link do seu site no ar. Cole esse link na sua entrega!

*Obs: O projeto já ignora a pasta `node_modules` por padrão. Se precisar entregar por arquivo `.zip`, basta rodar `zip -r neostore.zip . -x "node_modules/*" -x ".git/*"` no terminal.*

## Prints

Os prints ficam na pasta [screenshots](./screenshots).

### Catalogo

![Catalogo](./screenshots/catalogo.png)

### Detalhe

![Detalhe](./screenshots/detalhe.png)

### Login

![Login](./screenshots/login.png)

### Area protegida

![Minha conta](./screenshots/minha-conta.png)
