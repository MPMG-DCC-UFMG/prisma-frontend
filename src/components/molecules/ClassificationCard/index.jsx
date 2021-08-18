import React, { useEffect, useState } from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { Button, Empty, List, Menu, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import UserRole from '../../atoms/UserRole';
import ListItem from '../ListItem';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function ClassificationCard(props) {

  const { currentCase } = props;
  const baseUrl = `/case/${currentCase.id}/classification`;

  const linkTo = (item) => baseUrl + item.id + "/view";

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <Link to={`${baseUrl}-label`}>
          Rótulos
        </Link>
      </Menu.Item>
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

  const renderContent = () => {

    if (!data) {
      return <div className="ta-c">
        <Spin size="large" />
      </div>
    } else if (data && data.length === 0) {
      return <Empty description="Nenhum texto para classificação cadastrado">
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Link to={`${baseUrl}`}>
            <Button type="primary">Inserir novo texto</Button>
          </Link>
        </UserRole>
      </Empty>
    } else {
      return <List
        footer={<div className="ta-c"><Link to={baseUrl}><Button type="ghost" block>Ver todos os itens</Button></Link></div>}
        dataSource={data}
        renderItem={item => <ListItem name={item.text} link={linkTo(item)} />}
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