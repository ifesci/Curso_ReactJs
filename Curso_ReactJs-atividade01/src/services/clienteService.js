import supabase from './supabase';

const clientService = {
  async getClients(page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }

    return { 
      clients: data, 
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  }
};

export default clientService;