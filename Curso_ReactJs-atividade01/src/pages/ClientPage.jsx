import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ClientsTable from './components/ClientsTable';
import Pagination from './components/Pagination';
import clientService from './services/clientService';

const ClientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const CLIENTS_PER_PAGE = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['clients', currentPage],
    queryFn: () => clientService.getClients(currentPage, CLIENTS_PER_PAGE),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando clientes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Erro ao carregar clientes: {error.message}
      </div>
    );
  }

  const { clients, total, totalPages } = data;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clientes</h1>
        <p>Total de {total} clientes</p>
      </div>

      <ClientsTable clients={clients} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ClientsPage;