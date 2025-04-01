import CardsGrid from "../components/CardsGrid";

// Recebe a lista completa de produtos e a função onAddToCart como props
const ProductsPage = ({ products, onAddToCart }) => {
  return (
    <div>
      {/* Usa o CardsGrid para exibir todos os produtos */}
      <CardsGrid
        title="Todos os Produtos"
        items={products}
        cols={4} // Mantém 4 colunas na página de produtos
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductsPage;