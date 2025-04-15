import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ClientsTable from '../components/ClientsTable';
import Pagination from '../components/Pagination';
import clientService from '../services/clientService';

const ClientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const CLIENTS_PER_PAGE = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['clients', currentPage],
    queryFn: () => clientService.getClients(currentPage, CLIENTS_PER_PAGE),
  });

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Erro ao carregar clientes.
      </div>
    );
  }

  return (
    <div>
      <h1>Clientes</h1>
      <p className="text-muted">
        Total de {data.total} clientes cadastrados
      </p>
      
      <ClientsTable clients={data.clients} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ClientsPage;