import React from 'react';
import HeaderContent from '../../../../templates/HeaderContent';
import { Table, Tag, Divider, Button } from 'antd';
import Card from '../../../../components/molecules/Card';
import Icon from '../../../../components/atoms/Icon';
import { Link } from 'react-router-dom';

export default function EntityDetectionEntities (props) {

    const dataSource = [
        {
            key: '1',
            label: 'CNPJ',
            description: 'Lorem ipsum dolor sit amet',
            icon: 'user',
            color: 'gold'
        },
        {
            key: '1',
            label: 'Organização',
            description: 'Lorem ipsum dolor sit amet',
            icon: 'building',
            color: 'blue'
        },
        
      ];
      
      const columns = [
        {
          title: 'Entidade',
          dataIndex: 'label',
          key: 'label',
          render: (label, record) => (
            <Tag color={record.color}><Icon icon={record.icon} /> {label}</Tag>
          )
        },
        {
          title: 'Descrição',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Ação',
          key: 'action',
          render: (text, record) => (
              <>
                <a className="mr-2"><Icon icon="edit" /></a>
                <a className="color-danger"><Icon icon="trash" /></a>
              </>
          ),
        }
      ];

    return (
        <HeaderContent subtitle="Projeto de teste" color="HEX">
            
            <Card title="Entidades" icon="tags">
                <Table dataSource={dataSource} columns={columns} />
                <Divider />
                <div className="ta-c">
                  <Link to="/entity-detection/entities/new"><Button type="primary">Cadastrar entidade</Button></Link>
                </div>
            </Card>

        </HeaderContent>
    );

}