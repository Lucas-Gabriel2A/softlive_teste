import { useState, useEffect } from 'react';
import { Form, Input, Button, AutoComplete, Card, Typography, Space, Row, Col } from 'antd';
import { SaveOutlined, CloseCircleOutlined, AppstoreOutlined, EditOutlined } from '@ant-design/icons';
import type { Product } from '../interfaces';

const { Title } = Typography;

const categoryOptions = [
  { value: 'Eletrônicos' }, { value: 'Esportes' }, { value: 'Casa e Cozinha' },
  { value: 'Livros' }, { value: 'Ferramentas' }, { value: 'Roupas' },
  { value: 'Beleza e Cuidados Pessoais' }, { value: 'Brinquedos' }, { value: 'Saúde' },
  { value: 'Automotivo' }, { value: 'Música' }, { value: 'Games' },
  { value: 'Outros' }, { value: 'Tecnologia' }, { value: 'Acessórios' },
  { value: 'Alimentos e Bebidas' }, { value: 'Pets' }, { value: 'Jardinagem' },
  { value: 'Arte e Artesanato' },
];

interface ProductFormProps {
  title: string;
  initialValues?: Partial<Product>;
  onFinish: (values: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  loading: boolean;
}

export const ProductForm = ({ title, initialValues, onFinish, onCancel, loading }: ProductFormProps) => {
  const [form] = Form.useForm();
  const [priceInput, setPriceInput] = useState('');

  useEffect(() => {
    if (initialValues?.preco) {
      const initialPrice = Number(initialValues.preco);
      // Formatar o preço inicial para exibição
      const formattedPrice = (initialPrice).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setPriceInput(formattedPrice);
      form.setFieldsValue({ ...initialValues, preco: initialPrice });
    }
  }, [initialValues, form]);


  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove tudo exceto números
    let numbers = value.replace(/\D/g, '');
    
    // Se não há números, limpa tudo
    if (numbers === '') {
      setPriceInput('');
      form.setFieldValue('preco', undefined);
      return;
    }

    // Garante pelo menos 3 dígitos para ter centavos
    numbers = numbers.padStart(3, '0');
    
    // Separa parte inteira dos centavos (últimos 2 dígitos)
    const integerPart = numbers.slice(0, -2);
    const decimalPart = numbers.slice(-2);
    
    // Formata a parte inteira com separadores de milhares
    const formattedInteger = parseInt(integerPart).toLocaleString('pt-BR');
    
    // Monta o valor final SEMPRE com 2 casas decimais
    const formatted = `${formattedInteger},${decimalPart}`;
    
    // Valor numérico para o form
    const numericValue = parseFloat(`${integerPart}.${decimalPart}`);

    // Atualiza os valores
    setPriceInput(formatted);
    form.setFieldValue('preco', numericValue);
  };

  // Custom validator para o preço
  const validatePrice = () => ({
    validator(_: any, value: any) {
      if (!value || value <= 0) {
        return Promise.reject(new Error('Por favor, insira um preço válido!'));
      }
      return Promise.resolve();
    },
  });

  // Função para submissão - garante que o preço seja um número e valida
  const handleFormSubmit = (values: any) => {
    // Validação manual do preço já que não está no Form.Item
    if (!priceInput || form.getFieldValue('preco') <= 0) {
      form.setFields([
        {
          name: 'preco',
          errors: ['Por favor, insira um preço válido!'],
        },
      ]);
      return;
    }

    const formValues = {
      ...values,
      preco: form.getFieldValue('preco') // Pega o valor numérico real
    };
    onFinish(formValues);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8 flex justify-center items-start pt-16">
      <Card
        bordered={false}
        style={{ width: '100%', maxWidth: 700, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
      >
        <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>{title}</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={initialValues}
          autoComplete="off"
        >
          <Form.Item
            name="nome"
            label="Nome do Produto"
            rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
          >
            <Input size="large" placeholder="Ex: Notebook Gamer" prefix={<EditOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item name="desc" label="Descrição">
            <Input.TextArea rows={4} placeholder="Detalhes sobre o produto, como especificações, cor, etc." />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              {/* Campo preço SEM Form.Item - controle manual total */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Preço <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Input
                  size="large"
                  prefix="R$ "
                  placeholder="0,00"
                  value={priceInput}
                  onChange={handlePriceChange}
                  maxLength={20}
                  status={!priceInput ? 'error' : ''}
                />
                {!priceInput && (
                  <div style={{ color: '#ff4d4f', fontSize: '14px', marginTop: '4px' }}>
                    Por favor, insira o preço!
                  </div>
                )}
              </div>
              
              {/* Campo hidden para o Form */}
              <Form.Item name="preco" hidden>
                <Input type="hidden" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="categoria"
                label="Categoria"
                rules={[
                  { required: true, message: 'Por favor, selecione uma categoria!' },
                  { 
                    validator: (_, value) => 
                      categoryOptions.some(opt => opt.value === value) 
                        ? Promise.resolve() 
                        : Promise.reject(new Error('Por favor, selecione uma categoria válida.'))
                  }
                ]}
              >
                <AutoComplete
                  size="large"
                  options={categoryOptions}
                  placeholder="Selecione ou digite uma categoria"
                  filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                >
                  <Input size="large" prefix={<AppstoreOutlined className="site-form-item-icon" />} />
                </AutoComplete>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: '24px', textAlign: 'right' }}>
            <Space>
              <Button onClick={onCancel} icon={<CloseCircleOutlined />} size="large">
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} size="large">
                Salvar Produto
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};