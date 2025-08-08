import axios from 'axios';

// Supondo que você tenha essa interface definida em algum lugar central, como no seu hook
// Se não tiver, pode defini-la aqui.
interface Product {
  id: string;
  nome: string;
  desc: string;
  preco: string;
  categoria: string;
}

// 1. Interface para os parâmetros de busca (filtros e paginação)
// Deixamos os campos como opcionais (?) pois nem sempre serão usados.
interface ProductQueryParams {
  page?: number;
  limit?: number;
  nome?: string;
  categoria?: string;
  sortBy?: keyof Product; // Permite ordenar por qualquer chave de Produto
  order?: 'asc' | 'desc';   // Apenas 'asc' ou 'desc' são válidos
}

// 2. Type para os dados de um NOVO produto (um Produto, mas sem o 'id')
type NewProductData = Omit<Product, 'id'>;

// 3. Type para os dados de ATUALIZAÇÃO (pode ser qualquer parte do Produto)
type UpdateProductData = Partial<NewProductData>;


const API_URL = 'https://688f9e5ff21ab1769f89b590.mockapi.io/api/products/products';

const api = axios.create({
  baseURL: API_URL,
});

const productService = {
  /**
   * Busca produtos com parâmetros de paginação e filtro.
   */
  // ANTES: getAll: (params: object) => { ... }
  getAll: (params?: ProductQueryParams) => {
    return api.get<Product[]>('/', { params }); // Dica: `api.get<Product[]>` tipa a resposta esperada
  },

  /**
   * Busca um produto específico pelo seu ID.
   */
  getById: (id: string) => {
    return api.get<Product>(`/${id}`);
  },

  /**
   * Cria um novo produto.
   */
  // ANTES: create: (productData: object) => { ... }
  create: (productData: NewProductData) => {
    return api.post<Product>('/', productData);
  },

  /**
   * Atualiza um produto existente.
   */
  // ANTES: update: (id: string, productData: object) => { ... }
  update: (id: string, productData: UpdateProductData) => {
    return api.put<Product>(`/${id}`, productData);
  },

  /**
   * Exclui um produto.
   */
  remove: (id: string) => {
    return api.delete(`/${id}`);
  },
};

export default productService;