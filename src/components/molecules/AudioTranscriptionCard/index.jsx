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

export default function AudioTranscriptionCard (props) {

  const { currentCase } = props;
  const baseUrl = `/case/${currentCase.id}/audio-transcription/`;

  const linkTo = (item) => baseUrl+item.id+"/view";

  const menu = (
      <Menu>
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Menu.Item key="0">
            <Link to={ baseUrl+'addFiles' }>
              Adicionar novo(s) arquivo(s)
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
    console.log(new UrlBuilder().withCaseId(currentCase.id).get());
    const response = await ApiRequest.get( new UrlBuilder().withCaseId(currentCase.id).withAudioTranscriptionId('').get() )
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
    } else if(data && data.length==0) {
      return <Empty description="Nenhum arquivo de áudio cadastrado">
        <UserRole roles={['root']} userId={currentCase.user_id}>
          <Link to={`${baseUrl}new`}>
            <Button type="primary">Inserir novo Áudio</Button>
          </Link>
        </UserRole>
      </Empty>
    } else {
      return <List
          footer={<div className="ta-c"><Link to={baseUrl}><Button type="ghost" block>Ver todos os itens</Button></Link></div>}
          dataSource={data}
          renderItem={item => <ListItem name={item.name} link={linkTo(item)} />}
      />
    }

  }

  return (
      <div className="card">
          <CardTitle icon="file-audio" title="Transcrição de Áudio" menu={menu} />
          <CardContent>
              { renderContent() }
          </CardContent>
      </div>
  );
}