import React from 'react';
import { Comment, Avatar, Popconfirm } from 'antd';
import UserAvatar from '../../atoms/Avatar';
import UserRole from '../../atoms/UserRole';
import Icon from '../../atoms/Icon';
import { useDispatch } from 'react-redux';
import { fetchParaphrase } from '../../../reducers/paraphrase';
import { useParams } from 'react-router';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function ParaphraseRevision(props) {

    const { data } = props;

    const params = useParams();
    const dispatch = useDispatch();

    const newParams = {
        projectId: params.projectId,
        paraphraseId: params.id,
    }

    const deleteItem = async () => {
        await ApiRequest.setUrl(BaseUrls.PARAPHRASE_REVISION_DELETE, newParams, data.id).delete();
        dispatch(fetchParaphrase(params));
    }

    const approveItem = async (approved) => {
        await ApiRequest.setUrl(BaseUrls.PARAPHRASE_REVISION_EDIT, newParams, data.id).put(null, { approved });
        dispatch(fetchParaphrase(params));
    }

    const removeButton = () => {

        return (
            <UserRole roles={['admin', 'root']} userId={data.user_id}>
                <Popconfirm
                    title={`Você deseja realmente remover este item?`}
                    onConfirm={(e) => deleteItem()}
                    okText="Sim"
                    cancelText="Não"
                >
                    <span><Icon icon='trash' /> remover</span>
                </Popconfirm>
            </UserRole>
        )
    }

    const editButton = () => {
        return (
            <UserRole roles={['admin', 'root']} userId={data.user_id}>
                <span onClick={() => props.onEdit(data)}>
                    <Icon icon='edit' /> editar
                </span>
            </UserRole>
        )
    }

    const approveButton = () => {
        if (!data.approved) {
            return (
                <UserRole roles={['curator', 'admin', 'root']}>
                    <span onClick={() => approveItem(true)}>
                        <Icon icon='thumbs-up' /> aprovar
                    </span>
                </UserRole>
            )
        } else {
            return (
                <UserRole roles={['curator', 'admin', 'root']}>
                    <span onClick={() => approveItem(false)}>
                        <Icon icon='ban' /> remover aprovação
                    </span>
                </UserRole>
            )
        }
    }

    return (
        <Comment
            className={data.approved ? "approved" : ""}
            avatar={<UserAvatar user={data.user} />}
            author={data.user.name}
            content={data.revision}
            datetime={new Date(data.createdAt).toLocaleString('pt-BR')}
            actions={[approveButton(), removeButton(), editButton()]}
        />
    );
}