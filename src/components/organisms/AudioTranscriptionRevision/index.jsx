import { Comment, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ApiRequest } from "../../../services/apiRequestService";
import BaseUrls from "../../../utils/baseUrls";
import UserAvatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";
import { fetchAudioTranscription } from "../../../reducers/audioTranscription";
import UserRole from "../../atoms/UserRole";

export default function AudioTranscriptionRevision (props) {

    const {revision, segmentId} = props;

    const params = useParams();
    const data = {
        projectId: params.projectId,
        audioTranscriptionId: params.id,
        segmentId
    }
    const dispatch = useDispatch();

    const deleteItem = async (record) => {
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT_REVISION_UPDATE, data, record.id).delete();
        dispatch(fetchAudioTranscription(params));
    }

    const approveItem = async (record, approved) => {
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT_REVISION_UPDATE, data, record.id).put(null, {approved});
        dispatch(fetchAudioTranscription(params));
    }

    const removeButton = (record) => {
        
        return (
        <UserRole roles={['admin', 'root']} userId={revision.user_id}>
            <Popconfirm
                title={`Você deseja realmente remover este item?`}
                onConfirm={(e) => deleteItem(record)}
                okText="Sim"
                cancelText="Não"
                >
                <span><Icon icon='trash' /> remover</span>
            </Popconfirm>
        </UserRole>
    )}

    const editButton = (record) => {
        return (
        <UserRole roles={['admin', 'root']} userId={revision.user_id}>
            <span onClick={() => props.onEdit(record)}>
                <Icon icon='edit' /> editar
            </span>
        </UserRole>
    )}

    const approveButton = (record) => {
        if(!record.approved) {
            return (
                <UserRole roles={['curator', 'admin', 'root']}>
                    <span onClick={() => approveItem(record, true)}>
                        <Icon icon='thumbs-up' /> aprovar transcrição
                    </span>
                </UserRole>
            )
        } else {
            return (
                <UserRole roles={['curator', 'admin', 'root']}>
                    <span onClick={() => approveItem(record, false)}>
                        <Icon icon='ban' /> remover aprovação
                    </span>
                </UserRole>
            )
        }
    }

    const duplicateButton = (record) => {
        return (
            <span onClick={() => props.onDuplicate(record)}>
                <Icon icon='copy' /> duplicar
            </span>
    )}

    return (
        <Comment 
            className={revision.approved ? "approved" : ""}
            avatar={<UserAvatar user={revision.user} />}
            author={revision.user.name}
            content={revision.revision}
            datetime={ new Date(revision.createdAt).toLocaleString('pt-BR')}
            actions={[approveButton(revision), removeButton(revision), editButton(revision), duplicateButton(revision)]}
        />
    );

}