const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">React</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuPrincipal">
            <div className="navbar-nav">
              <a className="nav-link active" href="/">Home</a>
              <a className="nav-link" href="/produtos">Produtos</a>
              <a className="nav-link" href="/sobre">Quem Somos</a>
              <a className="nav-link" href="/contato">Contato</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;