import React, { useEffect, useState } from 'react';
import { List, Button, Divider } from 'antd';
import EntityDetectionSentenceMenu from '../../../components/molecules/EntityDetectionSentenceMenu';
import { useParams } from 'react-router-dom';
import './styles.scss';
import EntityLabel from '../../../components/atoms/EntityLabel';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchEntityDetection } from '../../../reducers/entityDetection';
import EntityDetectionLabelsMenu from '../../../components/molecules/EntityDetectionLabelsMenu';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';

export default function EntityDetectionView(props) {

    const [iSentence, setISentence] = useState(0);
    const [menuPosition, setMenuPosition] = useState(null);
    const [labelsMenuData, setLabelsMenuData] = useState(null);
    const data = useSelector(state => state.entityDetection.data);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEntityDetection(params));
    }, [])

    const changeSentence = (i) => {
        setISentence(i);
    }

    const nextSentence = () => {
        if (iSentence < data.sentences.length - 1)
            setISentence(iSentence + 1);
    }

    const prevSentence = () => {
        if (iSentence > 0)
            setISentence(iSentence - 1);
    }

    const currentSentence = () => {
        return data?.sentences[iSentence];
    }

    const getText = () => {
        const annotations = [...currentSentence().annotations];
        const text = currentSentence().sentence;
        if (annotations.length === 0)
            return text;

        const t = [];
        let i = 0;

        annotations
            .sort((a, b) => (a.start > b.start) ? 1 : -1)
            .forEach(a => {
                t.push(text.substring(i, a.start));
                t.push(<EntityLabel {...a} onClick={(ev) => clickAnnotation(ev, a)} />)
                i = a.end;
            })
        t.push(text.substring(i, text.length));
        return t;
    }

    const clickAnnotation = (ev, annotation) => {
        setLabelsMenuData(annotation);
        setMenuPosition({
            y: ev.clientY,
            x: ev.clientX
        });
    }

    const mouseUp = (ev) => {

        const selection = window.getSelection();

        if (ev.target.id === "entityText" && selection.type === "Range") {
            const entity = selection.baseNode.data;
            const offset = currentSentence().sentence.indexOf(entity);
            const curSel = {
                start: offset + Math.min(selection.baseOffset, selection.focusOffset),
                end: offset + Math.max(selection.baseOffset, selection.focusOffset),
                text: entity.substring(selection.baseOffset, selection.focusOffset)
            };

            setLabelsMenuData(curSel);
            setMenuPosition({
                y: ev.clientY,
                x: ev.clientX
            });

        } else {
            closeLabelsMenu();
        }
    }

    const closeLabelsMenu = () => {
        setMenuPosition(null);
        setLabelsMenuData(null);
    }

    return (
        <CaseHeaderContent>
            {data ? <div className="row between-xs">

                <EntityDetectionLabelsMenu
                    position={menuPosition}
                    visible={Boolean(labelsMenuData)}
                    data={labelsMenuData}
                    sentence={currentSentence()}
                    onClose={() => closeLabelsMenu()}

                />

                <div className="col-xs-12 col-md-4 pos-r">
                    <div className="senteces-menu">
                        <List
                            dataSource={data.sentences}
                            renderItem={(item, index) => <EntityDetectionSentenceMenu
                                item={item}
                                index={index}
                                entitiesCount={data.sentences[index].annotations.length}
                                onChangeSentence={changeSentence}
                                selected={iSentence === index}
                            />}
                        >
                        </List>
                    </div>
                </div>

                <div className="col-xs-12 col-md-7">
                    <div className="text" id="entityText" onMouseUp={mouseUp}>
                        {getText()}
                    </div>

                    <Divider />

                    <div className="row between-xs">
                        <div className="col-xs">
                            <Button onClick={() => prevSentence()}>Voltar</Button>
                        </div>
                        <div className="col-xs ta-c">
                            {`${iSentence + 1} / ${data.sentences.length}`}
                        </div>
                        <div className="col-xs ta-r">
                            <Button type="primary" onClick={() => nextSentence()}>Avançar</Button>
                        </div>
                    </div>
                </div>
            </div> : null}

        </CaseHeaderContent>
    );

}