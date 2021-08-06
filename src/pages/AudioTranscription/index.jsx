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

export default function AudioTranscription(props) {

    const [showSegmentForm, setShowSegmentForm] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state.audioTranscription.data);
    const currentCase = useSelector(state => state.case.currentCase);

    const params = useParams();
    const mergeModalRef = useRef();

    const loadData = () => {
        dispatch(fetchAudioTranscription(params));
    }

    const getSegments = () => data ? data.segments.filter(s => !s.full_audio && !s.is_merge) : [];
    const getMerges = () => data ? data.segments.filter(s => !s.full_audio && s.is_merge) : [];
    const getFullAudio = () => data?.segments.find(s => s.full_audio);

    const getMergeTimes = (data) => {
        data = JSON.parse(data);
        return data.map(d => `${Utils.secondsToMinutes(d.start_time)}-${Utils.secondsToMinutes(d.end_time)}`).join("] [")
    }

    const changeAudioSpeed = (ev) => {
        let vel = 1;
        switch (ev.keyCode) {
            case 49: // 1
            case 97: // 1
                vel = .75;
                break;
            case 50: // 2
            case 98: // 2
                vel = 1;
                break;
            case 51: // 3
            case 99: // 3
                vel = 1.25;
                break;
            case 52: // 4
            case 100: // 4
                vel = 1.75;
                break;
            case 53: // 5
            case 101: // 5
                vel = 2;
                break;
            default:
                break;
        }
        for (const audio of document.getElementsByTagName('audio')) {
            audio.playbackRate = vel;
        }
    }

    useEffect(() => {
        loadData();
        document.addEventListener("keydown", changeAudioSpeed);

        return () => {
            document.removeEventListener("keydown", changeAudioSpeed);
        }
    }, []);

    useEffect(() => {
        setShowSegmentForm(false);
    }, [data])

    const mergeSegments = () => mergeModalRef.current.showModal();
    const exportSegments = () => { };


    return (
        <CaseHeaderContent>
            {data ? (<>
                <h2>{data.name}</h2>
                <p>
                    <AudioPlayer file={data.file} allowDownload={data.allow_download} />
                </p>

                {showSegmentForm ? (
                    <AudioTranscriptionSegmentForm audio={data} showSegmentForm={setShowSegmentForm} />
                ) : (<>

                    <UserRole roles={['admin', 'root']} userId={currentCase?.user_id} >
                        <Button className="mr-1" type="primary" onClick={() => setShowSegmentForm(true)}>
                            <Icon icon="cut mr-1" /> Segmentar
                        </Button>

                        <Button className="mr-1" type="primary" onClick={() => mergeSegments()}>
                            <Icon icon="object-group mr-1" /> Mesclar
                        </Button>

                        <AudioTranscriptionModal ref={mergeModalRef} />

                    </UserRole>

                    {getFullAudio() ? (<>
                        <Card className="mt-1 mb-2" title="Áudio completo">
                            <AudioTranscriptionSegment segment={getFullAudio()} />
                        </Card>
                    </>) : null}

                    {getSegments().length > 0 ? (<>
                        <Divider orientation="left">Segmentos</Divider>

                        <Collapse>
                            {getSegments().map((data, i) => (
                                <Collapse.Panel
                                    header={`Segmento ${i + 1} - [${Utils.secondsToMinutes(data.start_time)}-${Utils.secondsToMinutes(data.end_time)}]`}
                                >
                                    <AudioTranscriptionSegment segment={data} />
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </>) : null}

                    {getMerges().length > 0 ? (<>
                        <Divider orientation="left">Mesclados</Divider>

                        <Collapse>
                            {getMerges().map((data, i) => (
                                <Collapse.Panel
                                    header={`Merges ${i + 1} - [${getMergeTimes(data.merge_data)}]`}
                                >
                                    <AudioTranscriptionSegment segment={data} />
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </>) : null}
                </>)}
            </>) : <div className="ta-c"><Spin size="large" /></div>}

        </CaseHeaderContent>
    );

}