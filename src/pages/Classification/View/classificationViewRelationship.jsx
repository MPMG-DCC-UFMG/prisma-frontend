import React, { useEffect, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels } from '../../../reducers/classification';
import { Divider, Pagination, Select, Tooltip } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { CardContent, CardTitle } from '../../../components/atoms/Card';
import ClassificationCorrespondingItem from '../../../components/organisms/ClassificationCorrespondingItem';
import Icon from '../../../components/atoms/Icon';

export default function ClassificationViewRelationship(props) {
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

        dispatch(fetchClassificationLabels(params));

    }, [data, params.id]);

    const segment = () => data?.segments[currentSegment];

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
            <div className="card">
                <CardTitle title={data?.title} />
                <CardContent>
                    <h3>{segment()?.text}</h3>
                    <Divider />
                    <p>{segment()?.description}</p>
                    <Divider orientation="left">Correspondentes</Divider>
                    {segment()?.correspondings.map(corresponding => <ClassificationCorrespondingItem data={corresponding} />)}
                </CardContent>
            </div>

            <div className="row">
                <div className="col-xs-12 ta-c">
                    <Divider />
                    <Pagination
                        current={currentSegment + 1}
                        defaultPageSize={1}
                        total={data?.segments.length}
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
        </CaseHeaderContent>
    );

}