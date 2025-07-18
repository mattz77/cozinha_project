# 🍲 CozinhaApp

Sistema completo de vendas de comidas caseiras, com backend em .NET/ASP.NET Core e frontend em React.

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Login tradicional**: Email e senha com validação
- **Login com Google**: OAuth 2.0 integrado
- **Registro de usuários**: Cadastro com validação de dados
- **JWT Tokens**: Autenticação segura e persistente
- **Proteção de rotas**: Acesso restrito para usuários logados
- **Contexto global**: Estado de usuário compartilhado

### 🛒 E-commerce
- **Cardápio completo**: Listagem de produtos com imagens
- **Detalhes do produto**: Páginas individuais para cada item
- **Carrinho de compras**: Adição, remoção e controle de quantidade
- **Checkout**: Processo de finalização de pedidos
- **Agendamento**: Sistema de reservas e pedidos antecipados
- **Meus Agendamentos**: Histórico e gestão de pedidos

### 🎨 Interface e UX
- **Design responsivo**: Funciona em desktop, tablet e mobile
- **Animações modernas**: Transições suaves e efeitos visuais
- **Feedback visual**: Mensagens de sucesso/erro com delay automático
- **Layout intuitivo**: Navegação clara e acessível
- **Tema consistente**: Paleta de cores harmoniosa

### 💳 Formas de Pagamento
- **Múltiplas opções**: Cartão, PIX, Transferência
- **Rodapé informativo**: Branding e métodos aceitos
- **Fallback inteligente**: Ícones quando imagem não carrega

### 🔧 Funcionalidades Técnicas
- **Exibição inteligente de nomes**: Mostra apenas os dois primeiros nomes (ignora preposições)
- **Validação de dados**: Frontend e backend
- **Tratamento de erros**: Feedback amigável ao usuário
- **Performance otimizada**: Lazy loading e otimizações

## 🛠️ Tecnologias Utilizadas

### Backend (.NET)
- **ASP.NET Core 6**: Framework web moderno
- **Entity Framework Core**: ORM para banco de dados
- **SQL Server**: Banco de dados relacional
- **JWT (JSON Web Tokens)**: Autenticação segura
- **BCrypt**: Hash seguro de senhas
- **Google OAuth 2.0**: Autenticação social
- **CORS**: Cross-Origin Resource Sharing
- **AutoMapper**: Mapeamento de objetos

### Frontend (React)
- **React 18**: Biblioteca JavaScript para UI
- **React Router**: Navegação entre páginas
- **Material-UI (MUI)**: Componentes de interface
- **Axios**: Cliente HTTP para APIs
- **Context API**: Gerenciamento de estado global
- **CSS3**: Estilos customizados e animações
- **Responsive Design**: Layout adaptativo

### Banco de Dados
- **SQL Server Express**: SGBD principal
- **Entity Framework Migrations**: Versionamento do schema
- **Code First**: Desenvolvimento orientado a código

### DevOps & Ferramentas
- **Git**: Controle de versão
- **GitHub**: Repositório remoto
- **Visual Studio Code**: IDE principal
- **Postman**: Testes de API

## 📁 Estrutura do Projeto
```
cozinha_project/
├── CozinhaApp.Api/              # Backend ASP.NET Core (API)
│   ├── Controllers/             # Controladores da API
│   ├── Models/                  # Modelos de dados
│   ├── Data/                    # Contexto do banco
│   ├── Migrations/              # Migrações do EF
│   └── appsettings.json         # Configurações
├── frontend/                    # Frontend React
│   ├── public/                  # Arquivos públicos
│   │   └── imagens/             # Imagens dos produtos
│   ├── src/                     # Código fonte
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── styles/              # Arquivos CSS
│   │   └── utils/               # Utilitários
│   └── package.json             # Dependências
├── DOC/                         # Documentação
└── README.md                    # Este arquivo
```

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos
- **Node.js 16+** e npm
- **.NET 6 SDK** ou superior
- **SQL Server Express** ou LocalDB
- **Visual Studio Code** (recomendado)

### 🔧 Configuração Inicial

#### 1. Clone o Repositório
```bash
git clone https://github.com/mattz77/cozinha_project.git
cd cozinha_project
```

#### 2. Configurar Backend (.NET API)
```bash
cd CozinhaApp.Api

# Instalar dependências
dotnet restore

# Configurar banco de dados (primeira vez)
dotnet ef database update

# Executar a API
dotnet run
```

**A API estará disponível em:** http://localhost:5233

#### 3. Configurar Frontend (React)
```bash
cd frontend

# Instalar dependências
npm install

# Executar o frontend
npm start
```

**O frontend estará disponível em:** http://localhost:3000

### 🔐 Configuração de Autenticação Google

Para usar o login com Google, configure no `appsettings.json`:

```json
{
  "Authentication": {
    "Google": {
      "ClientId": "SEU_CLIENT_ID",
      "ClientSecret": "SEU_CLIENT_SECRET"
    }
  }
}
```

### 🗄️ Banco de Dados

O banco de dados é criado automaticamente na primeira execução. As migrações incluem:
- Tabela de usuários com autenticação
- Tabela de produtos
- Tabela de agendamentos

## 🎯 Funcionalidades Principais

### 👤 Autenticação e Usuários
- **Registro**: Cadastro com nome, email e senha
- **Login tradicional**: Email e senha
- **Login Google**: OAuth 2.0 integrado
- **Sessão persistente**: JWT tokens
- **Proteção de rotas**: Acesso restrito

### 🍽️ Cardápio e Produtos
- **Listagem de produtos**: Grid responsivo
- **Detalhes do produto**: Páginas individuais
- **Imagens**: Suporte a múltiplos formatos
- **Categorias**: Organização por tipo

### 🛒 Carrinho e Pedidos
- **Adicionar produtos**: Controle de quantidade
- **Carrinho persistente**: Estado mantido
- **Checkout**: Processo de finalização
- **Agendamento**: Reservas antecipadas

### 📱 Interface Responsiva
- **Desktop**: Layout completo
- **Tablet**: Adaptação automática
- **Mobile**: Otimizado para touch

## 📝 Observações Importantes

### 🖼️ Imagens
- As imagens dos produtos devem estar em `frontend/public/imagens/`
- Formatos suportados: JPG, PNG, WebP
- Tamanho recomendado: 300x300px

### 🗄️ Banco de Dados
- Criado automaticamente na primeira execução
- Migrações incluem todas as tabelas necessárias
- Backup automático das configurações

### 🔧 Desenvolvimento
- **Hot reload**: Alterações refletem automaticamente
- **Logs detalhados**: Console para debug
- **Tratamento de erros**: Feedback amigável

## 🤝 Contribuição

Este é um projeto acadêmico/demonstrativo. Sinta-se livre para:
- 🔧 Reportar bugs
- 💡 Sugerir melhorias
- 🚀 Fazer fork e adaptar
- 📚 Usar como referência

## 📄 Licença

Projeto desenvolvido para fins educacionais. Código aberto sob licença MIT.

---

**Desenvolvido com ❤️ pela NiceByte Soluções LTDA**
