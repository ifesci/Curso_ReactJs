import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">Contato</h1>
          <p className="lead mb-4">
            Entre em contato conosco! Estamos sempre prontos para atender você.
          </p>
          
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-geo-alt text-primary fs-4 me-3"></i>
            <div>
              <h5 className="mb-0">Endereço</h5>
              <p className="mb-0">Av. Principal, 1000 - Centro</p>
              <p className="mb-0">São Paulo - SP</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-telephone text-primary fs-4 me-3"></i>
            <div>
              <h5 className="mb-0">Telefone</h5>
              <p className="mb-0">(11) 4002-8922</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-envelope text-primary fs-4 me-3"></i>
            <div>
              <h5 className="mb-0">E-mail</h5>
              <p className="mb-0">contato@reactshop.com</p>
            </div>
          </div>

          <img 
            src="https://picsum.photos/seed/contact/600/300" 
            alt="Nossa Loja" 
            className="img-fluid rounded mt-4"
          />
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Envie sua mensagem</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Assunto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Mensagem</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-send me-2"></i>
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;