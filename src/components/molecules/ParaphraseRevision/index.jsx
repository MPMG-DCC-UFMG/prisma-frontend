import React from 'react';
import { Comment, Avatar } from 'antd';
import UserAvatar from '../../atoms/Avatar';

export default function ParaphraseRevision(props) {

    const { data } = props;

    return (
        <Comment 
            avatar={<UserAvatar user={data.user} />}
            author={data.user.name}
            content={data.revision}
            datetime={ new Date(data.createdAt).toLocaleString('pt-BR')}
            //actions={[approveButton(revision), removeButton(revision), editButton(revision), duplicateButton(revision)]}
        />
    );
}