import React from 'react';
import Icon from '../Icon';
import { Dropdown } from 'antd';

export function CardTitle (props) {

    return (
        <div className="card-title">

            { props.menu ? <div className="fl-r">
                <Dropdown overlay={props.menu}>
                    <a onClick={e => e.preventDefault()}>
                        <Icon icon="ellipsis-v" />
                    </a>
                </Dropdown>
            </div> : null }

            <Icon icon={props.icon} />
            {props.title}
        </div>
    );
}

export function CardContent (props) {
    return (
        <div className="card-content">
            {props.children}
        </div>
    );
}
