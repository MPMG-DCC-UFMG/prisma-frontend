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
    const [ editRevisionData, setEditRevisionData] = useState(false);

    const addTranscription = () => {
        cancelTranscription();
        setShowForm(true);
    }

    const cancelTranscription = () => {
        setShowForm(false);
        setEditRevisionData(false);
    }

    const editRevision = (data) => {
        cancelTranscription();
        setEditRevisionData(data);
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
                { segment.revisions.map(revision => <AudioTranscriptionRevision onEdit={editRevision} segmentId={segment.id} revision={revision} />) }

                <Button  onClick={addTranscription} type="primary">Adicionar Transcrição</Button>
                </>
            ) : <Empty description="Nenhuma transcrição cadastrada para este segmento. Cadastre sua transcrição abaixo:"></Empty> }

            

            { showForm || segment.revisions.length===0 ? <><Divider /><AudioTranscriptionRevisionForm segment={segment} onCancel={cancelTranscription} /></> : null }

            { editRevisionData ? <><Divider /><AudioTranscriptionRevisionForm segment={segment} edit={editRevisionData} onCancel={cancelTranscription} /></> : null }


        </>
    );

}