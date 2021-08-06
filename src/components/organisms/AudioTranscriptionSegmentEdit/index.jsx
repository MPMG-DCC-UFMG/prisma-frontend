import { Button, Divider, Slider, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import Utils from '../../../utils/utils';
import If from '../../atoms/If';
import { fetchAudioTranscription } from '../../../reducers/audioTranscription';

export default function AudioTranscriptionSegmentEdit (props) {

    const defaultValue = props.defaultValue;
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    const onChangeSlider = ( value) => {
        setData(value);
    }

    const save = async () => {
        setLoading(true);
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT+"/"+props.segment.id, params)
                .put(null, {start_time: data[0], end_time: data[1]})
        setLoading(false);
        dispatch(fetchAudioTranscription(params));
    }

    return (
        <>
            <Divider orientation="left">Editar Segmento</Divider>

            <If condition={data && defaultValue}>
                <div className="row">
                    <div className="col-xs-1">{ Utils.secondsToMinutes(data[0]) }</div>
                    <div className="col-xs">
                        <Slider 
                            onChange={(value) => onChangeSlider(value) }
                            range 
                            defaultValue={defaultValue} 
                            max={props.total_time} 
                            />
                    </div>
                    <div className="col-xs-1 ta-r">{ Utils.secondsToMinutes(data[1]) }</div>
                </div>

                <Button disabled={loading} className="mr-4" onClick={save} type="primary">{ loading ? <Spin /> : "Enviar" }</Button>
                <Button onClick={() => props.onCancel(false) } type="link">Cancelar</Button>
            </If>
        </>
    );

}