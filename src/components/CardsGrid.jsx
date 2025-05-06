import Card from "@components/Card";

const CardsGrid = ({ title, items, cols = 4, onAddToCart }) => {
  const colClass = `row-cols-1 row-cols-md-${Math.max(1, Math.floor(cols / 2))} row-cols-lg-${cols}`;
  return (
    <section className="mb-4">
      <h2>{title}</h2>
      <hr />
      <div className={`row ${colClass} g-3 align-items-stretch`}>
        {items.map((item) => (
          <Card
            key={item.id}
            image={item.image_url}
            title={item.title}
            description={item.description}
            price={item.price}
            link={`/item/${item.id}`}
            onAddToCartClick={() => onAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsGrid;