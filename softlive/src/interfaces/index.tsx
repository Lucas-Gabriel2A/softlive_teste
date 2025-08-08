export interface Product {
  id: string;
  nome: string;
  desc: string;
  preco: string;
  categoria: string;
}

// Parâmetros de busca que a API aceita
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  nome?: string;
  categoria?: string;
  sortBy?: keyof Product;
  order?: 'asc' | 'desc';
}