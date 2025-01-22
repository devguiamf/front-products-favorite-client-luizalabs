# Favorite Product Labs Challenge 🏪

## Descrição 📖
Este projeto foi desenvolvido utilizando AngularJs e Tailwind, seguindo a arquitetura hexagonal, conceitos de arquitetura limpa e componentização. As suites de testes do projeto são os arquivos padrão de teste do angular ao gerar o recurso

## Requisitos 📋
- Node.js
- npm
- AngularJs (para execução sem Docker)
- Docker (para execução com Docker)

## Instalação e execução do projeto 🚀

### Método Manual
1. Clone o repositório:
    ```bash
    git clone <URL do seu repositório>
    cd <nome do repositório>
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o arquivo `environment.ts` e `environment.development.ts` com as variáveis `api_product`, `api_client` e `api_favorite`.

4. Execute a aplicação em modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```

### Com Docker
1. Clone o repositório:
    ```bash
    git clone <URL do seu repositório>
    cd <nome do repositório>
    ```
2. Configure o arquivo `.env` com as variáveis `PRODUCTS_SERVICE_URL` conforme o `.env.example`.

3. Execute a aplicação com Docker:
    ```bash
    docker-compose up
    ```
