import React, { useEffect, useState } from 'react';
import Icon from '../../../components/atoms/Icon';
import { Button, Divider, Collapse, Spin, Card } from 'antd';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { Link, useHistory, useParams } from 'react-router-dom';
import AudioTranscriptionSegment from '../../../components/organisms/AudioTranscriptionSegment';
import AudioTranscriptionSegmentForm from '../../../components/organisms/AudioTranscriptionSegmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudioTranscription } from '../../../reducers/audioTranscription';
import Utils from '../../../utils/utils';
import UserRole from '../../../components/atoms/UserRole';
import AudioTranscriptionModal from '../../../components/organisms/AudioTranscriptionModal';
import { useRef } from 'react';
import { ApiRequest } from '../../../services/apiRequestService';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';
import BaseUrls from '../../../utils/baseUrls';
import { FixPath } from '../../../services/fixPath';
import AudioPlayer from '../../../components/atoms/AudioPlayer';

export default function ImageTranscription(props) {

    const [showSegmentForm, setShowSegmentForm] = useState(false);
    const [audios, setAudios] = useState();
    const dispatch = useDispatch();
    const data = useSelector(state => state.audioTranscription.data);
    const currentCase = useSelector(state => state.case.currentCase);
    const history = useHistory();

    const params = useParams();
    const mergeModalRef = useRef();

    const loadData = () => {
        dispatch(fetchAudioTranscription(params));
    }

    const loadAudios = async () => {
        const response = await ApiRequest.get(new UrlBuilder().withCaseId(currentCase.id).withAudioTranscriptionId('').get())
        setAudios(response);
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
        console.log(ev.keyCode);
        if(isTextArea()) return;
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
            case 80: // P
                if (nextAudio()) {
                    history.push(nextAudio());
                    return;
                }
                break;
            case 65: // A
                if (prevAudio()) {
                    history.push(prevAudio());
                    return;
                }
                break;
            case 76: // L
                playPauseAudio();
                break;
                case 75: // K
                changeAudioPlayer(1)
                break;
                case 74: // J
                changeAudioPlayer(-1)
                break;
            default:
                return;
        }
        for (const audio of document.getElementsByTagName('audio')) {
            audio.playbackRate = vel;
        }
    }

    let currentAudio = 0;
    const getCurrentAudio = () => {
        let i = 0;
        for (const audio of document.getElementsByTagName('audio')) {
            if (!audio.paused) {
                return i;
            }
            i++;
        }
        return currentAudio;
    }

    const changeAudioPlayer = (dir) => {
        currentAudio = getCurrentAudio();
        stopAllAudio();
        currentAudio += dir;
        
        if(currentAudio<0) currentAudio = qtdAudio()-1;
        if(currentAudio>=qtdAudio()) currentAudio = 0;
        
        const audio = document.getElementsByTagName('audio')[currentAudio];
        audio.play();
        audio.focus();
    }

    const playPauseAudio = () => {
        currentAudio = getCurrentAudio();
        const audio = document.getElementsByTagName('audio')[currentAudio];

        if (audio.paused)
            document.getElementsByTagName('audio')[currentAudio].play();
        else
            document.getElementsByTagName('audio')[currentAudio].pause();
    }

    const qtdAudio = () => document.getElementsByTagName('audio').length;

    const stopAllAudio = () => {
        for (const audio of document.getElementsByTagName('audio')) {
            audio.pause();
        }
    }

    const isTextArea = () => {
        return document.activeElement.type==="textarea";
    }


    useEffect(() => {
        if (currentCase) {
            loadAudios();
            loadData();
        }
        document.addEventListener("keyup", changeAudioSpeed);

        return () => {
            document.removeEventListener("keyup", changeAudioSpeed);
        }
    }, [currentCase, params]);

    useEffect(() => {
        setShowSegmentForm(false);
    }, [data])

    const mergeSegments = () => mergeModalRef.current.showModal();

    const nextAudio = () => {
        if (!audios || !data) return;
        return audios.length > (findLinksIndex() + 1) ? fixAudioLink(audios[findLinksIndex() + 1]) : null;
    }

    const prevAudio = () => {
        if (!audios || !data) return;
        return findLinksIndex() > 0 ? fixAudioLink(audios[findLinksIndex() - 1]) : null;
    }

    const fixAudioLink = (audio) => {
        if (!audios || !data) return;
        return FixPath.fix(BaseUrls.AUDIO_PAGE_VIEW, { caseId: audio.project_id, audioId: audio.id });
    }

    const findLinksIndex = () => audios.findIndex(audio => audio.id === params.id);

    return (
        <CaseHeaderContent>
            {data ? (<>
                <div className="row middle-xs">
                    <div className="col-xs-8">
                        <h2>{data.name}</h2>
                    </div>
                    <div className="col-xs ta-r">
                        {prevAudio() ? <Link to={prevAudio()}><Button><u>A</u>nterior</Button></Link> : null}
                        {nextAudio() ? <Link to={nextAudio()}><Button className="ml-2"><u>P</u>róximo</Button></Link> : null}
                    </div>
                </div>

                {showSegmentForm ? (<>
                    <AudioPlayer file={data.file} />
                    <AudioTranscriptionSegmentForm audio={data} showSegmentForm={setShowSegmentForm} />
                </>) : (<>

                    {getFullAudio() ? (<>
                        <Card className="mt-1 mb-2" title={<div className="row">
                            <div className="col-xs-6">
                                Áudio completo
                            </div>
                            <div className="col-xs-6 ta-r">
                                <UserRole roles={['curator', 'admin', 'root']} userId={currentCase?.user_id} >
                                    <Button className="mr-1" type="primary" onClick={() => setShowSegmentForm(true)}>
                                        <Icon icon="cut mr-1" /> Segmentar
                                    </Button>

                                    <Button className="mr-1" type="primary" onClick={() => mergeSegments()}>
                                        <Icon icon="object-group mr-1" /> Concatenar
                                    </Button>

                                    <AudioTranscriptionModal ref={mergeModalRef} />

                                </UserRole>
                            </div>
                        </div>}>
                            <AudioTranscriptionSegment segment={getFullAudio()} />
                        </Card>
                    </>) : null}

                    {getSegments().length > 0 ? (<>
                        <Divider orientation="left">Segmentos</Divider>

                        <Collapse>
                            {getSegments().map((data, i) => (
                                <Collapse.Panel
                                    key={data.id} header={`Segmento ${i + 1} - [${Utils.secondsToMinutes(data.start_time)}-${Utils.secondsToMinutes(data.end_time)}]`}
                                >
                                    <AudioTranscriptionSegment segment={data} />
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </>) : null}

                    {getMerges().length > 0 ? (<>
                        <Divider orientation="left">Concatenados</Divider>

                        <Collapse>
                            {getMerges().map((data, i) => (
                                <Collapse.Panel
                                    key={data.id} header={`Áudio ${i + 1} - [${getMergeTimes(data.merge_data)}]`}
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