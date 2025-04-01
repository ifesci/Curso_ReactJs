import CardsGrid from "../components/CardsGrid";

// Recebe a lista de produtos e a função onAddToCart como props
const HomePage = ({ products, onAddToCart }) => {

  // Simula produtos em destaque pegando os 3 primeiros
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      <h1>Bem-vindo à Nossa Loja!</h1>
      <p>Confira nossos produtos em destaque:</p>
      <CardsGrid
        title="Destaques"
        items={featuredProducts}
        cols={3} // Exibe 3 colunas na home
        onAddToCart={onAddToCart}
      />
      {/* Poderia adicionar mais seções aqui, como banners, etc. */}
    </div>
  );
};

export default HomePage;