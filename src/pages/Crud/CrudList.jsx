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
import { CrudListButton } from '../../components/atoms/CrudListButton';
import UserRole from '../../components/atoms/UserRole';
import { useSelector } from 'react-redux';

export default function CrudList (props) {

    const { formData } = props;
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const params = useParams();
    const currentCase = useSelector(state => state.case.currentCase);

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
        buttons.push(<CrudListButton {...button} record={record} onReload={loadData} />)
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
            <div className="ta-c">
              { additionalButtons(record) }
              
              <UserRole roles={formData.roles} userId={currentCase?.user_id} >
                <Link to={`/${FixPath.fix(formData.path, params)}${record.id}`} className="mr-2"><Icon icon="edit" /></Link>
                <Popconfirm
                  title={`Você deseja realmente remover este item?`}
                  onConfirm={(e) => deleteItem(record)}
                  okText="Sim"
                  cancelText="Não"
                  >
                  <a href="#" className="color-danger"><Icon icon="trash" /></a>
                </Popconfirm>
              </UserRole>
            </div>
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
                <UserRole roles={formData.roles} userId={currentCase?.user_id} >
                  <Divider />
                  <div className="ta-c">
                    <Link to={`/${FixPath.fix(formData.path, params)}new`}>
                      <Button type="primary">
                        { formData.registerLabel ?
                            formData.registerLabel :
                            `Cadastrar ${formData.singularName}`
                        }
                      </Button>
                    </Link>
                  </div>
                </UserRole>
            </Card>

        </HeaderContent>
    );

}