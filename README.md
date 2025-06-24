# CozinhaApp

Sistema completo de vendas de comidas caseiras, com backend em .NET/ASP.NET Core e frontend em React, inspirado em layout Figma de food delivery.

## Funcionalidades
- Cadastro, listagem e detalhes de produtos (cardápio)
- Agendamento de pedidos
- Autenticação com Google
- Carrinho de compras e checkout
- Página de Meus Agendamentos
- Layout responsivo e moderno (Material UI)
- Imagens reais de produtos
- Backend com Entity Framework Core e SQL Server

## Estrutura do Projeto
```
cozinha_project/
├── CozinhaApp.Api/         # Backend ASP.NET Core (API)
├── frontend/              # Frontend React (Material UI)
├── DOC/                   # Documentação e arquivos de apoio
├── public/imagens/        # Imagens dos produtos
├── src/CozinhaApp.Web/    # (opcional, legado)
└── README.md
```

## Como rodar o projeto

### Pré-requisitos
- Node.js e npm
- .NET 6 SDK ou superior
- SQL Server Express

### Backend (.NET API)
```sh
cd CozinhaApp.Api
# Configure o appsettings.json se necessário
# Rode as migrations (apenas na primeira vez)
dotnet ef database update
# Inicie a API
dotnet run
```

### Frontend (React)
```sh
cd frontend
npm install
npm start
```

Acesse o frontend em http://localhost:3000 e a API em http://localhost:5233

## Observações
- As imagens dos produtos devem estar em `public/imagens`.
- O banco de dados é criado automaticamente pelas migrations.
- Para cadastrar produtos, use o Postman ou o frontend.

## Licença
Projeto acadêmico/demonstrativo. Sinta-se livre para adaptar!
