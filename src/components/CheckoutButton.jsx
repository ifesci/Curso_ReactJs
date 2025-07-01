import React, { useEffect, useState } from 'react';

 // Pega a chave pública do MP do arquivo .env
const PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;

function CheckoutButton({ cartItems, orderId }) {
  const [prefId, setPrefId] = useState(null);

  useEffect(() => {
    // Carrega MercadoPago SDK quando componente monta
    const mp = new window.MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
    if (prefId) {
      // Se já temos um Preference ID, renderiza o botão de checkout
      mp.checkout({
        preference: {
          id: prefId      // ID da preferência de pagamento gerada no backend
        },
        autoOpen: true    // pode abrir direto o modal de pagamento
      });
    }
  }, [prefId]);

  const handlePayment = async () => {
    // 1. Envia itens do carrinho para backend (Supabase Function) para criar a preferência
    const preference = await fetch('/api/criar_preferencia', {
      method: 'POST',
      body: JSON.stringify({ items: cartItems, order_id: orderId })
    }).then(res => res.json());
    if (preference.id) {
      setPrefId(preference.id);  // armazena Preference ID para acionar useEffect e abrir checkout
    }
  };

  return (
    <button onClick={handlePayment}>
      Pagar com Mercado Pago
    </button>
  );
}

export default CheckoutButton;
