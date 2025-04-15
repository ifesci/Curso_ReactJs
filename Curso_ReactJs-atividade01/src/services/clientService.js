import supabase from './supabase';

const clientService = {
  async getClients(page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await supabase
        .from('clients')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('name', { ascending: true });

      if (error) throw error;

      return { 
        clients: data || [], 
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  }
};

export default clientService;