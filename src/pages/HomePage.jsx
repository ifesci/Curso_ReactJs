import { useQuery } from '@tanstack/react-query';
import CardsGrid from "@components/CardsGrid";
import productService from '@services/productService';

const HomePage = ({ onAddToCart }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => productService.getProductsByPage(1, 3),
  });

  return (
    <div>
      {isLoading ? (
        <p>Carregando destaques...</p>
      ) : isError ? (
        <p>Erro ao carregar destaques.</p>
      ) : (
        <CardsGrid
          title="Produtos em Destaque"
          items={data.products}
          cols={3}
          onAddToCart={onAddToCart}
        />
      )}
      <div className="mt-4 text-center">
        <a href="/products" className="btn btn-lg btn-dark">Ver todos os produtos</a>
      </div>
    </div>
  );
};

export default HomePage;