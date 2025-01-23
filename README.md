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
    git clone front-products-favorite-client-luizalabs
    cd front-products-favorite-client-luizalabs
    ```
2. Instale a cli do angular
    ```bash
    npm i -g @angular/cli
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure o arquivo `environment.ts` e `environment.development.ts` com as variáveis `api_product`, `api_client` e `api_favorite`.

5. Execute a aplicação em modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```

### Com Docker
1. Clone o repositório:
    ```bash
    git clone front-products-favorite-client-luizalabs
    cd front-products-favorite-client-luizalabs
    ```
2. Configure o arquivo `environment.ts` e `environment.development.ts` com as variáveis `api_product`, `api_client` e `api_favorite`.

3. Execute a aplicação com Docker:
    ```bash
    docker-compose up
    ```
