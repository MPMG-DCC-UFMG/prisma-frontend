import { Button, Divider, List, Slider, Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import Utils from '../../../utils/utils';
import { fetchAudioTranscription } from '../../../reducers/audioTranscription';
import Icon from '../../atoms/Icon';

export default function AudioTranscriptionSegmentForm (props) {

    const {audio} = props;
    const baseData = { value: [0, audio.total_time] };
    const [data, setData] = useState([baseData]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const params = useParams();

    const onChangeSlider = (index, value) => {
        let newData = JSON.parse(JSON.stringify(data));
        newData[index].value = value;
        setData(newData);
    }

    const addSegment = () => {
        let newSlider = {...baseData};
        newSlider.value[0] = data[data.length-1].value[1];
        setData( [...data, ...[newSlider]] );
    }

    const removeSegment = (i) => {
        if(data.length>1) {
            let newData = [...data];
            newData.splice(i, 1);
            setData(newData);
        }
    }

    const save = async () => {
        setLoading(true);
        const segments = data.map( item => item.value );
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT, params)
                .post(null, {segments, total_time: audio.total_time})
        setLoading(false);
        dispatch(fetchAudioTranscription(params));
    }

    return (<>
        <Divider orientation="left">Segmentar áudio</Divider>
        <List 
            itemLayout = "horizontal"
            dataSource = {data}
            renderItem = { (item, index) => (<List.Item style={{ width: '100%', display: 'block'}}>
                <div className="row">
                    <div className="col-xs-1">{ Utils.secondsToMinutes(item.value[0]) }</div>
                    <div className="col-xs">
                        <Slider 
                            onChange={(value) => onChangeSlider(index, value) }
                            range defaultValue={item.value} 
                            max={audio.total_time} 
                            />
                    </div>
                    <div className="col-xs-1 ta-r">{ Utils.secondsToMinutes(item.value[1]) }</div>
                    <div className="col-xs-1 ta-c"><a className="color-danger" onClick={() => removeSegment(index)}><Icon icon="trash" /></a></div>
                </div>
            </List.Item>)}
            footer = {<>
                <Button disabled={loading} className="mr-4" onClick={save} type="primary">{ loading ? <Spin /> : "Enviar" }</Button>
                <Button className="mr-4" onClick={addSegment} type="dashed">Mais segmentos</Button>
                <Button onClick={() => props.showSegmentForm(false) } type="link">Cancelar</Button>
            </>}
        />
    </>);

}