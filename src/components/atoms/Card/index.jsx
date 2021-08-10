import React from 'react';
import Icon from '../Icon';
import { Dropdown } from 'antd';
import { ColorService } from '../../../services/colorService';

export function CardTitle (props) {

    return (
        <div className="card-title" style={ { backgroundColor: ColorService.getColor(props.color) } }>

            { props.menu ? <div className="fl-r">
                <Dropdown overlay={props.menu}>
                    <a onClick={e => e.preventDefault()}>
                        <Icon icon="ellipsis-v" />
                    </a>
                </Dropdown>
            </div> : null }

            <div className="truncate" onClick={props.onClick}>
                <Icon icon={props.icon} />
                {props.title}
            </div>
        </div>
    );
}

export function CardContent (props) {
    return (
        <div className="card-content" onClick={props.onClick}>
            {props.children}
        </div>
    );
}
