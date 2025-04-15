import supabase from './supabase';

const productService = {
  async getProducts(page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('title', { ascending: true });

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }

    return { 
      products: data, 
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  },

  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }

    return data[0];
  }
};

export default productService;