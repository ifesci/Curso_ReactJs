import placeholderIndisponivel from '@assets/img/indisponivel3x2.svg';
import { formatPrice } from '@assets/js/util';

const Card = ({ image, title, description, price, onAddToCartClick }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className='p-1'>
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            onError={(e) => {
              e.target.src = placeholderIndisponivel;
            }} />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <div className="mt-auto">
            <p className="card-text fw-bold text-danger fs-3 mb-2">
              {formatPrice(price)}
            </p>
          </div>
        </div>
        <div className="card-footer p-3">
          <button
            onClick={onAddToCartClick}
            className="btn btn-danger btn-lg w-100">
            <i className="bi-cart-plus me-2"></i>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;