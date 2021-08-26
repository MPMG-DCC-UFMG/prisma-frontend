import React, { useEffect, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels } from '../../../reducers/classification';
import { Divider, Pagination, Select } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { CardContent, CardTitle } from '../../../components/atoms/Card';

export default function ClassificationViewNormal(props) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(state => state.classification.data);
    const labels = useSelector(state => state.classification.labels);
    const currentUser = useSelector(state => state.user.data);

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
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    <div className="card">
                        <CardTitle title={data?.title} />
                        <CardContent>
                            <p>{segment()?.text}</p>
                        </CardContent>
                    </div>
                </div>
                <div className="col-md">
                    <Divider>Rótulo</Divider>
                    <Select onChange={changeLabel} style={{ width: "100%" }} value={currentLabel()}>
                        <Select.Option value={''} >- Selecione um rótulo -</Select.Option>
                        {labels?.map(label => <Select.Option key={label.id} value={label.id} >{label.label}</Select.Option>)}
                    </Select>
                    <Divider />
                    <div className="ta-c">
                        <p>
                            Este segmento já foi rotulado por {segment()?.labels.length} pessoa(s)
                        </p>
                        <p>
                            {`${countLabels()} de ${data?.segments.length} segmentos rotulados nesta sessão`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 ta-c">
                    <Divider />
                    <Pagination current={currentSegment + 1} defaultPageSize={1} total={data?.segments.length} onChange={(page) => setCurrentSegment(page - 1)} />
                </div>
            </div>
        </CaseHeaderContent>
    );

}