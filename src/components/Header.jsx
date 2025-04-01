import { NavLink } from 'react-router-dom'; // Importa NavLink

// Recebe cartCount como prop
const Header = ({ cartCount = 0 }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          {/* Usa NavLink também para o brand, se desejar navegação SPA */}
          <NavLink className="navbar-brand" to="/">React Router App</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuPrincipal">
            <div className="navbar-nav">
              {/* Usa NavLink para os links de navegação */}
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
              <NavLink className="nav-link" to="/produtos">
                Produtos
              </NavLink>
              {/* Mantendo como 'a' por enquanto, pois não há rotas definidas */}
              <a className="nav-link" href="/sobre">Quem Somos</a>
              <a className="nav-link" href="/contato">Contato</a>
            </div>
            {/* Exibe a contagem do carrinho no final da navbar */}
            <span className="navbar-text ms-auto"> {/* ms-auto alinha à direita */}
              Carrinho:
              {/* Atualizando badge para primary para melhor contraste */}
              <span className="badge bg-primary rounded-pill ms-2">{cartCount}</span>
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;