import React from 'react';
import { List, Tag } from 'antd';
import Icon from '../../atoms/Icon';
import Item from 'antd/lib/list/Item';

export default function EntityDetectionSentenceMenu (props) {

    return (<List.Item
        actions={[
            <Icon icon="check-circle" color='success' />
        ]}
        >
            <List.Item.Meta
                description={props.item}
                />
        </List.Item>
    );
}