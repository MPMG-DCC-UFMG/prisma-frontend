import React, { useCallback, useEffect, useState } from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassification, fetchClassificationLabels } from '../../../reducers/classification';
import { Alert, Divider, Empty, Pagination, Select, Switch, Tooltip } from 'antd';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { CardContent, CardTitle } from '../../../components/atoms/Card';
import ClassificationCorrespondingItem from '../../../components/organisms/ClassificationCorrespondingItem';
import Icon from '../../../components/atoms/Icon';
import ClassificationStats, { calcProgress } from '../../../components/molecules/ClassificationStats';

export default function ClassificationViewRelationship(props) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [showFilled, setShowFilled] = useState(false);
    const [dataFilled, setDataFilled] = useState();
    const [dataBlank, setDataBlank] = useState();
    const [stats, setStats] = useState();
    const dispatch = useDispatch();
    const originalData = useSelector(state => state.classification.data);
    const currentUser = useSelector(state => state.user.data);

    const params = useParams();

    const loadData = () => {
        dispatch(fetchClassification(params));
        //setCurrentSegment(0);
    }

    useEffect(() => {
        dispatch(fetchClassificationLabels(params));
        getStats();

    }, [originalData, params.id]);

    const haveUserLabeledSegment = (seg) => seg.correspondings.every(corresponding => corresponding.labels.some(l => l.user_id === currentUser?.id));
    const isSegmentCompleted = (seg) => seg.correspondings.every(corresponding => corresponding.labels.length >= stats?.users_per_segment);

    useEffect(() => {
        if (originalData) {

            //Get all correspondents labeled by user
            let segments = [];
            originalData.segments.forEach(seg => {
                if (haveUserLabeledSegment(seg))
                    segments = segments.concat(seg);
            });

            setDataFilled({
                ...originalData,
                ...{ segments }
            })

            //Get all correspondents not labeled by user and incomplete
            segments = [];
            originalData.segments.forEach(seg => {
                if (!haveUserLabeledSegment(seg) && !isSegmentCompleted(seg))
                    segments = segments.concat(seg);
            });

            setCurrentSegment(0);

            setDataBlank({
                ...originalData,
                ...{ segments }
            })
        }
    }, [originalData]);

    const data = () => {
        const d = showFilled ? originalData : dataBlank;
        return d;
    };

    const segment = () => data()?.segments[currentSegment];

    const prevSegment = () => {
        if (currentSegment > 0)
            setCurrentSegment(currentSegment - 1)
    }

    const nextSegment = () => {
        if (currentSegment < data()?.segments.length - 1)
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
        getStats();
    }

    const getStats = async () => {
        const loadedStats = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_STATS, params).get(null);
        setStats(loadedStats);
    }


    const currentLabel = () => {
        const id = segment()?.labels?.find(label => label.user_id === currentUser?.id)?.classification_label_id;
        return id || '';
    }

    const countLabels = () => {
        return data()?.segments.filter(s => s.labels.filter(l => l.user_id === currentUser?.id).length > 0).length;
    }

    const statsRender = () => {
        if (stats)
            return <div style={{ display: 'flex' }}>
                <ClassificationStats {...stats} />
            </div>
    }

    const showLabeledMinAlert = () => {
        return stats && calcProgress(
            stats.correspondents_count,
            1,
            stats.project_users_count,
            stats.correspondents_labeled_by_user_count
        ) >= 100
    }

    const renderText = () => {
        if (!segment()) return null;

        if (segment().formatted_text) {
            return <div dangerouslySetInnerHTML={{ __html: segment()?.formatted_text }} />
        } else {
            return <h3>{segment()?.text}</h3>
        }

    }

    return (
        <CaseHeaderContent>
            <div className="card">
                <CardTitle title={data()?.title} info={statsRender()} />
                <CardContent>
                    {segment() ? <>
                        {renderText()}
                        < Divider />
                        <p>{segment()?.description}</p>
                        <Divider orientation="left">Correspondentes</Divider>

                        {showLabeledMinAlert()
                            ? <Alert
                                message="Você já rotulou a quantidade mínima para este documento"
                                type="info"
                                closable
                                style={{ marginBottom: "1rem" }}
                            />
                            : null
                        }

                        {segment()?.correspondings.map(corresponding => <ClassificationCorrespondingItem data={corresponding} />)}
                    </> :
                        <Empty description="Nenhum segmento sem rótulo. Ative a opção 'Mostrar segmentos já rolutaods' abaixo para visualizar todos os segmentos" />
                    }
                </CardContent>
            </div>

            <Divider />
            <div className="row middle-xs">
                <div className="col-xs-8">
                    <Pagination
                        current={currentSegment + 1}
                        defaultPageSize={1}
                        total={data()?.segments.length}
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
                <div className="col-xs-4">
                    <Switch checked={showFilled} onChange={() => setShowFilled(!showFilled)} /> Mostrar segmentos já rotulados
                </div>
            </div>
        </CaseHeaderContent>
    );

}