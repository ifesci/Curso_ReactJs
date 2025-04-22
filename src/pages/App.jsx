import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from './HomePage';
import ProductsPage from './ProductsPage'; 
import CreateProductPage from './CreateProductPage';

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleAddToCart = (product) => {
    setCartItemCount(prevCount => prevCount + 1);
    console.log("Adicionado ao carrinho:", product.title);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header cartCount={cartItemCount} />
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/produtos"
              element={<ProductsPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/produtos/novo"
              element={<CreateProductPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;