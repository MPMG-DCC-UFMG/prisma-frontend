import React, { useEffect, useState } from 'react';
import { Button, Divider, Skeleton, List } from 'antd';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Icon from '../../../components/atoms/Icon';
import If from '../../../components/atoms/If';
import ParaphraseRevision from '../../../components/molecules/ParaphraseRevision';
import ParaphraseRevisionForm from '../../../components/organisms/ParaphraseRevisionForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchParaphrase, fetchParaphraseList } from '../../../reducers/paraphrase';

export default function ParaphraseView(props) {

    const [addRevision, setAddRevision] = useState(false);
    const [addRevisionData, setAddRevisionData] = useState();
    const data = useSelector(state => state.paraphrase.data);
    const list = useSelector(state => state.paraphrase.list);
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        loadData();
    }, [params])

    useEffect(() => {
        setAddRevision(false);
        setAddRevisionData();
    }, [data])

    const loadData = () => {
        dispatch(fetchParaphrase(params));
        dispatch(fetchParaphraseList(params));
    }

    const editRevision = (revision) => {
        setAddRevisionData(revision);
        setAddRevision(true);
    }

    const cancelAddRevision = () => {
        setAddRevisionData();
        setAddRevision(false);
    }

    const prevText = () => {
        if (!isFirst())
            history.push(`/case/${params.projectId}/paraphrase/${list[index() - 1].id}/view`);
    }
    const nextText = () => {
        if (!isLast())
            history.push(`/case/${params.projectId}/paraphrase/${list[index() + 1].id}/view`);
    }

    const index = () => list.findIndex(d => d.id === data.id);
    const isFirst = () => index() === 0;
    const isLast = () => index() >= list.length - 1;



    return (
        <CaseHeaderContent>

            {data ? <>
                <Divider orientation="left">Texto original</Divider>

                <p>{data?.text}</p>

                <Divider orientation="left">Paráfrases</Divider>

                <List
                    footer={(
                        <div>
                            {addRevision ?
                                <ParaphraseRevisionForm edit={addRevisionData} onCancel={cancelAddRevision} />
                                :
                                <div class="ta-c">

                                    <If condition={!isFirst()}>
                                        <Button
                                            onClick={() => prevText()}
                                            className="mr-2"
                                            type="default">
                                            Anterior
                                        </Button>
                                    </If>

                                    <Button
                                        onClick={() => editRevision()}
                                        className="mr-2"
                                        type="primary">
                                        <Icon icon="plus mr-1" /> Adicionar paráfrase
                                    </Button>

                                    <If condition={!isLast()}>
                                        <Button
                                            onClick={() => nextText()}
                                            className="mr-2"
                                            type="default">
                                            Próximo
                                        </Button>
                                    </If>
                                </div>
                            }
                        </div>
                    )}
                    locale={{ emptyText: "Nenhuma paráfrase cadastrada" }}
                    dataSource={data?.revisions}
                    renderItem={item => <>
                        <ParaphraseRevision data={item} onEdit={editRevision} />
                        <Divider />
                    </>}
                />
            </>
                :
                <Skeleton active />
            }

        </CaseHeaderContent>
    );

}