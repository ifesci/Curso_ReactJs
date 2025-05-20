import supabase from '@services/supabase';
import avatar40x40 from '@assets/img/avatar40x40.svg';

const profileService = {
    async getProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return {
                    id: user.id,
                    full_name: user.user_metadata?.full_name || '',
                    phone: '',
                    avatar_url: avatar40x40,
                };
            }
            throw error;
        }
        if (data.avatar_url) {
            data.avatar_url = supabase.storage.from('avatars').getPublicUrl(data.avatar_url).data.publicUrl;
        } else {
            data.avatar_url = avatar40x40;
        }
        return data;
    },

    async updateProfile({ full_name, phone, file }) {
        let avatar_url;
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const { error: upErr } = await supabase.storage
                .from('avatars')
                .upload(fileName, file);
            if (upErr) throw upErr;
            avatar_url = fileName;
        }
        const { data: { user } } = await supabase.auth.getUser();
        const { error: userUpdateError } = await supabase.auth.updateUser({
            data: { full_name }
        });
        if (userUpdateError) {
            console.error('User metadata update error:', userUpdateError);
            throw userUpdateError;
        }
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        const updates = { full_name, phone, avatar_url, updated_at: new Date() };
        let result;
        if (!existingProfile) {
            result = await supabase
                .from('profiles')
                .insert([{
                    id: user.id,
                    full_name: full_name || '',
                    phone: phone || '',
                    avatar_url: avatar_url || null,
                    created_at: new Date(),
                    updated_at: new Date()
                }])
                .select()
                .single();
        } else {
            result = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id)
                .select()
                .single();
        }
        const { data, error } = result;
        if (error) {
            console.error('Update error details:', error);
            throw error;
        }
        return data;
    },

    getAvatarUrl(avatar) {
        return avatar
            ? supabase.storage.from('avatars').getPublicUrl(avatar).data.publicUrl
            : avatar40x40;
    },
};

export default profileService;