import React from 'react';
import { List, Tag } from 'antd';
import Icon from '../../atoms/Icon';
import { Link } from 'react-router-dom';

export default function ListItem (props) {

    const {link, name} = props;

    return (<List.Item extra={props.extra}>
            <List.Item.Meta
                title={<Link to={link}>{name}</Link>}
                />
        </List.Item>
    );
}