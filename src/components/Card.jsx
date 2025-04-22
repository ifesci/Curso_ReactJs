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
            <button onClick={onAddToCartClick} className="btn btn-success w-100">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;