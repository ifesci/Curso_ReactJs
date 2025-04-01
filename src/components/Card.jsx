// Adiciona onAddToCartClick às props recebidas
const Card = ({ image, title, description, onAddToCartClick }) => {
  return (
    <>
      <div className="col">
        <div className="card">
          <img src={image} className="card-img-top" alt="imagem do card" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="card-footer">
            {/* Botão para adicionar ao carrinho */}
            {/* O evento onClick chama a função recebida via prop */}
            <button onClick={onAddToCartClick} className="btn btn-success w-100">
              Adicionar ao Carrinho
            </button>
            {/* O link "Ver Detalhes" foi removido para este exemplo,
                poderia ser mantido ou adaptado conforme a necessidade */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;