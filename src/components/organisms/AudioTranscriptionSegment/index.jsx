import { Button, Divider, Popconfirm } from 'antd';
import React from 'react';
import { useState } from 'react';
import AudioPlayer from '../../atoms/AudioPlayer';
import AudioTranscriptionRevisionForm from '../AudioTranscriptionRevisionForm';
import AudioTranscriptionRevision from '../AudioTranscriptionRevision';
import AudioTranscriptionSegmentEdit from '../AudioTranscriptionSegmentEdit';
import { useEffect } from 'react';
import UserRole from '../../atoms/UserRole';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudioTranscription } from '../../../reducers/audioTranscription';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import If from '../../atoms/If';

export default function AudioTranscriptionSegment (props) {

    const { segment } = props;
    const [ showForm, setShowForm] = useState(false);
    const [ showEditForm, setShowEditForm] = useState(false);
    const [ formInitialValue, setFormInitialValue] = useState("");
    const [ editRevisionData, setEditRevisionData] = useState(false);
    const currentCase = useSelector(state => state.case.currentCase);
    const currentAudio = useSelector(state => state.audioTranscription.data);
    const dispatch = useDispatch();
    const params = useParams();

    const addTranscription = () => {
        cancelTranscription();
        setFormInitialValue('');
        setShowForm(true);
    }

    const cancelTranscription = () => {
        setShowForm(false);
        setFormInitialValue('');
        setEditRevisionData(false);
    }

    const editRevision = (data) => {
        cancelTranscription();
        setEditRevisionData(data);
    }

    const duplicateRevision = (data) => {
        cancelTranscription();
        setFormInitialValue(data.revision);
        setShowForm(true);
    }

    const deleteSegment = async () => {
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT+"/"+segment.id, params).delete(null);
        dispatch(fetchAudioTranscription(params));
    }

    useEffect(() => {
        cancelTranscription();
    }, [segment])

    return (
        <>
            <div className="row middle-xs">
                <div className="col-xs">
                    <AudioPlayer file={segment.file} showLegend={true} />
                </div>
                <If condition={!segment.full_audio}>
                    <div className="col-xs ta-r">
                        <UserRole roles={['root']} userId={currentCase?.user_id} >
                            <Button onClick={() => setShowEditForm(!showEditForm) } type="dashed" className="mr-2">Editar segmento</Button>
                            <Popconfirm
                                title={`Você deseja realmente remover este segmento?`}
                                onConfirm={(e) => deleteSegment()}
                                okText="Sim"
                                cancelText="Não"
                                >
                                <Button type="dashed" danger >Deletar segmento</Button>
                            </Popconfirm>
                        </UserRole>
                    </div>
                </If>
            </div>

            <If condition={showEditForm}>
                <AudioTranscriptionSegmentEdit onCancel={setShowEditForm} segment={segment} defaultValue={[segment.start_time, segment.end_time]} total_time={currentAudio.total_time} />
            </If>

            <Divider orientation="left">Transcrições</Divider>
            
            { segment.revisions.length ? (
                <>
                { segment.revisions.map(revision => <AudioTranscriptionRevision onEdit={editRevision} onDuplicate={duplicateRevision} segmentId={segment.id} revision={revision} />) }

                <Button  onClick={addTranscription} type="primary">Adicionar Transcrição</Button>
                </>
            ) : "Nenhuma transcrição cadastrada para este segmento. Cadastre sua transcrição abaixo:" }

            

            { showForm || segment.revisions.length===0 ? <>
                <Divider />
                    <AudioTranscriptionRevisionForm 
                        initialValue={formInitialValue}
                        segment={segment} 
                        onCancel={ segment.revisions.length>0 ? cancelTranscription : null } 
                    />
            </> : null }

            { editRevisionData ? <><Divider /><AudioTranscriptionRevisionForm segment={segment} edit={editRevisionData} onCancel={cancelTranscription} /></> : null }


        </>
    );

}