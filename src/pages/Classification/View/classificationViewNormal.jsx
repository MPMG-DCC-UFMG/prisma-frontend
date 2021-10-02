import React, { useEffect, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels } from '../../../reducers/classification';
import { Divider, Pagination, Select, Tooltip } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { CardContent, CardTitle } from '../../../components/atoms/Card';
import Icon from '../../../components/atoms/Icon';
import ClassificationLinesChart from '../../../components/atoms/ClassificationLinesChart';

export default function ClassificationViewNormal(props) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(state => state.classification.data);
    const labels = useSelector(state => state.classification.labels);
    const currentUser = useSelector(state => state.user.data);
    const currentCase = useSelector(state => state.case.currentCase);

    const params = useParams();

    

    const loadData = () => {
        dispatch(fetchClassification(params));
        setCurrentSegment(0);
    }

    useEffect(() => {
        if (!data || data.id !== params.id)
            loadData();

        dispatch(fetchClassificationLabels(params));
    }, [data, params.id]);


    const segment = () => {
        const querySegments = data?.query.segments[currentSegment];
        return data?.segments.find(s => s.ref_id === querySegments.id);
    }

    const prevSegment = () => {
        if (currentSegment > 0)
            setCurrentSegment(currentSegment - 1)
    }

    const nextSegment = () => {
        if (currentSegment < data?.segments.length - 1)
            setCurrentSegment(currentSegment + 1)
    }

    const handleKeys = (ev) => {
        console.log(ev.keyCode);
        switch (ev.keyCode) {
            case 74:
                prevSegment();
                break;
            case 75:
                nextSegment();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", handleKeys);
        return () => {
            document.removeEventListener("keyup", handleKeys);
        }
    }, [currentSegment]);

    const changeLabel = async (value) => {
        const data = {
            projectId: params.projectId,
            classificationId: params.id,
            segmentId: segment().id
        }
        await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_VIEW_LABEL, data).post(null, {
            classification_label_id: value,
            ref_id: segment().ref_id
        });
        dispatch(fetchClassification(params));
    }

    const currentLabel = () => {
        const id = data.query?.segments[currentSegment].labels?.find(label => label.user_id === currentUser?.id)?.classification_label_id;
        return id || '';
    }

    const countLabels = () => {
        return data?.segments.filter(s => s.labels?.filter(l => l.user_id === currentUser?.id).length > 0).length;
    }

    const countAllLabels = () => {
        return data?.segments.filter(s => s.labels.length > 0).length;
    }

    const alreadyLabeledByOthers = () => {
        return segment()?.labels?.filter(label => label.user_id !== currentUser?.id).length > 0;
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
                    {!(!currentCase?.classification_multiple_labels && alreadyLabeledByOthers()) ? <>
                        <Divider>Rótulo</Divider>
                        <Select onChange={changeLabel} style={{ width: "100%" }} value={currentLabel()}>
                            <Select.Option value={''} >- Selecione um rótulo -</Select.Option>
                            {labels?.map(label => <Select.Option key={label.id} value={label.id} >{label.label}</Select.Option>)}
                        </Select>
                        <Divider />
                        <div className="ta-c">
                            <p>
                                Este segmento já foi rotulado por {segment()?.labels?.length} pessoa(s)
                            </p>
                            <p>
                                <strong>{countLabels()}</strong> de <strong>{data?.segments.length}</strong> segmentos rotulados nesta sessão
                            </p>
                        </div>
                    </>
                        : <>
                        <Divider>Rótulo</Divider>
                        <div className="ta-c">
                            <p>
                                <strong>Este segmento já foi rotulado.</strong>
                            </p>
                            <p>
                                <strong>{countAllLabels()}</strong> de <strong>{data?.segments.length}</strong> segmentos rotulados nesta sessão
                            </p>
                        </div>
                        </>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 ta-c">
                    <Divider />

                    <Pagination
                        current={currentSegment + 1}
                        defaultPageSize={1}
                        total={data?.query.segments.length}
                        showTotal={(total) => <Tooltip title={<p>
                            Atalhos de teclado: <br />
                            K: Próximo segmento <br />
                            J: Segmento anterior <br />
                            TAB: Navegar entre selects <br />
                            ENTER: Abre o select para seleção e seleciona o rótulo <br />
                            Setas: Navegar entre as opções do select
                        </p>}>
                            <span><Icon icon="question-circle" /></span>
                        </Tooltip>}
                        onChange={(page) => setCurrentSegment(page - 1)}
                    />

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