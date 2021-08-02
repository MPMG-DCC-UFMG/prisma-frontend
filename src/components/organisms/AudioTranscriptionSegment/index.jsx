import { Button, Divider, Empty } from 'antd';
import React from 'react';
import { useState } from 'react';
import AudioPlayer from '../../atoms/AudioPlayer';
import AudioTranscriptionRevisionForm from '../AudioTranscriptionRevisionForm';
import AudioTranscriptionRevision from '../AudioTranscriptionRevision';
import { useEffect } from 'react';

export default function AudioTranscriptionSegment (props) {

    const { segment } = props;
    const [ showForm, setShowForm] = useState(false);
    const [ formInitialValue, setFormInitialValue] = useState("");
    const [ editRevisionData, setEditRevisionData] = useState(false);

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

    useEffect(() => {
        cancelTranscription();
    }, [segment])

    return (
        <>
            <p>
                <AudioPlayer file={segment.file} />
            </p>

            <Divider orientation="left">Transcrições</Divider>
            
            { segment.revisions.length ? (
                <>
                { segment.revisions.map(revision => <AudioTranscriptionRevision onEdit={editRevision} onDuplicate={duplicateRevision} segmentId={segment.id} revision={revision} />) }

                <Button  onClick={addTranscription} type="primary">Adicionar Transcrição</Button>
                </>
            ) : <Empty description="Nenhuma transcrição cadastrada para este segmento. Cadastre sua transcrição abaixo:"></Empty> }

            

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