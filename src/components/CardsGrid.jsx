import Card from "./Card"; // Importa o componente Card

// Recebe title, items (array) e cols (número) como props
// Adiciona onAddToCart à lista de props recebidas
const CardsGrid = ({ title, items, cols = 4, onAddToCart }) => { // Define cols=4 como padrão
  // Define a classe de coluna do Bootstrap dinamicamente
  // Ex: se cols=3, a classe será "row-cols-1 row-cols-md-3"
  // Ajuste a lógica de responsividade conforme necessário
  const colClass = `row-cols-1 row-cols-md-${Math.max(1, Math.floor(cols / 2))} row-cols-lg-${cols}`;
  return (
    <section className="mb-4"> {/* Adiciona margem inferior para separação */}
      <h2>{title}</h2> {/* Exibe o título recebido via prop */}
      <hr />
      <div className={`row ${colClass} g-3`}> {/* Usa a classe de coluna dinâmica e espaçamento g-3 */}
        {/* Mapeia o array 'items' recebido via prop */}
        {items.map((item) => (
          // Renderiza um Card para cada item, passando as props necessárias
          // Assume que cada 'item' tem id, image, title, description
          <Card
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            // Cria um link genérico, pode ser ajustado conforme a necessidade
            link={`/item/${item.id}`}
            // Passa a função onAddToCart para o Card, associando-a ao item específico
            // Usamos uma arrow function para garantir que 'item' seja passado corretamente
            // quando o botão no Card for clicado.
            onAddToCartClick={() => onAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsGrid;