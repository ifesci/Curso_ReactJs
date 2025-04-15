import { useQuery } from "@tanstack/react-query";
import CardsGrid from "../components/CardsGrid";
import productService from "../services/productService";

const HomePage = ({ onAddToCart }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => productService.getProducts(1, 3),
  });

  return (
    <div>
      <h1>Bem-vindo à Nossa Loja!</h1>
      <p>Confira nossos produtos em destaque:</p>
      
      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Erro ao carregar produtos.
        </div>
      ) : (
        <CardsGrid
          items={data?.products || []}
          onAddToCart={onAddToCart}
        />
      )}
      
      <div className="mt-4 text-center">
        <a href="/produtos" className="btn btn-primary">Ver todos os produtos</a>
      </div>
    </div>
  );
};

export default HomePage;