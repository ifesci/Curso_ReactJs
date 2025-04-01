const Card = ({image, title, description, link}) => {
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
            <a href={link} className="btn btn-primary">Ver Detalhes</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;