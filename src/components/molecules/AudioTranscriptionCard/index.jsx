import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { List, Menu } from 'antd';
import ListItem from '../ListItem';
import { Link } from 'react-router-dom';

export default function AudioTranscriptionCard (props) {

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Configurações
            </a>
          </Menu.Item>
          <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Cadastrar
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Importar
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Ver todos
            </a>
          </Menu.Item>
        </Menu>
    )

    return (
        <div className="card">
            <CardTitle icon="file-audio" title="Transcrição de Áudio" menu={menu} />
            <CardContent>
                <List
                    footer={<div class="ta-c"><Link to="/audio-transcription/id">Ver todos os itens</Link></div>}
                    dataSource={['','','']}
                    renderItem={item => <ListItem />}
                />
            </CardContent>
        </div>
    );
}