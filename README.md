# 🚀 Gestão de Produtos - Aplicação CRUD Completa

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.5-1677FF?logo=antdesign)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.2-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)

---

## 📖 Sobre o Projeto

**Gestão de Produtos** é uma aplicação web moderna e completa para o gerenciamento de um catálogo de produtos. Desenvolvida como um CRUD (Create, Read, Update, Delete), esta aplicação demonstra a implementação de funcionalidades avançadas, uma arquitetura de front-end robusta e uma interface de utilizador profissional, construída com as melhores práticas do ecossistema React.

O projeto foi concebido para ser não apenas funcional, mas também performático e escalável, utilizando paginação e filtros no lado do servidor para garantir uma experiência fluida, independentemente do volume de dados.

### ✨ Demonstração Visual

<img width="2918" height="1304" alt="image" src="https://github.com/user-attachments/assets/de035b39-614e-4451-97db-863541e45316" />
*A interface principal, a exibir a tabela de produtos com um design limpo, filtros ativos e o modal de exclusão.*

---

## 🔥 Funcionalidades Implementadas

Esta aplicação vai além de um CRUD básico, incorporando funcionalidades que a tornam uma ferramenta de gestão poderosa e de fácil utilização:

#### Tabela de Dados Avançada
-   **Listagem Completa:** Exibe todos os produtos com informações essenciais (Nome, Categoria, Preço).
-   **Paginação no Lado do Servidor:** Apenas os dados da página atual são requisitados, garantindo máxima performance. O utilizador pode escolher quantos itens ver por página (10, 20, 50).
-   **Filtros por Coluna:** Filtros de busca individuais para "Nome do Produto" e "Categoria" que consultam a API em tempo real.
-   **Opção de Limpar Filtros:** Cada filtro pode ser facilmente limpo para retornar à visualização completa.
-   **Ordenação Padrão:** Os produtos mais recentes são exibidos no topo da lista por defeito.
-   **Scroll Interno:** A tabela possui uma altura fixa, evitando a rolagem da página inteira e melhorando a usabilidade.
-   **Linha Expansível:** A descrição completa de cada produto pode ser visualizada ao expandir a sua linha, mantendo a tabela principal limpa e concisa.

#### Formulário Inteligente
-   **Criação e Edição Unificadas:** Um único formulário reutilizável é usado tanto para adicionar novos produtos como para editar existentes.
-   **Validação Robusta:** Regras de validação em tempo real para todos os campos obrigatórios, como nome, preço positivo e seleção de categoria válida.
-   **Máscara de Moeda:** O campo de preço possui uma máscara inteligente que formata o valor como moeda brasileira (R$) em tempo real e impede a digitação de caracteres inválidos.
-   **Autocomplete de Categoria:** Campo de categoria com sugestões, facilitando a consistência dos dados.

#### Experiência do Utilizador (UX)
-   **Notificações (Toasts):** Feedback visual instantâneo para o utilizador após cada ação bem-sucedida (criação, edição, exclusão) ou em caso de erro.
-   **Modal de Confirmação Detalhado:** Ao excluir um produto, um modal de confirmação exibe os detalhes do item (nome, categoria, preço), garantindo que o utilizador tenha a certeza da ação.
-   **Design Moderno e Responsivo:** Interface construída com Ant Design e estilizada com Tailwind CSS, proporcionando um visual profissional e adaptável a diferentes tamanhos de ecrã.
-   **Indicadores de Carregamento:** Spinners e skeletons indicam ao utilizador que os dados estão a ser processados.

---

## 🛠️ Tecnologias Utilizadas

-   **React:** Biblioteca principal para a construção da interface.
-   **TypeScript:** Para um código mais seguro, legível e escalável.
-   **Ant Design (antd):** Biblioteca de componentes UI para uma interface elegante e funcional.
-   **Tailwind CSS:** Framework de CSS utilitário para estilizações rápidas e personalizadas.
-   **React Router DOM:** Para a gestão de rotas da aplicação.
-   **Axios:** Cliente HTTP para as requisições à API.
-   **MockAPI.io:** Serviço utilizado para simular o back-end e a base de dados.

---

## 📂 Arquitetura do Projeto

O código foi estruturado de forma a separar as responsabilidades, facilitando a manutenção e a escalabilidade:

-   `src/components/`: Componentes reutilizáveis da UI (ex: `ProductForm.tsx`).
-   `src/pages/`: Componentes que representam as páginas completas da aplicação (ex: `PageProducts.tsx`).
-   `src/hooks/`: Hooks customizados que encapsulam a lógica de estado e efeitos (ex: `useProducts.tsx`).
-   `src/services/`: Camada de serviço responsável por toda a comunicação com a API (ex: `productService.ts`).
-   `src/interfaces/`: Definições de tipos e interfaces do TypeScript.
-   `src/contexts/`: Contextos da aplicação (ex: `ThemeContext.tsx`).

---

## ⚙️ Como Executar o Projeto Localmente

Para executar este projeto no seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Lucas-Gabriel2A/softlive_teste.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd softlive
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5.  Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no seu terminal) no seu navegador para ver a aplicação.
6.  Link da apicação publicada: https://softlive-teste.vercel.app
---

