import React from 'react';
import { Badge, List, Tag } from 'antd';

export default function EntityDetectionSentenceMenu(props) {

    const getClasses = () => {
        const classes = ['cur-p'];
        if (props.selected)
            classes.push('item-selected');

        return classes.join(' ');
    }

    const getActions = () => {
        const actions = [
            <Badge count={props.entitiesCount} style={{ backgroundColor: "var(--color-success)" }} />
        ];

        return actions;
    }

    return (<List.Item
        className={getClasses()}
        onClick={() => props.onChangeSentence(props.index)}
        actions={getActions()}
    >
        <List.Item.Meta
            description={<div className="truncate-2">{props.item.sentence}</div>}
        />
    </List.Item>
    );
}