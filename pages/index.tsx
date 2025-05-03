
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [lancamentos, setLancamentos] = useState<any[]>([]);

  useEffect(() => {
    const fetchLancamentos = async () => {
      const { data, error } = await supabase
        .from('tb_lancamento')
        .select('*')
        .order('data', { ascending: false });
      if (error) console.error(error);
      else setLancamentos(data);
    };
    fetchLancamentos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Meus Lançamentos</h1>
      <ul className="space-y-2">
        {lancamentos.map((item) => (
          <li
            key={item.id}
            className="bg-white shadow p-3 rounded border border-gray-200"
          >
            <div className="text-sm text-gray-600">{item.data}</div>
            <div className="font-semibold">{item.descricao}</div>
            <div className="text-green-600">R$ {item.valor.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
