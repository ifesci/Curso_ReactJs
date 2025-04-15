const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Gerar array de páginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Navegação de páginas">
      <ul className="pagination justify-content-center">
        {/* Botão Anterior */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
            Anterior
          </button>
        </li>

        {/* Números das páginas */}
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botão Próxima */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;