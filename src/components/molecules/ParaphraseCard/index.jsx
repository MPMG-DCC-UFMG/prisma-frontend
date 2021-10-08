import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { Button, Empty, List, Menu, Spin } from 'antd';
import ListItem from '../ListItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ApiRequest } from '../../../services/apiRequestService';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';
import { useEffect } from 'react';
import UserRole from '../../atoms/UserRole';
import AudioRevisionsCount from '../../atoms/AudioRevisionsCount';
import BaseUrls from '../../../utils/baseUrls';
import { useParams } from 'react-router';

export default function ParaphraseCard (props) {

  const { currentCase } = props;
  const baseUrl = `/case/${currentCase.id}/paraphrase/`;

  const linkTo = (item) => baseUrl+item.id+"/view";
  const params = useParams();

  const menu = (
      <Menu>
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Menu.Item key="0">
            <Link to={ baseUrl+'addFiles' }>
              Adicionar novo(s) arquivo(s)
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={ baseUrl+'export' }>
              Exportar
            </Link>
          </Menu.Item>
        </UserRole>
        <Menu.Item key="1">
          <Link to={ baseUrl }>
            Ver todos
          </Link>
        </Menu.Item>
      </Menu>
  )

  const [ data, setData ] = useState();

  const loadData = async () => {
    const response = await ApiRequest.setUrl(BaseUrls.PARAPHRASE_LIST, params).get(null);
    setData(response);
  }

  useEffect(() => {
    loadData();
  }, [])

  const renderContent = () => {

    if(!data) {
      return <div className="ta-c">
        <Spin size="large" />
      </div>
    } else if(data && data.length===0) {
      return <Empty description="Nenhum texto cadastrado">
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Link to={`${baseUrl}addFiles`}>
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
          <CardTitle icon="quote-left" title="Paráfrase" menu={menu} />
          <CardContent>
              { renderContent() }
          </CardContent>
      </div>
  );
}