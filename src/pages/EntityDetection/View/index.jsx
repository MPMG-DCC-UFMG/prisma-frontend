import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import LeaderLine from 'react-leader-line';

export default function EntityDetectionView(props) {

    const [iSentence, setISentence] = useState(0);
    const [menuPosition, setMenuPosition] = useState(null);
    const [labelsMenuData, setLabelsMenuData] = useState(null);
    const [labelsMenuType, setLabelsMenuType] = useState('entities');
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
                t.push(<EntityLabel
                    {...a}
                    startDrag={startDrag}
                    moveDrag={moveDrag}
                    stopDrag={stopDrag}
                    cancelDrag={cancelDrag}
                    onClick={(ev) => clickAnnotation(ev, a)} />)
                i = a.end;
            })
        t.push(text.substring(i, text.length));
        return t;
    }

    const clickAnnotation = (ev, annotation) => {
        showAnnotationMenu(annotation, ev);
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

            showAnnotationMenu(curSel, ev);
        } else {
            closeLabelsMenu();
        }
    }

    const showAnnotationMenu = (data, ev) => {
        setLabelsMenuType("entities");
        setLabelsMenuData(data);
        setMenuPosition({
            y: ev.clientY,
            x: ev.clientX
        });
    }

    const showRelationshipMenu = (data, ev) => {
        setLabelsMenuType("relationship_types");
        setLabelsMenuData(data);
        setMenuPosition({
            y: ev.clientY,
            x: ev.clientX
        });
    }

    const closeLabelsMenu = () => {
        setMenuPosition(null);
        setLabelsMenuData(null);
        updateLines();
    }

    const [dragLine, setDragLine] = useState({
        origin: null,
        destination: null,
        elmPoint: null,
        line: null,
    })
    const [lines, setLines] = useState([]);

    const startDrag = (ev) => {
        dragLine.origin = ev.target.getAttribute("data-id");
        dragLine.elmPoint = document.getElementById('elm-point');

        dragLine.line = new LeaderLine(
            document.getElementById(`annotation-${ev.target.getAttribute("data-id")}`),
            dragLine.elmPoint
        )
        setDragLine(dragLine);
    }

    const stopDrag = (ev) => {
        dragLine.destination = ev.target.getAttribute("data-id");
        setDragLine(dragLine);
        addLine(dragLine.origin, ev.target.getAttribute("data-id"), ev);
    }

    const cancelDrag = (ev) => {
        dragLine.line.remove();
    }

    const moveDrag = (ev) => {
        if (dragLine.elmPoint && dragLine.line) {
            dragLine.elmPoint.style.left = `${ev.clientX}px`;
            dragLine.elmPoint.style.top = `${ev.clientY}px`;
            dragLine.line.position();
        }
    }

    const addLine = (origin, destination, ev) => {
        if (origin && destination) {
            const newLine = new LeaderLine(
                document.getElementById(`annotation-${origin}`),
                document.getElementById(`annotation-${destination}`)
            );
            setLines(lines.concat(newLine));

            if (ev)
                showRelationshipMenu({
                    from_annotation_id: origin,
                    to_annotation_id: destination,
                }, ev);
        }
    }

    const addLines = (data) => {
        const l = [];
        data?.forEach(d => {
            const from = document.getElementById(`annotation-${d.from_annotation_id}`);
            const to = document.getElementById(`annotation-${d.to_annotation_id}`);
            if (from && to)
                l.push(new LeaderLine(
                    from,
                    to, {
                    color: "grey",
                    size: 3,
                    path: "arc"
                }));
        });
        setLines(l);

    }

    const removeLines = () => {
        while (lines.length) {
            lines.shift().remove();
        }
        setLines([]);
    }

    useLayoutEffect(() => {
        updateLines();
    }, [currentSentence()])

    const updateLines = () => {
        removeLines();
        setTimeout(() => {
            addLines(currentSentence()?.annotation_relationships);
        }, 75)
    }

    return (
        <CaseHeaderContent>
            {data ? <div className="row between-xs">

                <EntityDetectionLabelsMenu
                    position={menuPosition}
                    visible={Boolean(labelsMenuData)}
                    data={labelsMenuData}
                    type={labelsMenuType}
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

                <div className="col-xs-12 col-md-7" >
                    <div id="elm-point"></div>
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