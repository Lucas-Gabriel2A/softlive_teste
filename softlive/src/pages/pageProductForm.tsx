import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { ProductForm } from '../components/prodcutionForm';
import type { Product } from '../interfaces';
import productService from '../services/ProductService';
import { App } from "antd";



export const PageProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  
  const [initialValues, setInitialValues] = useState<Partial<Product> | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Loading para busca inicial
  
  const isEditing = Boolean(id);

  useEffect(() => {
    // ✅ CORREÇÃO: Adicionamos uma verificação explícita `&& id`
    // Isso garante ao TypeScript que, dentro deste bloco, 'id' é uma string e não undefined.
    if (isEditing && id) {
      productService.getById(id)
        .then(response => {
          setInitialValues(response.data);
        })
        .catch(() => {
          notification.error({ message: 'Erro ao carregar produto', description: 'Não foi possível encontrar os dados do produto para edição.' });
          navigate('/products');
        })
        .finally(() => {
          setPageLoading(false);
        });
    } else {
      setPageLoading(false);
    }
  }, [id, isEditing, navigate]);

  const handleFinish = useCallback(async (values: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      const productData = {
        ...values,
        preco: String(values.preco), // Garante que o preço seja enviado como string, se necessário
      };

      if (isEditing && id) { // Adicionamos a mesma verificação aqui por segurança
        await productService.update(id, productData);
        notification.success({ message: 'Produto atualizado com sucesso!' });
      } else {
        await productService.create(productData);
        notification.success({ message: 'Produto criado com sucesso!' });
      }
     setTimeout(() => {
      navigate('/products');
    }, 100); 
    } catch (err) {
      notification.error({ message: 'Erro ao salvar', description: 'Não foi possível salvar o produto. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  }, [id, isEditing, navigate]);

  const handleCancel = () => {
    navigate('/products');
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Carregando formulário..." />
      </div>
    );
  }

  return (
    <ProductForm
      title={isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
      initialValues={initialValues}
      onFinish={handleFinish}
      onCancel={handleCancel}
      loading={loading}
    />
  );
};
