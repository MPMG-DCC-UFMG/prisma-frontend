import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { Empty, List, Menu } from 'antd';
import ListItem from '../ListItem';
import { Link } from 'react-router-dom';

export default function ParaphraseCard (props) {

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
            <CardTitle icon="quote-left" title="Paráfrase" menu={menu} />
            <CardContent>
              <Empty description="Em desenvolvimento" image="https://cdn2.iconfinder.com/data/icons/random-set-1/404/Asset_81-256.png" ></Empty>
            </CardContent>
        </div>
    );
}