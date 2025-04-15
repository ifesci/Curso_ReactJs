import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ClientsTable = ({ clients = [] }) => {
  const formatDate = (dateString) => {
    try {
      // First try to parse the ISO date string
      const date = parseISO(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Data inválida';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Foto</th>
            <th scope="col">Nome</th>
            <th scope="col">Data de Nascimento</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <img 
                  src={client.img} 
                  alt={client.name} 
                  className="rounded-circle"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40?text=Avatar';
                  }}
                />
              </td>
              <td>{client.name}</td>
              <td>
                {formatDate(client.birthDate)}
              </td>
              <td>{client.email}</td>
              <td>{client.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;