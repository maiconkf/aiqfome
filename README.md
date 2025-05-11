# aiqfome

## 🚀 Sobre o Projeto

Projeto de delivery que permite aos usuários fazerem pedidos em restaurantes.

## 🛠️ Tecnologias Utilizadas

### Gerenciamento de Estado: Zustand

Escolhi o **Zustand** em vez do **Context API** ou **Redux** porque:

- É **bem mais simples de configurar**
- **Não precisa escrever tanto código**
- Permite **salvar dados no localStorage com facilidade**, como o carrinho de compras
- É fácil de entender e usar, mesmo para quem não conhece Redux

> 🔹 _Com Zustand, consigo manter os dados do usuário mesmo que ele atualize ou feche a página, usando `localStorage`._

### Estilização: Tailwind CSS

Usei **Tailwind CSS** no lugar do **Material UI** porque:

- É **mais rápido** de usar durante o desenvolvimento
- Dá mais **controle sobre o layout e os estilos**
- Evita a criação de vários arquivos de CSS
- As **classes prontas** ajudam a montar o visual da página

## ✨ Funcionalidades Principais

### Validação de Pedido Mínimo

- Bloqueia o pedido se o valor mínimo do restaurante não for atingido
- Atualização em tempo real

### Redirecionamento Inteligente

- Impede acesso a produtos de restaurantes fechados
- Redireciona automaticamente para a página correta

### Horário de Funcionamento

- Mostra se o restaurante está aberto ou fechado com base no horário do servidor

### Persistência de Dados

- O estado do carrinho e outras informações são **salvos no navegador** com `localStorage`
- O usuário **não perde os dados ao atualizar a página** ou fechar o navegador

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npm run dev
```
