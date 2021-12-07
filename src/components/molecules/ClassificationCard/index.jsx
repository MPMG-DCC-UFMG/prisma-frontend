import React, { useEffect, useState } from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { Button, Empty, List, Menu, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import UserRole from '../../atoms/UserRole';
import ListItem from '../ListItem';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import ClassificationStats from '../ClassificationStats';

export default function ClassificationCard(props) {

  const { currentCase } = props;
  const baseUrl = `/case/${currentCase.id}/classification`;

  const linkTo = (item) => baseUrl + "/" + item.id + "/view";

  const menu = (
    <Menu>
      <UserRole roles={['root']} userId={currentCase.user_id}>
        <Menu.Item key="4">
          <Link to={`${baseUrl}-label`}>
            Rótulos
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`${baseUrl}/addFiles`}>
            Adicionar Documentos
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={baseUrl + '/export'}>
            Exportar
          </Link>
        </Menu.Item>
      </UserRole>
      <Menu.Item key="1">
        <Link to={baseUrl}>
          Ver todos
        </Link>
      </Menu.Item>
    </Menu>
  )

  const [data, setData] = useState();
  const params = useParams();

  const loadData = async () => {
    const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_LIST, params).get()
    setData(response);
  }

  useEffect(() => {
    loadData();
  }, [])

  const additional = (item) => {
    if (item.type === "classification_relationship") {
      return <ClassificationStats {...item} />;
    }

    return null;
  }

  const renderContent = () => {

    if (!data) {
      return <div className="ta-c">
        <Spin size="large" />
      </div>
    } else if (data && data.length === 0) {
      return <Empty description="Nenhum texto para classificação cadastrado">
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Link to={`${baseUrl}/addFiles`}>
            <Button type="primary">Adicionar Documentos</Button>
          </Link>
        </UserRole>
      </Empty>
    } else {
      return <List
        footer={<div className="ta-c"><Link to={baseUrl}><Button type="ghost" block>Ver todos os itens</Button></Link></div>}
        dataSource={data}
        renderItem={item => <ListItem name={item.title} link={linkTo(item)} additional={additional(item)} />}
      />
    }

  }

  return (
    <div className="card">
      <CardTitle icon="file-alt" title="Classificação" menu={menu} />
      <CardContent>
        {renderContent()}
      </CardContent>
    </div>
  );
}