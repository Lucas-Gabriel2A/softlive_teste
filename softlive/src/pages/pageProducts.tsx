// ========================================================================
// IMPORTS
// ========================================================================
import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Table, Spin, Typography, Modal, notification, Dropdown, Menu, Card, Tag, Avatar, Space, Input, Alert
} from 'antd';
import { 
  PlusOutlined, ExclamationCircleOutlined, MoreOutlined, EditOutlined, DeleteOutlined, BoxPlotOutlined, SearchOutlined 
} from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';

// Nossos módulos customizados
import { useProducts, type Product } from '../hooks/useProducts';
import productService from '../services/ProductService';

// Componentes de tipografia do Ant Design
const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

// ========================================================================
// COMPONENTE AUXILIAR PARA FILTRO DE BUSCA
// Definido fora do componente principal para não ser recriado a cada render
// ========================================================================
const getColumnSearchProps = (dataIndex: keyof Product): ColumnType<Product> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Buscar por ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
          Limpar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
});


// ========================================================================
// COMPONENTE PRINCIPAL DA PÁGINA
// ========================================================================
export const PageProducts = () => {
  // --------------------------------------------------------------------
  // Hooks: Para navegação e para buscar/gerenciar nossos dados
  // --------------------------------------------------------------------
  const navigate = useNavigate();
  const { products, loading, tableParams, handleTableChange,  } = useProducts();

  // --------------------------------------------------------------------
  // Handlers de Ação: Memorizados com useCallback para otimização
  // --------------------------------------------------------------------
  const handleAddProduct = useCallback(() => navigate('/products/new'), [navigate]);
  const handleEditProduct = useCallback((id: string) => navigate(`/products/edit/${id}`), [navigate]);

  const handleDeleteProduct = useCallback((product: Product) => {
    confirm({
      title: `Excluir "${product.nome}"?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Esta ação é permanente e não poderá ser desfeita.',
      okText: 'Sim, excluir',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await productService.remove(product.id);
          notification.success({
            message: 'Produto Excluído',
            description: `"${product.nome}" foi removido com sucesso.`,
          });
          fetchProducts();
        } catch (err) {
          notification.error({
            message: 'Falha na Exclusão',
            description: 'Não foi possível remover o produto. Tente novamente.',
          });
          console.error('Erro ao excluir produto:', err);
        }
      },
    });
  }, [fetchProducts]);

  // --------------------------------------------------------------------
  // Colunas da Tabela: Memorizadas com useMemo para otimização
  // --------------------------------------------------------------------
  const columns: ColumnsType<Product> = useMemo(() => [
    {
      title: 'Produto',
      dataIndex: 'nome',
      key: 'nome',
      ...getColumnSearchProps('nome'),
      render: (nome) => <Text strong>{nome}</Text>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      ...getColumnSearchProps('categoria'),
      render: (categoria) => <Tag color="blue">{categoria?.toUpperCase()}</Tag>,
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (price) => <Tag color="green">R$ {parseFloat(price).toFixed(2).replace('.', ',')}</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEditProduct(record.id)}>
                Editar
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDeleteProduct(record)}>
                Excluir
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} shape="circle" />
        </Dropdown>
      ),
    },
  ], [handleEditProduct, handleDeleteProduct]);

  // --------------------------------------------------------------------
  // Renderização do Componente
  // --------------------------------------------------------------------
  if (loading && !products.length) { // Spinner em tela cheia apenas no carregamento inicial
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Spin size="large" tip="Carregando produtos..." />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8">
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <Title level={2} style={{ margin: 0, marginBottom: '4px' }}>
              Gerenciamento de Produtos
            </Title>
            <Text type="secondary">{tableParams.pagination.total} produtos encontrados</Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddProduct}
            className="mt-4 sm:mt-0"
          >
            Adicionar Produto
          </Button>
        </header>
        
        <main>
          {error && <Alert message="Erro" description={error} type="error" showIcon className="mb-4" />}
          
          <Table<Product>
            columns={columns}
            dataSource={products}
            rowKey="id"
              scroll={{ y: 'calc(100vh - 320px)' }}
            loading={loading} // O spinner agora aparece sobre a tabela ao filtrar/paginar
            pagination={tableParams.pagination}
            onChange={handleTableChange} // Conecta a tabela ao nosso hook para controle server-side
            className="shadow-sm"
            expandable={{
              expandedRowRender: (record) => <Paragraph style={{ margin: 0 }}>{record.desc}</Paragraph>,
              rowExpandable: (record) => !!record.desc,
            }}
          />
        </main>
      </Card>
    </div>
  );
};