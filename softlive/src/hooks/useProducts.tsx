// src/hooks/useProducts.ts

import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import productService from '../services/ProductService';
import { isEqual } from 'lodash'; // Precisaremos de uma ajuda para comparar objetos

// Instale o lodash se não tiver: npm install lodash @types/lodash
export interface Product {
  desc: string;
  id: string;
  nome: string;
  preco: string;
  categoria: string;
}

interface TableParams {
  pagination: TablePaginationConfig;
  filters?: Record<string, any>;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10, total: 0 }, // Começamos com total 0
  });

  const fetchProducts = useCallback(async (currentParams: TableParams) => {
    setLoading(true);
    try {
      const apiParams = {
        page: currentParams.pagination.current,
        limit: currentParams.pagination.pageSize,
        ...currentParams.filters,
      };
      const response = await productService.getAll(apiParams);
      setProducts(response.data);
    } catch (err) {
      notification.error({ 
        message: 'Erro ao buscar produtos',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Hook para buscar o total inicial ou quando os filtros mudam
  useEffect(() => {
    const fetchTotalAndData = async () => {
      setLoading(true);
      try {
        // Chamada para contar o total com os filtros atuais
        const totalResponse = await productService.getAll(tableParams.filters);
        const total = totalResponse.data.length;

        const newPagination = { ...tableParams.pagination, total, current: 1 };
        const newParams = { ...tableParams, pagination: newPagination };
        
        setTableParams(newParams);
        // Busca os dados da primeira página com os novos parâmetros
        fetchProducts(newParams);

      } catch (err) {
        notification.error({
            message: 'Erro ao buscar produtos',
         });
        setLoading(false);
      }
    };
    
    // Para a primeira carga da página
    if (tableParams.pagination.total === 0) {
        fetchTotalAndData();
    }
  }, []);


  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
  ) => {
    const hasFilterChanged = !isEqual(filters, tableParams.filters);

    if (hasFilterChanged) {
      // Se o filtro mudou, precisamos recontar o total e ir para a página 1
      const fetchTotalAndData = async () => {
        setLoading(true);
        try {
          const totalResponse = await productService.getAll(filters);
          const total = totalResponse.data.length;
          
          const newPagination = { ...pagination, total, current: 1 };
          const newParams = { pagination: newPagination, filters };

          setTableParams(newParams);
          fetchProducts(newParams);
        } catch(err) {
            notification.error({
                message: 'Erro ao buscar produtos',
             });
            setLoading(false);
        }
      };
      fetchTotalAndData();
    } else {
      // Se apenas a paginação mudou, apenas atualizamos e buscamos os dados
      const newParams = { pagination, filters };
      setTableParams(newParams);
      fetchProducts(newParams);
    }
  };

  return { products, loading, tableParams, handleTableChange };
};