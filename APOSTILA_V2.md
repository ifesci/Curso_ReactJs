# Apostila React 19: Desenvolvendo Aplicações Modernas

## Índice

1. [Introdução ao React 19](#1-introdução-ao-react-19)
2. [Ferramentas Modernas de Desenvolvimento](#2-ferramentas-modernas-de-desenvolvimento)
3. [Fundamentos do React](#3-fundamentos-do-react)
4. [Gerenciamento de Estado](#4-gerenciamento-de-estado)
5. [Eventos em React](#5-eventos-em-react)
6. [Roteamento com React Router](#6-roteamento-com-react-router)
7. [Hooks Avançados](#7-hooks-avançados)
8. [Context API](#8-context-api)
9. [React Query](#9-react-query)
10. [Integração com Backend](#10-integração-com-backend)
11. [Autenticação e Controle de Acesso](#11-autenticação-e-controle-de-acesso)
12. [Formulários e Validação](#12-formulários-e-validação)
13. [Upload de Arquivos](#13-upload-de-arquivos)
14. [Considerações Finais](#14-considerações-finais)

## 1. Introdução ao React 19

> **Visão geral ampliada**  
> Nesta seção vamos além da definição: discutimos **por que** o React continua sendo a escolha dominante para aplicações de grande escala, **como** o Virtual DOM e o mecanismo de reconciliação funcionam por baixo dos panos e **quando** pode ser mais sensato optar por alternativas (ex.: Astro em sites estáticos). Também detalhamos as novidades da versão 19, seu impacto na DX (Developer eXperience) e passos para migrar projetos legados.

### O que é ReactJS?

ReactJS é uma biblioteca JavaScript de código aberto, criada e mantida pelo Facebook (agora Meta), focada na construção de interfaces de usuário (UI) interativas e reutilizáveis. 

#### Características principais:

* **Declarativo:** Você descreve como a UI *deve* parecer em diferentes estados, e o React atualiza eficientemente o DOM.

* **Baseado em Componentes:** Interfaces são divididas em peças independentes e reutilizáveis chamadas "componentes".

* **Aprenda uma vez, escreva em qualquer lugar:** Os princípios do React podem ser aplicados em várias plataformas (web com ReactJS, mobile com React Native).

### Novidades do React 19

React 19 trouxe melhorias significativas:

- Melhor desempenho e otimizações internas
- Suporte aprimorado para Suspense e Server Components
- Nova API de renderização (createRoot)
- Melhor compatibilidade com TypeScript
- Hooks otimizados

### Pré-requisitos

* Conhecimento básico de HTML, CSS e JavaScript (ES6+)
* Node.js e npm instalados
* Familiaridade com conceitos básicos do Bootstrap 5 (opcional)

## 2. Ferramentas Modernas de Desenvolvimento

> **Panorama de Ferramentas**  
> Aqui explicamos o papel de cada ferramenta no ciclo de vida do código:  
> • **Vite** como _dev server_ ultrarrápido e empacotador de produção.  
> • **SWC** e a importância de _transpilers_ escritos em Rust para build times.  
> • Integração com **ESLint/Prettier/TypeScript** para um pipeline CI saudável.  
> Incluímos um fluxograma que ajuda a decidir entre `npm`, `pnpm` e `bun`.

### Vite e SWC

#### O que é Vite?

Vite é uma ferramenta de build extremamente rápida para desenvolvimento web moderno, oferecendo:

- Servidor de desenvolvimento com Hot Module Replacement (HMR) instantâneo
- Otimização de código para produção
- Configuração simplificada
- Substituição eficiente ao Create React App (CRA)

#### O que é SWC?

SWC (Speedy Web Compiler) é um compilador ultrarrápido escrito em Rust, que converte código moderno (incluindo JSX) em JavaScript compatível com navegadores.

### Configurando um projeto React com Vite

```bash
# Criar um novo projeto
npm create vite@latest loja-virtual --template react

# Navegar até o diretório criado
cd loja-virtual

# Instalar dependências
npm install
```

### Estrutura básica de um projeto Vite

```
loja-virtual/
├── node_modules/      # Dependências
├── public/            # Arquivos estáticos
├── src/               # Código-fonte
│   ├── assets/        # Imagens, fontes, etc.
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Componentes de página
│   ├── contexts/      # Context API
│   ├── services/      # Serviços e APIs
│   └── main.jsx       # Ponto de entrada
├── .eslintrc.cjs      # Configuração do ESLint
├── index.html         # HTML base
├── package.json       # Dependências e scripts
└── vite.config.js     # Configuração do Vite
```

### Configurando alias de importação

O uso de alias de importação melhora a legibilidade e manutenção do código. No arquivo `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@services': path.resolve(__dirname, './src/services'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
})
```

## 3. Fundamentos do React

> **Do JSX ao Componente**  
> Esta parte descreve, passo a passo, o caminho que seu JSX percorre: AST gerada, transformação para `React.createElement`, criação de _fibers_ e commit no DOM. Também adicionamos dicas práticas para evitar _re‑renderizações_ desnecessárias e padrões de composição que melhoram a legibilidade.

### JSX

JSX (JavaScript XML) é uma extensão de sintaxe para JavaScript que permite escrever código semelhante a HTML dentro do JavaScript.

#### Exemplo de JSX para um componente Card de produto:

```jsx
function Card() {
  return (
    <div className="card">
      <img src="produto.jpg" className="card-img-top" alt="Produto" />
      <div className="card-body">
        <h5 className="card-title">Smartphone XS Pro</h5>
        <p className="card-text">Smartphone de última geração com câmera de 108MP</p>
        <p className="card-price">R$ 2.499,90</p>
        <button className="btn btn-primary">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
```

#### Regras importantes do JSX:

- Use `className` em vez de `class` (palavra reservada em JavaScript)
- Atributos usam camelCase (ex: `onClick` em vez de `onclick`)
- Elementos JSX devem ter uma tag de fechamento ou ser auto-fecháveis
- Você deve retornar um único elemento raiz (use Fragments `<>...</>` para agrupar)

### Componentes Funcionais

Componentes funcionais são funções JavaScript que retornam JSX. Esse é o método moderno e recomendado para criar componentes em React.

```jsx
// src/components/Header.jsx
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Loja Virtual</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <div className="navbar-nav">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link" href="/produtos">Produtos</a>
            <a className="nav-link" href="/sobre">Quem Somos</a>
            <a className="nav-link" href="/contato">Contato</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

### Props (Propriedades)

Props são parâmetros passados para componentes, permitindo a personalização e reutilização.

```jsx
// src/components/Card.jsx
const Card = ({ image, title, description, price, onAddToCartClick }) => {
  // Função para formatar o preço
  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text fw-bold text-primary fs-5 mb-2">
            {formatPrice(price)}
          </p>
          <button 
            onClick={onAddToCartClick} 
            className="btn btn-success mt-auto">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
```

### Renderização de Listas

O método `map()` do JavaScript é frequentemente usado para renderizar listas de itens em React.

```jsx
// src/components/CardsGrid.jsx
import Card from './Card';

const CardsGrid = ({ title, items, cols = 4, onAddToCart }) => {
  const colClass = `row-cols-1 row-cols-md-${Math.max(1, Math.floor(cols / 2))} row-cols-lg-${cols}`;
  
  return (
    <section className="mb-4">
      {title && (
        <>
          <h2>{title}</h2>
          <hr />
        </>
      )}
      <div className={`row ${colClass} g-3`}>
        {items.map((item) => (
          <Card
            key={item.id} // Importante para o React identificar cada item
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            onAddToCartClick={() => onAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsGrid;
```

### Renderização Condicional

Existem várias maneiras de fazer renderização condicional no React:

```jsx
// Exemplo com operador ternário
{isLoading ? (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Carregando...</span>
  </div>
) : (
  <CardsGrid items={products} onAddToCart={handleAddToCart} />
)}

// Exemplo com operador lógico &&
{error && <div className="alert alert-danger">{error.message}</div>}

// Exemplo com renderização prévia de variáveis
let content;
if (isLoading) {
  content = <p>Carregando...</p>;
} else if (error) {
  content = <p>Erro: {error.message}</p>;
} else {
  content = <CardsGrid items={products} />;
}

return <div>{content}</div>;
```

## 4. Gerenciamento de Estado

> **Escolhendo a Estratégia Correta**  
> • Tabelas comparativas entre `useState`, `useReducer`, Context API, Zustand e Redux Toolkit.  
> • Exemplos de **anti‑patterns** comuns (levantar estado demais, prop‑drilling).  
> • Diagnóstico de performance usando o _Profiler_ do React DevTools.

### Estado Local com useState

O hook `useState` permite adicionar estado a componentes funcionais:

```jsx
import { useState } from 'react';

function Counter() {
  // Declaração do estado: [variável, função para atualizar]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

### Estado no contexto da loja virtual

```jsx
// src/pages/ProductsPage.jsx
import { useState } from 'react';
import CardsGrid from "../components/CardsGrid";

function ProductsPage() {
  // Estado para o contador do carrinho
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Estado para armazenar os itens do carrinho
  const [cartItems, setCartItems] = useState([]);
  
  // Função para adicionar ao carrinho
  const handleAddToCart = (product) => {
    setCartItemCount(prevCount => prevCount + 1);
    setCartItems(prevItems => [...prevItems, product]);
    console.log("Adicionado ao carrinho:", product.title);
  };
  
  // Produtos (normalmente viria de uma API)
  const products = [
    { id: 1, image: "/img/product1.jpg", title: "Smartphone XS Pro", description: "Smartphone de última geração", price: 2499.90 },
    // ... mais produtos
  ];
  
  return (
    <div>
      <h1>Produtos</h1>
      <p>Items no carrinho: {cartItemCount}</p>
      <CardsGrid 
        items={products} 
        cols={4} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  );
}

export default ProductsPage;
```

### Estado do Formulário

Um caso comum de uso de estado é em formulários:

```jsx
import { useState } from 'react';

function ProductForm() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value  // Atualiza apenas o campo alterado
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto a ser salvo:', product);
    // Aqui viria a lógica para salvar o produto
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descrição</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={product.description}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Preço (R$)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="image" className="form-label">URL da Imagem</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Salvar Produto</button>
    </form>
  );
}

export default ProductForm;
```

## 5. Eventos em React

> **Entendendo o SyntheticEvent**  
> Abordamos o sistema de _event delegation_ interno do React, a fila de atualização síncrona x assíncrona e o que muda com o `flushSync`. Demonstrações ilustram como prevenir vazamentos de memória ao usar `addEventListener` fora do ciclo React.

### Manipuladores de Eventos

React usa eventos sintéticos que funcionam de maneira semelhante aos eventos do DOM, mas com algumas diferenças:

- Nomes de eventos usam camelCase: `onClick` em vez de `onclick`
- Em JSX, você passa uma função como manipulador de eventos, não uma string
- Para evitar o comportamento padrão, você deve chamar `preventDefault` explicitamente

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Formulário enviado!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Eventos comuns

```jsx
// Evento de clique
<button onClick={() => console.log('Clicado!')}>Clique</button>

// Evento de mudança (input)
<input onChange={(e) => console.log(e.target.value)} />

// Evento de envio (formulário)
<form onSubmit={handleSubmit}>...</form>

// Evento de foco
<input onFocus={() => console.log('Input focado')} />

// Evento de desfoco
<input onBlur={() => console.log('Input perdeu foco')} />
```

### Passando Funções como Props

Um padrão comum é passar manipuladores de eventos como props para componentes filhos:

```jsx
// Componente pai
function ProductsPage() {
  const handleAddToCart = (product) => {
    console.log(`Produto adicionado: ${product.title}`);
    // Lógica para adicionar ao carrinho
  };

  return (
    <CardsGrid 
      items={products} 
      onAddToCart={handleAddToCart} 
    />
  );
}

// Componente filho (CardsGrid) passa a função para o Card
function CardsGrid({ items, onAddToCart }) {
  return (
    <div className="row">
      {items.map(item => (
        <Card 
          key={item.id} 
          {...item} 
          onAddToCartClick={() => onAddToCart(item)} 
        />
      ))}
    </div>
  );
}

// Componente neto (Card) usa a função
function Card({ title, price, onAddToCartClick }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5>{title}</h5>
        <p>R$ {price}</p>
        <button 
          onClick={onAddToCartClick} 
          className="btn btn-primary"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
```

## 6. Roteamento com React Router

> **Navegação Declarativa**  
> Explicamos como o React Router manipula a History API, estratégias de _code‑splitting_ por rota e técnicas para pré‑carregar dados (`loader`) sem bloquear a UI. Inclui matriz de decisão SPA vs. MPA vs. Islands Architecture.

### Instalando React Router (v7)

```bash
npm install react-router-dom
```

### Configuração Básica

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

### Navegação com Links

```jsx
// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Loja Virtual</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <div className="navbar-nav">
            {/* NavLink adiciona a classe 'active' automaticamente */}
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/produtos">
              Produtos
            </NavLink>
            <NavLink className="nav-link" to="/sobre">
              Quem Somos
            </NavLink>
            <NavLink className="nav-link" to="/contato">
              Contato
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

### Parâmetros de Rota

```jsx
// App.jsx - Adicionando rota com parâmetro
<Route path="/produto/:id" element={<ProductDetailPage />} />

// ProductDetailPage.jsx
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  // Extrai o parâmetro 'id' da URL
  const { id } = useParams();
  
  // Aqui você buscaria os detalhes do produto com base no ID
  
  return (
    <div>
      <h1>Detalhes do Produto {id}</h1>
      {/* Conteúdo da página */}
    </div>
  );
}
```

### Navegação Programática

```jsx
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/produto/${product.id}`);
  };
  
  return (
    <div className="card">
      <div className="card-body">
        <h5>{product.title}</h5>
        <button 
          onClick={handleViewDetails} 
          className="btn btn-secondary"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
```

## 7. Hooks Avançados

> **Arquitetando com Hooks**  
> Descrevemos padrões como _hooks compostos_, _state machines_ com `useReducer` + `useContext`, memorização com `useMemo`, além de discutir o **Rules of Hooks** em profundidade para evitar armadilhas.

### useEffect

O hook `useEffect` permite executar efeitos colaterais em componentes funcionais:

```jsx
import { useState, useEffect } from 'react';

function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Esta função será executada após a renderização
    // e sempre que productId mudar
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Simulando uma chamada API
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do produto');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    
    // Função de limpeza (opcional) - executada antes do próximo efeito
    // ou quando o componente for desmontado
    return () => {
      console.log('Limpando recursos...');
    };
  }, [productId]); // Array de dependências - o efeito será executado novamente se productId mudar
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!product) return null;
  
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>R$ {product.price}</p>
    </div>
  );
}
```

### useRef

O hook `useRef` fornece uma referência mutável que permanece entre renderizações:

```jsx
import { useRef } from 'react';

function ImageUpload() {
  // Referência para o input de arquivo
  const fileInputRef = useRef(null);
  
  const handleButtonClick = () => {
    // Aciona o clique no input escondido
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
      // Lógica para upload
    }
  };
  
  return (
    <div>
      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {/* Botão visível para o usuário */}
      <button 
        onClick={handleButtonClick}
        className="btn btn-primary"
      >
        Selecionar Imagem
      </button>
    </div>
  );
}
```

### Hooks Personalizados

Hooks personalizados permitem extrair lógica de componentes para reutilização:

```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

// Hook personalizado para persistir dados no localStorage
function useLocalStorage(key, initialValue) {
  // Função para obter o valor inicial
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erro ao recuperar do localStorage:', error);
      return initialValue;
    }
  };

  // Estado com valor inicial do localStorage ou valor padrão
  const [value, setValue] = useState(getStoredValue);

  // Atualiza o localStorage quando o valor muda
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
```

Uso do hook personalizado:

```jsx
import useLocalStorage from '../hooks/useLocalStorage';

function ShoppingCart() {
  // Usa o hook personalizado em vez de useState
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  return (
    <div>
      <h2>Seu Carrinho ({cartItems.length} itens)</h2>
      {/* Interface do carrinho */}
      <button onClick={clearCart} className="btn btn-danger">
        Limpar Carrinho
      </button>
    </div>
  );
}
```

## 8. Context API

> **Context na medida certa**  
> Mostramos como o React reprojeta Providers na árvore, impacto em re‑render, como otimizar com `useContextSelector` e quando migrar para bibliotecas de estado global.

A Context API do React permite compartilhar dados entre componentes sem passar props manualmente em cada nível.

### Criando um Contexto

```jsx
// src/contexts/CartContext.jsx
import { createContext, useState, useContext } from 'react';

// Cria o contexto
const CartContext = createContext();

// Provedor do contexto
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  
  // Funções para manipular o carrinho
  const addItem = (product) => {
    setItems(prevItems => [...prevItems, product]);
  };
  
  const removeItem = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  // Valores e funções disponibilizados pelo contexto
  const value = {
    items,
    itemCount: items.length,
    addItem,
    removeItem,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
```

### Configurando o Provedor

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### Utilizando o Contexto

```jsx
// src/components/Header.jsx
import { useCart } from '../contexts/CartContext';

function Header() {
  // Acessa o contexto do carrinho
  const { itemCount } = useCart();
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        {/* ... outros elementos do navbar */}
        <div className="ms-auto">
          <span className="badge bg-danger">
            Itens no carrinho: {itemCount}
          </span>
        </div>
      </nav>
    </header>
  );
}

// src/components/ProductCard.jsx
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  // Acessa a função addItem do contexto
  const { addItem } = useCart();
  
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <button
          onClick={() => addItem(product)}
          className="btn btn-primary"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
```

## 9. React Query

> **Sincronizando com o Servidor**  
> Apresentamos o princípio *stale‑while‑revalidate*, diagramas de fluxo de cache, políticas de invalidação e como integrar com WebSockets para dados em tempo real.

React Query é uma biblioteca para gerenciar estado do servidor e dados assíncronos.

### Instalação

```bash
npm install @tanstack/react-query
```

### Configuração

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Criar o cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

### Realizando Consultas

```jsx
// src/pages/ProductsPage.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CardsGrid from "../components/CardsGrid";
import productService from '../services/productService';

function ProductsPage() {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  // Buscar produtos usando React Query
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['products', currentPage], // Chave única para identificar a consulta
    queryFn: () => productService.getProductsByPage(currentPage, PRODUCTS_PER_PAGE),
    keepPreviousData: true, // Mantém os dados anteriores enquanto carrega novos
  });

  // Manipulador para mudança de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        Erro ao carregar produtos: {error.message}
      </div>
    );
  }

  // Dados vindos da consulta
  const { products, totalPages } = data;

  return (
    <div>
      <CardsGrid
        title="Todos os Produtos"
        items={products}
        cols={4}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
```

### Realizando Mutações

```jsx
// src/pages/CreateProductPage.jsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import productService from '../services/productService';

function CreateProductPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  
  // Mutation para criar produto
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      // Invalida a consulta de produtos para forçar uma nova busca
      queryClient.invalidateQueries(['products']);
      toast.success('Produto criado com sucesso!');
      navigate('/produtos');
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação...
    
    // Converter preço para número
    const productToSave = {
      ...product,
      price: parseFloat(product.price)
    };
    
    // Executa a mutação
    createProductMutation.mutate(productToSave);
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h2>Novo Produto</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Campos do formulário */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={createProductMutation.isPending}
              >
                {createProductMutation.isPending ? 'Salvando...' : 'Salvar Produto'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 10. Integração com Backend

> **Supabase & beyond**  
> Além da configuração básica, explicamos RLS (Row Level Security), Edge Functions, e comparamos Supabase com Firebase e Backendless para ajudá‑lo a escolher conscientemente.

### Configuração do Supabase

Supabase é um BaaS (Backend as a Service) open source que fornece banco de dados PostgreSQL, autenticação, armazenamento e API automática.

#### Instalação

```bash
npm install @supabase/supabase-js
```

#### Serviço de Configuração

```jsx
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Use variáveis de ambiente para as credenciais
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Credenciais do Supabase não configuradas. Verifique o arquivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
```

#### Serviço de Produtos

```jsx
// src/services/productService.js
import supabase from './supabase';

const productService = {
  // Obter produtos com paginação
  async getProductsByPage(page = 1, limit = 8) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
    
    return { 
      products: data, 
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  },
  
  // Obter um produto pelo ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
    
    return data;
  },
  
  // Criar um novo produto
  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Atualizar um produto existente
  async updateProduct(id, product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Deletar um produto
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
    
    return true;
  },
  
  // Upload de imagem do produto
  async uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error: uploadError } = await supabase
      .storage
      .from('products')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error('Erro ao fazer upload:', uploadError);
      throw uploadError;
    }
    
    return filePath;
  }
};

export default productService;
```

## 11. Autenticação e Controle de Acesso

> **Zero‑Trust na prática**  
> Ilustra o fluxo completo de autenticação, renovação de token, armazenamento seguro (HttpOnly cookies vs. localStorage) e padrões de autorização por atributo (ABAC).

### Serviço de Autenticação

```jsx
// src/services/authService.js
import supabase from '@services/supabase';

const authService = {
  async login(form) {
    return await supabase.auth.signInWithPassword(form);
  },

  async logout() {
    // Limpar o cache do React Query antes de fazer logout
    if (window.queryClient) {
      window.queryClient.clear();
    }
    return supabase.auth.signOut();
  },

  async forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) throw error;
    return true;
  },

  async registerUser(userData) {
    const { email, password, ...metadata } = userData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    if (error) throw error;
    
    // Se o registro for bem-sucedido, criar um perfil para o usuário
    if (data.user) {
      try {
        await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            full_name: metadata.full_name || '',
            phone: metadata.phone || '',
            created_at: new Date(),
            updated_at: new Date()
          }]);
      } catch (profileError) {
        console.error("Erro ao criar perfil:", profileError);
      }
    }
    
    return { data, error };
  }
};

export default authService;
```

### Contexto de Autenticação

O contexto de autenticação gerencia o estado do usuário logado em toda a aplicação:

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(supabase.auth.getSession()?.data?.session || null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = session?.user || null;
  const isAdmin = profile?.is_admin || false;

  // Buscar o perfil do usuário quando o usuário estiver autenticado
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Erro ao buscar perfil:', error);
            setProfile(null);
          } else {
            setProfile(data);
          }
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Observer para mudanças no estado de autenticação
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setSession(null);
      } else {
        setSession(sess);
        setLoading(true); // Reiniciar o loading quando o estado de autenticação mudar
      }
    });
    
    return () => listener.subscription.unsubscribe();
  }, []);

  const value = { session, user, isAdmin, loading, profile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
```

### Componente de Rota Protegida

Esse componente verifica se o usuário está autenticado antes de renderizar o conteúdo protegido:

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
```

### Componente de Rota Administrativa

Componente que verifica se o usuário é um administrador:

```jsx
// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
```

### Configuração das Rotas Protegidas

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/auth/ProfilePage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registrar" element={<RegisterPage />} />
      
      {/* Rotas protegidas (usuário logado) */}
      <Route path="/perfil" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      {/* Rotas administrativas */}
      <Route path="/admin/produtos" element={
        <AdminRoute>
          <AdminProductsPage />
        </AdminRoute>
      } />
      <Route path="/admin/usuarios" element={
        <AdminRoute>
          <AdminUsersPage />
        </AdminRoute>
      } />
    </Routes>
  );
}
```

## 12. Formulários e Validação

> **UX e Acessibilidade**  
> Discutimos abordagens controlada vs. não‑controlada, integração com `react-hook-form`, esquemas com `zod` e como garantir acessibilidade com `aria-` attributes.

### Formulário de Login

```jsx
// src/pages/auth/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '@services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Limpar erros quando o usuário digita
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (generalError) setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validação de e-mail
    if (!/.+@.+\..+/.test(form.email)) newErrors.email = 'E-mail inválido';
    
    // Validação de senha
    if (!form.password) newErrors.password = 'A senha é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { error } = await authService.login(form);
      if (error) {
        setGeneralError(error.message);
      } else {
        navigate('/'); // Redireciona para a página inicial
      }
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">Entrar</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              {/* Campo de E-mail */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              
              {/* Campo de Senha */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              
              {/* Erro geral */}
              {generalError && (
                <div className="alert alert-danger mb-3">{generalError}</div>
              )}
              
              {/* Botões */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Entrando...
                  </>
                ) : 'Entrar'}
              </button>
              
              <div className="mt-3 text-center">
                <Link to="/registro">Criar conta</Link> | <Link to="/esqueci-senha">Esqueci a senha</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
```

### Formulário de Registro com Validação

```jsx
// src/pages/auth/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import authService from '@services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  
  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: authService.registerUser,
    onSuccess: () => {
      toast.success('Conta criada! Verifique seu e-mail.', {
        icon: '✅',
        duration: 3000
      });
      navigate('/login');
    },
    onError: err =>
      toast.error(`Erro ao registrar: ${err.message}`, {
        icon: '❌',
        duration: 5000
      }),
  });
  
  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // Regex para validação
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  const emailRegex = /.+@.+\..+/;
  
  const validateForm = () => {
    const newErrors = {};
    if (!user.full_name.trim()) newErrors.full_name = 'O nome é obrigatório';
    if (!emailRegex.test(user.email)) newErrors.email = 'E-mail inválido';
    if (!phoneRegex.test(user.phone))
      newErrors.phone = 'Telefone deve ter o formato (99) 99999-9999';
    if (user.password.length < 6)
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    if (user.password !== user.confirm)
      newErrors.confirm = 'As senhas não coincidem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      const { confirm: _confirm, ...payload } = user; // remove confirm
      registerMutation.mutate(payload);
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">Criar Conta</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              {/* Nome completo */}
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">Nome completo</label>
                <input
                  id="full_name"
                  name="full_name"
                  className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                  value={user.full_name}
                  onChange={handleChange}
                  required
                />
                {errors.full_name && (
                  <div className="invalid-feedback">{errors.full_name}</div>
                )}
              </div>
              
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              
              {/* Telefone */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(99) 99999-9999"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
              
              {/* Senha */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              
              {/* Confirmar senha */}
              <div className="mb-3">
                <label htmlFor="confirm" className="form-label">Confirmar senha</label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
                  value={user.confirm}
                  onChange={handleChange}
                  required
                />
                {errors.confirm && (
                  <div className="invalid-feedback">{errors.confirm}</div>
                )}
              </div>
              
              {/* Botão de enviar */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Criando conta...
                  </>
                ) : 'Criar conta'}
              </button>
              
              <div className="mt-3 text-center">
                <Link to="/login">Já tenho uma conta</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
```

### Input com Máscara

Para melhorar a experiência do usuário, podemos usar a biblioteca react-input-mask para campos formatados como telefone, CPF, etc:

```bash
npm install react-input-mask
```

```jsx
import InputMask from 'react-input-mask';

// Dentro do formulário:
<div className="mb-3">
  <label htmlFor="phone" className="form-label">Telefone</label>
  <InputMask
    mask="(99) 99999-9999"
    id="phone"
    name="phone"
    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
    value={user.phone}
    onChange={handleChange}
  />
  {errors.phone && (
    <div className="invalid-feedback">{errors.phone}</div>
  )}
</div>
```

## 13. Upload de Arquivos

> **Do input ao bucket**  
> Cobertura de limites de tamanho, compressão on‑the‑fly (WebP, AVIF), _optimistic UI_ durante upload e tratamento de falhas de rede.

### Serviço para Upload de Imagens

```jsx
// Dentro do productService.js
async uploadImage(file) {
  // Gera um nome de arquivo único
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  // Envia o arquivo para o Supabase Storage
  const { error: uploadError } = await supabase
    .storage
    .from('products') // Nome do bucket
    .upload(fileName, file);
  
  if (uploadError) {
    console.error('Erro ao fazer upload:', uploadError);
    throw uploadError;
  }
  
  // Retorna o caminho do arquivo
  return fileName;
}
```

### Componente de Upload de Imagem

```jsx
import { useRef, useState } from 'react';

function ImageUploader({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Cria uma URL temporária para preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    
    // Notifica o componente pai
    onImageSelected(file);
  };
  
  const clearSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreview(null);
    onImageSelected(null);
  };
  
  return (
    <div className="mb-3">
      <label className="form-label">Imagem do Produto</label>
      <div className="d-flex align-items-center mb-2">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => fileInputRef.current?.click()}
        >
          Selecionar Arquivo
        </button>
        {preview && (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={clearSelection}
          >
            Remover
          </button>
        )}
      </div>
      
      <input
        type="file"
        accept="image/*"
        className="d-none"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail"
            style={{ maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
}
```

### Uso no formulário de produto

```jsx
// No componente CreateProductPage.jsx
const [product, setProduct] = useState({
  title: '',
  description: '',
  price: '',
  image_file: null, // Arquivo para upload
});

const handleImageSelected = (file) => {
  setProduct(prev => ({ ...prev, image_file: file }));
};

// No formulário:
<ImageUploader onImageSelected={handleImageSelected} />

// Na submissão:
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  try {
    // Se houver um arquivo, faz o upload e obtém o caminho
    let imagePath = null;
    if (product.image_file) {
      imagePath = await productService.uploadImage(product.image_file);
    }
    
    // Cria o produto com a URL da imagem
    const productData = {
      ...product,
      price: parseFloat(product.price),
      image_url: imagePath
    };
    
    // Remove o campo de arquivo antes de enviar
    delete productData.image_file;
    
    await createProductMutation.mutateAsync(productData);
  } catch (error) {
    toast.error(`Erro: ${error.message}`);
  }
};
```

## 14. Considerações Finais

> **Próximos Passos Recomendados**  
> Checklist de qualidade, incluindo Lighthouse, Core Web Vitals, testes E2E com Playwright e roteiro de estudo para React Native e React Server Components.

### Resumo das tecnologias apresentadas

- **React 19**: Base para construção de interfaces modernas
- **Vite + SWC**: Ferramentas modernas de build
- **React Router**: Navegação entre páginas
- **React Query**: Gerenciamento de estado do servidor
- **Supabase**: Backend como serviço para armazenamento e autenticação
- **Context API**: Gerenciamento de estado global
- **Hooks personalizados**: Reutilização de lógica

### Próximos passos

Para continuar evoluindo sua aplicação de loja virtual:

1. **Implementação de carrinho**:
   - Persistência no localStorage
   - Funcionalidades de adicionar/remover/atualizar

2. **Checkout**:
   - Formulário de endereço
   - Integrações com gateways de pagamento

3. **Gerenciamento de pedidos**:
   - Histórico de pedidos
   - Status de pedidos

4. **Otimizações de desempenho**:
   - Lazy loading de componentes
   - Memoização com useMemo e useCallback

5. **Testes**:
   - Testes unitários com Jest/Vitest
   - Testes de integração

6. **PWA**:
   - Transformar a aplicação em Progressive Web App

### Práticas recomendadas

- **Componentização**: Mantenha componentes pequenos e reutilizáveis
- **Separação de responsabilidades**: Cada componente deve ter uma única responsabilidade
- **Convenções de nomenclatura**: Use nomes descritivos para componentes e funções
- **Organização de código**: Estruture seu projeto de forma lógica
- **Manutenção**: Refatore regularmente para manter o código limpo

React 19 e o ecossistema moderno que o acompanha fornecem ferramentas poderosas para construir aplicações web escaláveis e de alta qualidade. Com os conceitos e técnicas aprendidos nesta apostila, você está pronto para desenvolver e expandir sua loja virtual.

Bons estudos e feliz codificação!