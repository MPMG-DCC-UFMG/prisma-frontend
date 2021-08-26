import { Divider, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification } from '../../../reducers/classification';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function ClassificationCorrespondingItem(props) {

    const { data } = props;
    const labels = useSelector(state => state.classification.labels);
    const currentUser = useSelector(state => state.user.data);
    const params = useParams();
    const dispatch = useDispatch();

    const changeLabel = async (value) => {
        const labelData = {
            projectId: params.projectId,
            classificationId: params.id,
            correspondingId: data.id
        }
        await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_CORRESPONDING_LABEL, labelData).post(null, {
            classification_label_id: value
        });
        dispatch(fetchClassification(params));
    }

    const currentLabel = () => {
        const id = data.labels?.find(label => label.user_id === currentUser?.id)?.classification_label_id;
        return id || '';
    }

    return (<div className="row">
        <div className="col-md-9">{data.text}</div>
        <div className="col-md">
            <Select onChange={changeLabel} style={{ width: "100%" }} value={currentLabel()}>
                <Select.Option value={''} >- Selecione um rótulo -</Select.Option>
                {labels?.map(label => <Select.Option key={label.id} value={label.id} >{label.label}</Select.Option>)}
            </Select>
        </div>
        <div className="col-md-12">
            <Divider />
        </div>
    </div>);

}