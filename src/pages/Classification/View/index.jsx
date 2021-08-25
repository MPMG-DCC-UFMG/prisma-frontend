import React, { useEffect, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels } from '../../../reducers/classification';
import { Divider, Pagination, Select } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import json5 from 'json5';

export default function ClassificationView(props) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(state => state.classification.data);
    const labels = useSelector(state => state.classification.labels);
    const currentCase = useSelector(state => state.case.currentCase);
    const currentUser = useSelector(state => state.user.data);
    const history = useHistory();

    const params = useParams();

    const loadData = () => {
        dispatch(fetchClassification(params));
        setCurrentSegment(0);
    }

    useEffect(() => {
        if (!data || data.id !== params.id)
            loadData();

        if (!labels) {
            dispatch(fetchClassificationLabels(params));
        }
    }, [data, params.id]);

    const segment = () => data?.segments[currentSegment];

    const changeLabel = async (value) => {
        const data = {
            projectId: params.projectId,
            classificationId: params.id,
            segmentId: segment().id
        }
        await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_VIEW_LABEL, data).post(null, {
            classification_label_id: value
        });
        dispatch(fetchClassification(params));
    }

    const currentLabel = () => {
        const id = segment()?.labels?.find(label => label.user_id === currentUser?.id)?.classification_label_id;
        return id || '';
    }

    const countLabels = () => {
        return data?.segments.filter(s => s.labels.filter(l => l.user_id === currentUser?.id).length > 0).length;
    }

    return (
        <CaseHeaderContent>
            <h2>{data?.title}</h2>
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    <p>{segment()?.text}</p>
                </div>
                <div className="col-md-1">
                    <Divider type="vertical" />
                </div>
                <div className="col-md-2">
                    <Select onChange={changeLabel} style={{ width: "100%" }} value={currentLabel()}>
                        <Select.Option value={''} >- Selecione um rótulo -</Select.Option>
                        {labels?.map(label => <Select.Option key={label.id} value={label.id} >{label.label}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 ta-c">
                    <Divider />
                    <p>
                        {`${countLabels()} de ${data?.segments.length} rotulados nesta sessão`}
                    </p>
                    <Pagination current={currentSegment + 1} defaultPageSize={1} total={data?.segments.length} onChange={(page) => setCurrentSegment(page - 1)} />
                </div>
            </div>
        </CaseHeaderContent>
    );

}