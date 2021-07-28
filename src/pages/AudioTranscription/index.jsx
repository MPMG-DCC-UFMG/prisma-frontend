import React, { useEffect, useState } from 'react';
import Icon from '../../components/atoms/Icon';
import { Button, Divider, Collapse, Spin } from 'antd';
import CaseHeaderContent from '../../templates/CaseHeaderContent';
import { useParams } from 'react-router-dom';
import AudioTranscriptionSegment from '../../components/organisms/AudioTranscriptionSegment';
import AudioPlayer from '../../components/atoms/AudioPlayer';
import AudioTranscriptionSegmentForm from '../../components/organisms/AudioTranscriptionSegmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudioTranscription } from '../../reducers/audioTranscription';
import Utils from '../../utils/utils';

export default function AudioTranscription (props) {

    const [showSegmentForm, setShowSegmentForm] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state.audioTranscription.data);

    const params = useParams();

    useEffect(() => {
        dispatch(fetchAudioTranscription(params));
    }, [])

    useEffect(() => {
        setShowSegmentForm(false);
    }, [data])

    return (
        <CaseHeaderContent>
            { data ? (<>
                <h2>{ data.name }</h2>
                <p>
                    <AudioPlayer file={data.file} />
                </p>

                { showSegmentForm ? (
                    <AudioTranscriptionSegmentForm audio={data} showSegmentForm={setShowSegmentForm} />
                ) : (<>
                    <Button type="primary" onClick={() => setShowSegmentForm(true) }>
                        <Icon icon="cut mr-1" /> Segmentar
                    </Button>


                    <Divider orientation="left">Segmentos</Divider>

                    <Collapse>
                        { data.segments.map((data, i) => (
                            <Collapse.Panel header={`Segmento ${i+1} - [${Utils.secondsToMinutes(data.start_time)}-${Utils.secondsToMinutes(data.end_time)}]`}>
                                <AudioTranscriptionSegment segment={data} />
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </>)}
            </>) : <div className="ta-c"><Spin size="large" /></div> }

        </CaseHeaderContent>
    );

}