import React, { useEffect, useState } from 'react';
import { Button, Divider, Collapse, List } from 'antd';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Icon from '../../../components/atoms/Icon';
import ParaphraseRevision from '../../../components/molecules/ParaphraseRevision';
import ParaphraseRevisionForm from '../../../components/organisms/ParaphraseRevisionForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchParaphrase } from '../../../reducers/paraphrase';

export default function ParaphraseView(props) {

    const [addRevision, setAddRevision] = useState(false);
    const data = useSelector(state => state.paraphrase.data);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [params])

    useEffect(() => {
        setAddRevision(false);
    }, [data])

    const loadData = () => {
        dispatch(fetchParaphrase(params));
    }

    return (
        <CaseHeaderContent>


            <Divider orientation="left">Texto original</Divider>

            <p>{ data?.text }</p>

            <Divider orientation="left">Paráfrases</Divider>

            <List
                footer={(
                    <div>
                        {addRevision ?
                            <ParaphraseRevisionForm onCancel={() => setAddRevision(false)} />
                            :
                            <Button
                                onClick={() => setAddRevision(true)}
                                className="mr-2"
                                type="primary">
                                <Icon icon="plus mr-1" /> Adicionar paráfrase
                            </Button>
                        }
                    </div>
                )}
                locale={{ emptyText: "Nenhuma paráfrase cadastrada" }}
                dataSource={data?.revisions}
                renderItem={item => <>
                    <ParaphraseRevision data={item} />
                    <Divider />
                </>}
            />

        </CaseHeaderContent>
    );

}