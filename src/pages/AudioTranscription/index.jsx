import React, { useEffect, useState } from 'react';
import Icon from '../../components/atoms/Icon';
import { Button, Divider, Collapse, Spin, Card } from 'antd';
import CaseHeaderContent from '../../templates/CaseHeaderContent';
import { useParams } from 'react-router-dom';
import AudioTranscriptionSegment from '../../components/organisms/AudioTranscriptionSegment';
import AudioPlayer from '../../components/atoms/AudioPlayer';
import AudioTranscriptionSegmentForm from '../../components/organisms/AudioTranscriptionSegmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudioTranscription } from '../../reducers/audioTranscription';
import Utils from '../../utils/utils';
import UserRole from '../../components/atoms/UserRole';
import AudioTranscriptionModal from '../../components/organisms/AudioTranscriptionModal';
import { useRef } from 'react';

export default function AudioTranscription (props) {

    const [showSegmentForm, setShowSegmentForm] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state.audioTranscription.data);
    const currentCase = useSelector(state => state.case.currentCase);

    const params = useParams();
    const mergeModalRef = useRef();

    const loadData = () => {
        dispatch(fetchAudioTranscription(params));
    }

    const getSegments = () => data ? data.segments.filter(s => !s.full_audio) : [];
    const getFullAudio = () => data?.segments.find(s => s.full_audio);

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        setShowSegmentForm(false);
    }, [data])

    const mergeSegments = () => mergeModalRef.current.showModal();
    const exportSegments = () => {};


    return (
        <CaseHeaderContent>
            { data ? (<>
                <h2>{ data.name }</h2>
                <p>
                    <AudioPlayer file={data.file} allowDownload={data.allow_download} />
                </p>

                { showSegmentForm ? (
                    <AudioTranscriptionSegmentForm audio={data} showSegmentForm={setShowSegmentForm} />
                ) : (<>

                    <UserRole roles={['admin', 'root']} userId={currentCase?.user_id} >
                        <Button className="mr-1" type="primary" onClick={() => setShowSegmentForm(true) }>
                            <Icon icon="cut mr-1" /> Segmentar
                        </Button>

                        <Button className="mr-1" type="primary" onClick={() => mergeSegments() }>
                            <Icon icon="object-group mr-1" /> Mesclar
                        </Button>

                        <Button className="mr-1" type="primary" onClick={() => exportSegments() }>
                            <Icon icon="file-export mr-1" /> Exportar
                        </Button>

                        <AudioTranscriptionModal ref={mergeModalRef} />

                    </UserRole>

                    { getFullAudio() ? (<>
                        <Card className="mt-1 mb-2" title="Áudio completo">
                            <AudioTranscriptionSegment segment={getFullAudio()} />
                        </Card>
                    </>) : null }

                    { getSegments().length>0 ? (<>
                        <Divider orientation="left">Segmentos</Divider>

                        <Collapse>
                            { getSegments().map((data, i) => (
                                <Collapse.Panel 
                                    header={`Segmento ${i+1} - [${Utils.secondsToMinutes(data.start_time)}-${Utils.secondsToMinutes(data.end_time)}]`}
                                >
                                    <AudioTranscriptionSegment segment={data} />
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </>) : null }
                </>)}
            </>) : <div className="ta-c"><Spin size="large" /></div> }

        </CaseHeaderContent>
    );

}