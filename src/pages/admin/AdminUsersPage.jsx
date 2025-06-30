import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import adminService from '@services/adminService';
import { useAuth } from '@contexts/AuthContext';
import Pagination from '@components/Pagination';
import avatar40x40 from '@assets/img/avatar40x40.svg';

const USERS_PER_PAGE = 12;

const AdminUsersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const { user: currentUser } = useAuth();
    const {
        data,
        isLoading: loadingUsers,
        isError,
        error,
    } = useQuery({
        queryKey: ['profiles', currentPage],
        queryFn: () => adminService.getUsersByPage(currentPage, USERS_PER_PAGE),
    });
    const promoteMutation = useMutation({
        mutationFn: ({ id, makeAdmin }) =>
            adminService.setAdmin(id, makeAdmin),
        onSuccess: (_, { makeAdmin }) => {
            toast.success(
                makeAdmin ? 'Usuário promovido a administrador.' : 'Usuário despromovido.',
                { icon: '✅' }
            );
            queryClient.invalidateQueries(['profiles']);
        },
        onError: err => toast.error(`Erro: ${err.message}`, { icon: '❌' }),
    });
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };
    const deleteMutation = useMutation({
        mutationFn: adminService.deleteUser,
        onSuccess: () => {
            toast.success('Usuário excluído', { icon: '🗑️' });
            queryClient.invalidateQueries(['profiles']);
        },
        onError: err => toast.error(`Erro: ${err.message}`, { icon: '❌' }),
    });
    const [search, setSearch] = useState('');
    const filteredUsers = data?.profiles ? data.profiles.filter(u =>
        u.full_name.toLowerCase().includes(search.toLowerCase())
    ) : [];
    if (isError) {
        return (
            <div className="alert alert-danger mt-4">
                Erro ao carregar usuários: {error.message}
            </div>
        );
    }
    return (
        <div className="row justify-content-center">
            <div className="col-12">
                <div className="card">
                    <div className="card-header text-bg-light d-flex justify-content-between align-items-center py-3">
                        <h2 className="mb-0">Usuários</h2>
                        <input
                            type="search"
                            className="form-control w-auto"
                            placeholder="Pesquisar…"
                            value={search}
                            onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="card-body p-0">
                        {loadingUsers ? (
                            <div className="text-center my-5">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped align-middle mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="one-line-cell px-3">Avatar</th>
                                            <th>Nome</th>
                                            <th className="text-center">Telefone</th>
                                            <th className="text-center">Perfil</th>
                                            <th className="text-center" style={{ width: 220 }}>
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">
                                                    Nenhum usuário encontrado.
                                                </td>
                                            </tr>
                                        )}
                                        {filteredUsers.map(u => {
                                            const isSelf = u.id === currentUser?.id;
                                            const busyRow =
                                                (promoteMutation.isPending &&
                                                    promoteMutation.variables?.id === u.id) ||
                                                (deleteMutation.isPending && deleteMutation.variables === u.id);
                                            return (
                                                <tr key={u.id}>
                                                    <td className="one-line-cell px-3">
                                                        <img
                                                            src={u.avatar_url}
                                                            alt="avatar"
                                                            className="rounded-circle"
                                                            style={{
                                                                width: 40,
                                                                height: 40,
                                                                objectFit: 'cover',
                                                            }}
                                                            onError={(e) => {
                                                                e.target.src = avatar40x40;
                                                            }} />
                                                    </td>
                                                    <td>{u.full_name}</td>
                                                    <td className="one-line-cell px-3">{u.phone || '—'}</td>
                                                    <td className="one-line-cell px-3">
                                                        <span
                                                            className={`badge ${u.is_admin
                                                                ? 'text-bg-primary'
                                                                : 'text-bg-secondary'
                                                                }`}>
                                                            {u.is_admin ? 'Admin' : 'Usuário'}
                                                        </span>
                                                    </td>
                                                    <td className="one-line-cell px-3">
                                                        {busyRow ? (
                                                            <span
                                                                className="spinner-border spinner-border-sm"
                                                                role="status"></span>
                                                        ) : (
                                                            <>
                                                                {!isSelf && (
                                                                    <button
                                                                        className="btn btn-sm btn-outline-warning me-2"
                                                                        onClick={() =>
                                                                            promoteMutation.mutate({
                                                                                id: u.id,
                                                                                makeAdmin: !u.is_admin,
                                                                            })
                                                                        }>
                                                                        {u.is_admin
                                                                            ? 'Remover admin'
                                                                            : 'Tornar admin'}
                                                                    </button>
                                                                )}
                                                                {!isSelf && (
                                                                    <button
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => {
                                                                            if (
                                                                                window.confirm(
                                                                                    'Excluir usuário? Esta ação é irreversível.'
                                                                                )
                                                                            ) {
                                                                                deleteMutation.mutate(u.id);
                                                                            }
                                                                        }}>
                                                                        Excluir
                                                                    </button>
                                                                )}
                                                                {isSelf && (
                                                                    <span className="text-muted">(você)</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {data?.totalPages > 1 && (
                <>
                    <div className="d-flex justify-content-center mb-2">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data?.totalPages}
                            onPageChange={handlePageChange} />
                    </div>
                    <p className="small text-center m-0">
                        Mostrando página {currentPage} de {data?.totalPages}
                    </p>
                </>
            )}
        </div>
    );
};

export default AdminUsersPage;