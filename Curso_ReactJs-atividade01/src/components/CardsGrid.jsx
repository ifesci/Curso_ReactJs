const CardsGrid = ({ items = [], onAddToCart }) => {
  if (!items || items.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {items.map((product) => (
        <div key={product.id} className="col">
          <div className="card h-100">
            <img
              src={product.img}
              className="card-img-top"
              alt={product.title}
              style={{ height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Produto';
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text text-truncate">{product.description}</p>
              <p className="card-text">
                <strong>Preço: </strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product.price)}
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => onAddToCart?.(product)}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsGrid;