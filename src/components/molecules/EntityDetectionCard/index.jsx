import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import { Empty, List, Menu } from 'antd';
import ListItem from '../ListItem';
import { Link } from 'react-router-dom';

export default function EntityDetectionCard (props) {

    const menu = (
        <Menu>
          <Menu.Item key="2">
            <Link to="/entity-detection/import">
              Importar
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/entity-detection/entities">
              Entidades
            </Link>
          </Menu.Item>
        </Menu>
    )

    return (
        <div className="card">
            <CardTitle icon="tags" title="Detecção de Entidades" menu={menu} />
            <CardContent>
                <Empty description="Em desenvolvimento" image="https://cdn2.iconfinder.com/data/icons/random-set-1/404/Asset_81-256.png" ></Empty>
            </CardContent>
        </div>
    );
}