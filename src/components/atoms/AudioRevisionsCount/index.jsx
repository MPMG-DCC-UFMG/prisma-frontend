import { Tooltip } from 'antd';
import React from 'react';
import Icon from '../Icon';

export default function AudioRevisionsCount(props) {

    const getTitle = () => {
        if(props.data.revisions.length>1) {
            return props.data.revisions.length + " revisões";
        } else if(props.data.revisions.length===1) {
            return props.data.revisions.length + " revisão";
        } else {
            return "nenhuma revisão";
        }
    }

    return (
        <Tooltip title={getTitle()}>
            <span style={{ opacity: props.data.revisions.length>0 ? 1 : .2 }}>
                <Icon icon="file-signature" />
            </span>
        </Tooltip>
    )
}