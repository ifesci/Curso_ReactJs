const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Maria Silva',
      role: 'CEO',
      description: 'Fundadora e visionária da empresa',
      img: 'https://picsum.photos/seed/ceo/200/200'
    },
    {
      name: 'João Santos',
      role: 'Diretor de Tecnologia',
      description: 'Especialista em inovação tecnológica',
      img: 'https://picsum.photos/seed/cto/200/200'
    },
    {
      name: 'Ana Oliveira',
      role: 'Diretora de Marketing',
      description: 'Estrategista de marketing digital',
      img: 'https://picsum.photos/seed/cmo/200/200'
    }
  ];

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">Quem Somos</h1>
          <p className="lead">
            Somos uma empresa dedicada à excelência em comércio eletrônico, 
            oferecendo produtos de alta qualidade e uma experiência única de compra.
          </p>
          <hr className="my-4" />
          <p>
            Fundada em 2024, nossa missão é proporcionar a melhor experiência 
            de compra online, com produtos selecionados e atendimento excepcional.
          </p>
        </div>
        <div className="col-md-6">
          <img 
            src="https://picsum.photos/seed/about/600/400" 
            alt="Nossa Empresa" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      <h2 className="text-center mb-5">Nossa Equipe</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm">
              <img 
                src={member.img} 
                className="card-img-top" 
                alt={member.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-subtitle mb-2 text-muted">{member.role}</p>
                <p className="card-text">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <h2 className="mb-4">Nossos Valores</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <i className="bi bi-star text-primary display-4"></i>
                  <h5 className="card-title mt-3">Qualidade</h5>
                  <p className="card-text">Comprometimento com a excelência em tudo que fazemos.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <i className="bi bi-heart text-primary display-4"></i>
                  <h5 className="card-title mt-3">Integridade</h5>
                  <p className="card-text">Transparência e honestidade em todas as relações.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <i className="bi bi-lightning text-primary display-4"></i>
                  <h5 className="card-title mt-3">Inovação</h5>
                  <p className="card-text">Busca constante por melhorias e soluções criativas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;