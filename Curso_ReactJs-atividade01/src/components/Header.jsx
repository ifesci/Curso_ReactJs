import { NavLink } from 'react-router-dom';

const Header = ({ cartCount = 0 }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">React Router App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/produtos">
              Produtos
            </NavLink>
            <NavLink className="nav-link" to="/clientes">
              Clientes
            </NavLink>
            <NavLink className="nav-link" to="/produtos/novo">
              Novo Produto
            </NavLink>
            <NavLink className="nav-link" to="/sobre">
              Quem Somos
            </NavLink>
            <NavLink className="nav-link" to="/contato">
              Contato
            </NavLink>
          </div>
          <span className="navbar-text ms-auto">
            Carrinho:
            <span className="badge bg-primary rounded-pill ms-2">{cartCount}</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;