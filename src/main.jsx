import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@pages/App';
import { AuthProvider } from '@contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

window.queryClient = queryClient;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

//TODO: revisar README da aula 2
//TODO: revisar README da aula 3 e juntar com 3.1
//TODO: revisar README da aula 4 e verificar necessidade de seções sobre Supabase
//TODO: criar README da aula 5 com coisas que não foram abordadas na aula 4, incluindo a criação do modal para confirmações usando Bootstrap; verificar necessidade de seções sobre o Supabase
//TODO: resolver o problema da atividade em dupla e criar um README da aula 6 com isso, incluindo modificações no Supabase
//TODO: implementar o carrinho de compras e descrever isso no README da aula 7
//TODO: implementar fechamento da compra e pagamento e implementar isso na aula 8
//TODO: implementar gerencimamento de pedidos para cliente e admin e implementar isso na aula 9