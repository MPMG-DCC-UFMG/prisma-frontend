import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

export default function ListItem(props) {

    const { link, name } = props;
    return (<List.Item extra={props.extra}>
        <List.Item.Meta
            title={<Link to={link}><span className="truncate">{name}</span></Link>}
        />
        { props.additional }
    </List.Item>
    );
}