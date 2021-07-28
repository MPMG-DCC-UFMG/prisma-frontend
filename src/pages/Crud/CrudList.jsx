import React from 'react';
import HeaderContent from '../../templates/HeaderContent';
import { Table, Popconfirm, Divider, Button, message, Tag } from 'antd';
import Card from '../../components/molecules/Card';
import Icon from '../../components/atoms/Icon';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { ApiRequest } from '../../services/apiRequestService';
import { UrlBuilder } from '../../services/urlBuilder/urlBuilder';
import { FixPath } from '../../services/fixPath';

export default function CrudList (props) {

    const { formData } = props;
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const params = useParams();

    const baseUrl = () => {
      let url = new UrlBuilder(formData.baseRoute).get();
      return FixPath.fix(url, params);
    }

    useEffect(()=>{
      loadData();
      loadColumns();
    }, []);

    const renderCel = (label, record, field) => {
      switch(field.type) {
        case "switch":
          return label ? <Tag color="green">Sim</Tag> : <Tag color="red">Não</Tag>;
        default: 
          return field.link ? <Link to={FixPath.fix(field.link, params, record.id)}>{label}</Link> : label;
      }
    }

    const additionalButtons = (record) => {
      let buttons = [];
      formData.list?.includeButtons?.forEach(button => {
        buttons.push(<Link 
                        to={FixPath.fix(button.path, params, record.id)} className="mr-2">
                        <Icon icon={button.icon} />
                      </Link>)
      })
      return buttons;
    }

    const loadColumns = () => {
      const formFields = formData.form
        .filter(field => field.showInTable )
        .map(field => ({ 
          title: field.label, 
          key: field.name, 
          dataIndex: field.name,
          render: (label, record) => renderCel(label, record, field)
        }));
      const actions = {
        title: 'Ação',
        key: 'action',
        width: 100,
        render: (text, record) => (
            <>
              { additionalButtons(record) }
              <Link to={`/${FixPath.fix(formData.path, params)}${record.id}`} className="mr-2"><Icon icon="edit" /></Link>
              <Popconfirm
                title={`Você deseja realmente remover este item?`}
                onConfirm={(e) => deleteItem(record)}
                okText="Sim"
                cancelText="Não"
                >
                <a href="#" className="color-danger"><Icon icon="trash" /></a>
              </Popconfirm>
            </>
        ),
      };
      formFields.push(actions);
      setColumns(formFields);
    }

    const deleteItem = async (data) => {
      try {
        await ApiRequest.delete(baseUrl()+data.id);
        loadData();
      } catch {
        message.error("Não foi possível remover o item desejado");
      }
    }

    const loadData = async() => {
      try {
        const data = await ApiRequest.get(baseUrl());
        setDataSource(data);
      } catch {
        message.error("Não foi possível recuperar os dados solicitados", 5);
      }
    }
      
    

    return (
        <HeaderContent subtitle={formData.title}>

            <Card title={formData.listTitle} icon={formData.icon}>
                <Table dataSource={dataSource} columns={columns} />
                <Divider />
                <div className="ta-c">
                  <Link to={`/${FixPath.fix(formData.path, params)}new`}><Button type="primary">Cadastrar {formData.singularName}</Button></Link>
                </div>
            </Card>

        </HeaderContent>
    );

}