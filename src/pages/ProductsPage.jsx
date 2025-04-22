import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CardsGrid from "../components/CardsGrid";
import productService from '../services/productService';
import { NavLink } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;

const ProductsPage = ({ onAddToCart }) => {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);

  // Buscar produtos usando React Query
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => productService.getProducts(currentPage, PRODUCTS_PER_PAGE),
    keepPreviousData: true,
  });

  // Renderização condicional para estados de carregamento e erro
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando produtos...</p>
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

  // Extrair dados da resposta
  const { products, total, totalPages } = data;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Todos os Produtos</h1>
        <NavLink to="/produtos/novo" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>
          Adicionar Produto
        </NavLink>
      </div>
      <p>Mostrando {products.length} de {total} produtos</p>

      {/* Grid de produtos */}
      <CardsGrid
        items={products}
        cols={4}
        onAddToCart={onAddToCart}
      />

      {/* Componente de paginação */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          {/* Botão Anterior */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>

          {/* Números de página */}
          {[...Array(totalPages).keys()].map(number => (
            <li
              key={number + 1}
              className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}

          {/* Botão Próximo */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}>
              Próximo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductsPage;