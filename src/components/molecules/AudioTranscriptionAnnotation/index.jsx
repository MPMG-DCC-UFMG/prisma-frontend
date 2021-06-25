import React from 'react';
import { List } from 'antd';
import Icon from '../../atoms/Icon';

export default function AudioTranscriptionAnnotation (props) {

    return (<List.Item
        actions={[
            <a href="list-loadmore-edit"><Icon icon="edit" /></a>, 
            <a className="color-danger" href="list-loadmore-more"><Icon icon="trash" /></a>
        ]}
        >
            <List.Item.Meta
                description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est"
                />
        </List.Item>
    );
}