import { useState, useEffect } from 'react';
import { notification } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { isEqual } from 'lodash';
import type { SorterResult } from 'antd/es/table/interface';
import type { Product, ProductQueryParams } from '../interfaces';
import productService from '../services/ProductService';


interface TableParams {
  pagination: TablePaginationConfig;
  filters?: Omit<ProductQueryParams, 'page' | 'limit' | 'sortBy' | 'order'>;
  sorter?: SorterResult<Product> | SorterResult<Product>[];
}


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0); // Gatilho para forçar a atualização

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10, total: 0 },
    filters: {},
    sorter: { field: 'id', order: 'descend' },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const sorter = Array.isArray(tableParams.sorter) ? tableParams.sorter[0] : tableParams.sorter;
        
        const apiParams: ProductQueryParams = {
          ...tableParams.filters,
          page: tableParams.pagination.current,
          limit: tableParams.pagination.pageSize,
          sortBy: sorter?.field as keyof Product,
          order: sorter?.order === 'ascend' ? 'asc' : 'desc',
        };


        const [totalResponse, dataResponse] = await Promise.all([
          productService.getAllFiltered(apiParams),
          productService.getPaginated(apiParams)
        ]);
        
        const total = totalResponse.data.length;
        
        setProducts(dataResponse.data);

        setTableParams(prevParams => ({
          ...prevParams,
          pagination: { 
            ...prevParams.pagination, 
            total 
          },
        }));

      } catch (err) {
        const errorMessage = 'Não foi possível carregar os produtos.';
        setError(errorMessage);
        notification.error({ message: 'Erro na Requisição', description: errorMessage });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(tableParams.filters), tableParams.pagination.current, tableParams.pagination.pageSize, tableParams.sorter, refetchTrigger]); // ✅ CORREÇÃO: Dependências mais granulares para evitar o loop.

 
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<Product> | SorterResult<Product>[],
  ) => {
    const hasFilterChanged = !isEqual(filters, tableParams.filters);
    const newPagination = hasFilterChanged ? { ...pagination, current: 1 } : pagination;

    setTableParams({
      pagination: newPagination,
      filters,
      sorter,
    });
  };

 
  const refetch = () => {
    setRefetchTrigger(c => c + 1);
  };

  return { products, loading, error, tableParams, handleTableChange, refetch };
};
