import React, { useEffect, useRef, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels, fetchClassificationQuery, fetchClassificationScores } from '../../../reducers/classification';
import { Button, Divider, Select } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { CardContent, CardTitle } from '../../../components/atoms/Card';
import ClassificationLinesChart from '../../../components/atoms/ClassificationLinesChart';

export default function ClassificationViewNormal(props) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [currentLabel, setCurrentLabel] = useState("");
    const [teaching, setTeaching] = useState(false);
    const dispatch = useDispatch();
    const { data, query } = useSelector(state => state.classification);
    const labels = useSelector(state => state.classification.labels);
    const params = useParams();

    const loadData = () => {
        dispatch(fetchClassification(params));
    }
    const loadQuery = () => {
        dispatch(fetchClassificationQuery(params));
        setCurrentSegment(0);
    }


    useEffect(() => {
        if (!data || data.id !== params.id) {
            loadData();
        }
        loadQuery();

        dispatch(fetchClassificationLabels(params));
    }, [data, params.id]);


    const segment = () => {
        console.log(query?.segments[currentSegment]);
        return query?.segments[currentSegment];
    }

    const nextSegment = () => {
        setCurrentLabel('');
        if (currentSegment < query?.segments.length - 1)
            setCurrentSegment(currentSegment + 1)
        else
            loadQuery();
    }

    const changeLabel = async (value) => {
        setCurrentLabel(value);
    }

    const teach = async (event) => {
        event.preventDefault();
        const data = {
            projectId: params.projectId,
            classificationId: params.id,
            refId: segment().id
        }

        setTeaching(true);
        await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_TEACH, data).post(null, {
            classification_label_id: currentLabel,
        });
        dispatch(fetchClassificationScores(params));
        setTeaching(false);

        nextSegment();
    }

    return (
        <CaseHeaderContent>
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    <div className="card">
                        <CardTitle title={data?.title} />
                        <CardContent>
                            <p>{segment()?.materia}</p>
                        </CardContent>
                    </div>
                </div>
                <div className="col-md">

                    <form onSubmit={teach}>
                        <Divider>Rótulo</Divider>
                        <Select onChange={changeLabel} style={{ width: "100%" }} value={currentLabel}>
                            <Select.Option value={''} >- Selecione um rótulo -</Select.Option>
                            {labels?.map(label => <Select.Option key={label.id} value={label.id} >{label.label}</Select.Option>)}
                        </Select>
                        <div className="row mt-1">
                            <div className="col-xs">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    loading={teaching}
                                    disabled={!currentLabel}
                                >Salvar e continuar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row center-xs mt-3">
                <div className="col-xs-12 col-md-6">
                    <ClassificationLinesChart />
                </div>
            </div>
        </CaseHeaderContent>
    );

}