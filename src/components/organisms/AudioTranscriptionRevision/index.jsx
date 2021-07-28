import { Comment, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ApiRequest } from "../../../services/apiRequestService";
import BaseUrls from "../../../utils/baseUrls";
import UserAvatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";
import { fetchAudioTranscription } from "../../../reducers/audioTranscription";
import UserOrAdmin from "../../atoms/UserOrAdmin";

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

    const removeButton = (record) => {
        
        return (
        <UserOrAdmin userId={revision.user_id}>
            <Popconfirm
                title={`Você deseja realmente remover este item?`}
                onConfirm={(e) => deleteItem(record)}
                okText="Sim"
                cancelText="Não"
                >
                <span><Icon icon='trash' /> remover</span>
            </Popconfirm>
        </UserOrAdmin>
    )}

    const editButton = (record) => {
        return (
        <UserOrAdmin userId={revision.user_id}>
            <span onClick={() => props.onEdit(record)}>
                <Icon icon='edit' /> editar
            </span>
        </UserOrAdmin>
    )}

    return (
        <Comment 
            avatar={<UserAvatar user={revision.user} />}
            author={revision.user.name}
            content={revision.revision}
            datetime={ new Date(revision.createdAt).toLocaleString()}
            actions={[removeButton(revision), editButton(revision)]}
        />
    );

}