import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { toast } from 'react-hot-toast';

const CreateProductPage = () => {
  const navigate = useNavigate();
  
  // Estado do formulário
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    img: '' // Changed from image to img
  });
  
  // Estado para validação
  const [errors, setErrors] = useState({});

  // Mutation para criar produto
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      toast.success('Produto criado com sucesso!', {
        duration: 5000,
        icon: '✅',
      });
      navigate('/produtos');
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`, {
        duration: 5000,
      });
    }
  });

  // Manipuladores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!product.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }
    
    if (!product.price) {
      newErrors.price = 'O preço é obrigatório';
    } else if (isNaN(Number(product.price)) || Number(product.price) <= 0) {
      newErrors.price = 'O preço deve ser um número positivo';
    }
    
    if (!product.img.trim()) {
      newErrors.img = 'A URL da imagem é obrigatória';
    } else if (!product.img.match(/^https?:\/\/.+/i)) {
      newErrors.img = 'URL da imagem inválida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Converter preço para número antes de enviar
      const productToSave = {
        ...product,
        price: parseFloat(product.price)
      };
      
      createProductMutation.mutate(productToSave);
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Cadastrar Novo Produto</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Campo Título */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              
              {/* Campo Descrição */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descrição</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  rows="3"
                  value={product.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
              
              {/* Campo Preço */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              
              {/* Campo URL da Imagem */}
              <div className="mb-3">
                <label htmlFor="img" className="form-label">URL da Imagem</label>
                <input
                  type="text"
                  className={`form-control ${errors.img ? 'is-invalid' : ''}`}
                  id="img"
                  name="img"
                  value={product.img}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                {errors.img && <div className="invalid-feedback">{errors.img}</div>}
              </div>
              
              {/* Previsualização da Imagem */}
              {product.img && (
                <div className="mb-3 text-center">
                  <p>Previsualização:</p>
                  <img 
                    src={product.img} 
                    alt="Previsualização" 
                    className="img-thumbnail" 
                    style={{ maxHeight: '200px' }} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Imagem+Inválida';
                    }}
                  />
                </div>
              )}
              
              {/* Botões de Ação */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/produtos')}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={createProductMutation.isLoading}
                >
                  {createProductMutation.isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : 'Cadastrar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateProductPage;