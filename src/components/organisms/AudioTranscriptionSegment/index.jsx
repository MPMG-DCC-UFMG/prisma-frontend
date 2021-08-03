import { Button, Divider, Empty, Popconfirm } from 'antd';
import React from 'react';
import { useState } from 'react';
import AudioPlayer from '../../atoms/AudioPlayer';
import AudioTranscriptionRevisionForm from '../AudioTranscriptionRevisionForm';
import AudioTranscriptionRevision from '../AudioTranscriptionRevision';
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
    const [ formInitialValue, setFormInitialValue] = useState("");
    const [ editRevisionData, setEditRevisionData] = useState(false);
    const currentCase = useSelector(state => state.case.currentCase);
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
                    <AudioPlayer file={segment.file} />
                </div>
                <If condition={!segment.full_audio}>
                    <div className="col-xs ta-r">
                        <UserRole roles={['root']} userId={currentCase?.user_id} >
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

            <Divider orientation="left">Transcrições</Divider>
            
            { segment.revisions.length ? (
                <>
                { segment.revisions.map(revision => <AudioTranscriptionRevision onEdit={editRevision} onDuplicate={duplicateRevision} segmentId={segment.id} revision={revision} />) }

                <Button  onClick={addTranscription} type="primary">Adicionar Transcrição</Button>
                </>
            ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nenhuma transcrição cadastrada para este segmento. Cadastre sua transcrição abaixo:"></Empty> }

            

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