import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes do router

// Importa os componentes de layout e páginas
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from './HomePage'; // Importa a nova página Home
import ProductsPage from './ProductsPage'; // Importa a nova página Produtos
// CardsGrid não é mais usado diretamente aqui, mas sim dentro das páginas

function App() {
  // Inicializa o estado para a contagem de itens no carrinho
  // useState(0) define o valor inicial como 0
  // cartItemCount: a variável que guarda o valor atual do estado
  // setCartItemCount: a função para atualizar o valor do estado
  const [cartItemCount, setCartItemCount] = useState(0);

  const products = [
    { id: 1, image: "https://picsum.photos/300/200?random=1", title: "Produto 1", description: "Descrição do Produto 1" },
    { id: 2, image: "https://picsum.photos/300/200?random=2", title: "Produto 2", description: "Descrição do Produto 2" },
    { id: 3, image: "https://picsum.photos/300/200?random=3", title: "Produto 3", description: "Descrição do Produto 3" },
    { id: 4, image: "https://picsum.photos/300/200?random=4", title: "Produto 4", description: "Descrição do Produto 4" },
    { id: 5, image: "https://picsum.photos/300/200?random=5", title: "Produto 5", description: "Descrição do Produto 5" },
    { id: 6, image: "https://picsum.photos/300/200?random=6", title: "Produto 6", description: "Descrição do Produto 6" },
  ];

  // Função chamada quando o botão "Adicionar ao Carrinho" em um Card é clicado
  const handleAddToCart = (product) => {
    // Atualiza o estado, incrementando a contagem anterior (prevCount)
    setCartItemCount(prevCount => prevCount + 1);
    // Exibe o produto adicionado no console (apenas para demonstração)
    console.log("Adicionado ao carrinho:", product.title);
    // Em uma aplicação real, aqui você adicionaria o produto a um array de carrinho, etc.
  };

  // O componente App agora configura o roteador e o layout principal
  return (
    <BrowserRouter> {/* Envolve toda a aplicação com o BrowserRouter */}
      <div className="d-flex flex-column min-vh-100"> {/* Mantém o layout flex para o footer */}
        {/* Header fica fora das Routes para ser exibido em todas as páginas */}
        <Header cartCount={cartItemCount} />

        {/* O container principal agora envolve as rotas */}
        <main className="container my-4 flex-grow-1">
          <Routes> {/* Define a área onde as rotas serão renderizadas */}
            {/* Rota para a Home Page */}
            <Route
              path="/"
              element={<HomePage products={products} onAddToCart={handleAddToCart} />}
            />
            {/* Rota para a Página de Produtos */}
            <Route
              path="/produtos"
              element={<ProductsPage products={products} onAddToCart={handleAddToCart} />}
            />
            {/* Adicionar outras rotas aqui (ex: /sobre, /contato, /produto/:id) */}
            {/* Rota "catch-all" para página não encontrada (opcional) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>

        {/* Footer também fica fora das Routes */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;