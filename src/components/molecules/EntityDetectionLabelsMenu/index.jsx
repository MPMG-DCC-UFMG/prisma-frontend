import React from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { useDispatch } from 'react-redux';
import { fetchEntityDetection } from '../../../reducers/entityDetection';
import Icon from '../../atoms/Icon';
import { ColorService } from '../../../services/colorService';

export default function EntityDetectionLabelsMenu(props) {

    const data = useSelector(state => state.entityDetection.data);
    const params = useParams();
    const dispatch = useDispatch();

    const menuItens = () => data[props.type];

    const addAnnotation = async (item) => {
        const annotation = {
            ...props.data,
            projectId: params.projectId,
            documentId: params.id,
            sentenceId: props.sentence.id,
            entity_id: item.id
        }
        saveAnnotation(annotation);
        props.onClose();
    }

    const saveAnnotation = async (annotation) => {
        if (annotation.id)
            await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_ANNOTATION_EDIT, annotation).put(null, annotation);
        else
            await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_ANNOTATION_ADD, annotation).post(null, annotation);
        dispatch(fetchEntityDetection(params));
    }

    const deleteAnnotation = async () => {
        const annotation = {
            ...props.data,
            projectId: params.projectId,
            documentId: params.id,
            sentenceId: props.sentence.id,
        }
        switch (props.type) {
            case "entities":
                await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_ANNOTATION_EDIT, annotation).delete(null);
                break;
            case "relationship_types":
                await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_RELATIONSHIP_EDIT, annotation).delete(null);
                break;
            default:
                console.error(`Tipo não implementado`)
        }
        dispatch(fetchEntityDetection(params));
        props.onClose();
    }

    const addRelationship = async (item) => {
        const annotation = {
            ...props.data,
            projectId: params.projectId,
            documentId: params.id,
            sentenceId: props.sentence.id,
            relationship_type_id: item.id
        }
        saveRelationship(annotation);
        props.onClose();
    }

    const saveRelationship = async (annotation) => {
        if (annotation.id)
            await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_RELATIONSHIP_EDIT, annotation).put(null, annotation);
        else
            await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_RELATIONSHIP_ADD, annotation).post(null, annotation);
        dispatch(fetchEntityDetection(params));
    }

    const onClick = (item) => {
        switch (props.type) {
            case "entities":
                addAnnotation(item);
                break;
            case "relationship_types":
                addRelationship(item);
                break;
            default:
                console.error(`Tipo não implementado: ${item}`)
        }
    }

    const calcMarginLeft = () => {
        if (!props.position) return 0;
        const calc = window.screen.width - props.position?.x;
        console.log(window.screen.width, calc);
        return (calc < 350) ? -(350 - calc) : 0;
    }

    const labelsMenu = () => {
        return <>
            <div
                onClick={props.onClose}
                style={{
                    position: "fixed",
                    zIndex: 2,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,.08)"
                }} />
            <div
                className="labels-menu"
                style={{
                    marginLeft: `${calcMarginLeft()}px`,
                    left: `${props.position?.x}px`,
                    top: `${props.position?.y}px`,
                }}
            >
                <List
                    dataSource={menuItens()}
                    size="small"
                    renderItem={item => (
                        <List.Item
                            onClick={() => onClick(item)}
                            className="cur-p"
                        >
                            <Icon
                                style={{
                                    color: ColorService.getColor(item.color)
                                }}
                                icon={item.icon || 'tags'}
                                className="mr-1" />
                            {item.label}
                        </List.Item>
                    )}
                >
                    {props.data.id ? <List.Item
                        onClick={() => deleteAnnotation()}
                        className="cur-p"
                    >
                        <Icon
                            color="danger"
                            icon="trash"
                            className="mr-1" />
                        Remover
                    </List.Item> : null}
                </List>
            </div>
        </>
    }

    return props.visible ? labelsMenu() : null;
}