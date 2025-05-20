const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const PAGE_DELTA = 3;
        const pages = [];
        const rangeStart = Math.max(1, currentPage - PAGE_DELTA);
        const rangeEnd = Math.min(totalPages, currentPage + PAGE_DELTA);
        if (rangeStart > 1) {
            pages.push('...');
        }
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }
        if (rangeEnd < totalPages) {
            pages.push('...');
        }
        return pages;
    };
    if (totalPages <= 1) return null;
    return (
        <ul className="pagination pagination-dark m-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}>
                    <i className="bi-chevron-double-left"></i>
                </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                    className="page-link"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <i className="bi bi-chevron-left"></i>
                </button>
            </li>
            {getPageNumbers().map((pageNum, index) => (
                <li
                    key={index}
                    className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => pageNum !== '...' && onPageChange(pageNum)}
                        disabled={pageNum === '...'}>
                        {pageNum}
                    </button>
                </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                    className="page-link"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}>
                    <i className="bi-chevron-double-right"></i>
                </button>
            </li>
        </ul>
    );
};

export default Pagination;