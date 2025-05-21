import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, basePath = '' }) => {
    const location = useLocation();
    const getPageUrl = (page) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        return `${basePath || location.pathname}?${searchParams.toString()}`;
    };
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
                <Link
                    to={getPageUrl(1)}
                    className="page-link"
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    aria-disabled={currentPage === 1}>
                    <i className="bi-chevron-double-left"></i>
                </Link>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link
                    to={getPageUrl(Math.max(1, currentPage - 1))}
                    className="page-link"
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    aria-disabled={currentPage === 1}>
                    <i className="bi bi-chevron-left"></i>
                </Link>
            </li>
            {getPageNumbers().map((pageNum, index) => (
                <li
                    key={index}
                    className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}>
                    {pageNum === '...' ? (
                        <span className="page-link">...</span>
                    ) : (
                        <Link
                            to={getPageUrl(pageNum)}
                            className="page-link">
                            {pageNum}
                        </Link>
                    )}
                </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <Link
                    to={getPageUrl(Math.min(totalPages, currentPage + 1))}
                    className="page-link"
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    aria-disabled={currentPage === totalPages}>
                    <i className="bi bi-chevron-right"></i>
                </Link>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <Link
                    to={getPageUrl(totalPages)}
                    className="page-link"
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    aria-disabled={currentPage === totalPages}>
                    <i className="bi-chevron-double-right"></i>
                </Link>
            </li>
        </ul>
    );
};

export default Pagination;