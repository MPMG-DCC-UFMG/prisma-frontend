import React from 'react';
import { List, Tag } from 'antd';
import Icon from '../../atoms/Icon';

export default function ListItem (props) {

    return (<List.Item
        actions={[
            <a href="list-loadmore-edit"><Icon icon="edit" /></a>, 
            <a href="list-loadmore-more"><Icon icon="chevron-right" /></a>
        ]}
        >
            <List.Item.Meta
                title={<a href='#'>Teste de título</a>}
                description={<Tag color="green">Completo</Tag>}
                />
        </List.Item>
    );
}