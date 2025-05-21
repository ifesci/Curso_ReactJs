import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import CardsGrid from "@components/CardsGrid";
import productService from '@services/productService';

const PRODUCTS_PER_PAGE = 8;

const ProductsPage = ({ onAddToCart }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => productService.getProductsByPage(currentPage, PRODUCTS_PER_PAGE),
    keepPreviousData: true,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-dark" role="status">
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
  const { products, totalPages } = data;
  return (
    <div>
      <CardsGrid
        title="Todos os Produtos"
        items={products}
        cols={4}
        onAddToCart={onAddToCart}
        currentPage={currentPage}
        totalPages={totalPages} />
    </div>
  );
};

export default ProductsPage;