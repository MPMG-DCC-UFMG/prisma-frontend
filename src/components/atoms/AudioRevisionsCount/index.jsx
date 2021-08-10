import { Tooltip } from 'antd';
import React from 'react';
import Icon from '../Icon';

export default function AudioRevisionsCount(props) {

    return (
        <Tooltip title={props.data.revisions.length+" revisões"}>
            <span style={{ opacity: props.data.revisions.length>0 ? 1 : .2 }}>
                <Icon icon="file-signature" />
            </span>
        </Tooltip>
    )
}