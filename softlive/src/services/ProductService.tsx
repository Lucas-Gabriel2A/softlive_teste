import type { Product, ProductQueryParams } from '@/interfaces';
import axios from 'axios';

// ========================================================================
// INTERFACES E TIPOS (Definições centrais de dados)
// ========================================================================

// A estrutura de um Produto, para ser usada em todo o app


// ========================================================================
// CONFIGURAÇÃO DO SERVIÇO
// ========================================================================

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const productService = {
  /**
   * FUNÇÃO 1: Busca uma PÁGINA específica de produtos.
   * Usada para exibir os dados na tabela.
   * @param params Inclui filtros E paginação (page, limit).
   */
  getPaginated: (params?: ProductQueryParams) => {
    return api.get<Product[]>('/', { params });
  },

 
   
 
  getAllFiltered: (filters?: Omit<ProductQueryParams, 'page' | 'limit'>) => {
    return api.get<Product[]>('/', { params: filters });
  },

  getById: (id: string) => {
    return api.get<Product>(`/${id}`);
  },

  create: (productData: Omit<Product, 'id'>) => {
    return api.post<Product>('/', productData);
  },

  update: (id: string, productData: Partial<Omit<Product, 'id'>>) => {
    return api.put<Product>(`/${id}`, productData);
  },

  remove: (id: string) => {
    return api.delete(`/${id}`);
  },
};

export default productService;
