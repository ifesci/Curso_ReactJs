import supabase from '@services/supabase';
import avatar40x40 from '@assets/img/avatar40x40.svg';

const adminService = {
    async getUsersByPage(page = 1, limit = 12) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        const { data, error, count } = await supabase
            .from('profiles')
            .select('id, full_name, phone, is_admin, avatar_url', { count: 'exact' })
            .range(from, to)
            .order('full_name', { ascending: true });
        if (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
        for (const user of data) {
            if (user.avatar_url) {
                user.avatar_url = supabase.storage.from('avatars').getPublicUrl(user.avatar_url).data.publicUrl;
            } else {
                user.avatar_url = {avatar40x40};
            }
        }
        return {
            profiles: data,
            total: count,
            totalPages: Math.ceil(count / limit)
        };
    },
    async setAdmin(id, makeAdmin) {
        const { error } = await supabase
            .from('profiles')
            .update({ is_admin: makeAdmin })
            .eq('id', id);
        if (error) {
            console.error('Erro ao atualizar privilégio admin:', error);
            throw error;
        }
        return true;
    },

    async deleteUser(id) {
        const { error } = await supabase.rpc('delete_user', {
            user_id: id,
        });
        if (error) {
            console.error('Erro ao excluir usuário:', error);
            throw error;
        }
        return true;
    },
};

export default adminService;