import { useMemo, useCallback, useState } from 'react'; // ✅ Adicionado useState
import { useNavigate } from 'react-router-dom';
import {
  Button, Table, Spin, Typography, Modal, Dropdown, Menu, Card, Tag, Input, Alert, Space
} from 'antd';
import { 
  PlusOutlined, ExclamationCircleOutlined, MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined 
} from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../interfaces';
import  productService from '../services/ProductService';
import {App} from "antd";

const { Title, Text, Paragraph } = Typography;

const getColumnSearchProps = (dataIndex: keyof Product): ColumnType<Product> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
    const handleReset = () => {
      if (clearFilters) clearFilters();
      confirm({ closeDropdown: true });
    };
    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm({ closeDropdown: true })}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm({ closeDropdown: true })}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={handleReset} size="small" style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </div>
    );
  },
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
});

export const PageProducts = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { products, loading, error, tableParams, handleTableChange, refetch } = useProducts();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddProduct = useCallback(() => navigate('/products/new'), [navigate]);
  const handleEditProduct = useCallback((id: string) => navigate(`/products/edit/${id}`), [navigate]);


  const showDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

 
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await productService.remove(productToDelete.id);
      notification.success({ message: 'Produto Excluído!', description: `O produto "${productToDelete.nome}" foi removido com sucesso.` });
      
      setTimeout(() => {
        refetch();
      }, 300);
    } catch (err) {
      notification.error({ message: 'Falha na Exclusão' });
    } finally {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

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
      render: (cat) => <Tag color="blue">{cat?.toUpperCase()}</Tag>,
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
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => showDeleteModal(record)}>
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
  ], [handleEditProduct, showDeleteModal]);

  if (loading && tableParams.pagination.total === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Spin size="large" tip="A carregar produtos..." />
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8">
        <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <Title level={2} style={{ margin: 0, marginBottom: '4px' }}>
                Gestão de Produtos
              </Title>
              <Text type="secondary">
                {tableParams.pagination.total} produtos encontrados
              </Text>
            </div>
            <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAddProduct} className="mt-4 sm:mt-0">
              Adicionar Produto
            </Button>
          </header>
          
          <main>
            {error && <Alert message="Erro" description={error} type="error" showIcon className="mb-4" />}
            
            <Table<Product>
              columns={columns}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
              scroll={{ y: 'calc(100vh - 350px)' }}
              className="shadow-sm"
              expandable={{
                expandedRowRender: (record) => <Paragraph style={{ margin: 0 }}>{record.desc}</Paragraph>,
                rowExpandable: (record) => !!record.desc,
              }}
            />
          </main>
        </Card>
      </div>

   
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            <span>Excluir o produto?</span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleModalCancel}
        okText="Sim, excluir"
        okButtonProps={{ danger: true }}
        cancelText="Cancelar"
      >
        {productToDelete && (
          <div>
            <p>Esta ação é permanente. Tem a certeza de que deseja remover o seguinte produto do seu catálogo?</p>
            <div style={{ marginTop: 16, padding: '8px 16px', background: '#fafafa', borderRadius: 6, border: '1px solid #f0f0f0' }}>
              <Text strong>{productToDelete.nome}</Text><br />
              <Text type="secondary">Categoria: </Text><Tag color="blue">{productToDelete.categoria?.toUpperCase()}</Tag><br />
              <Text type="secondary">Preço: </Text><Tag color="green">R$ {parseFloat(productToDelete.preco).toFixed(2).replace('.', ',')}</Tag>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
