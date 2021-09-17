import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

export default function EntityRelationship(props) {

    const data = useSelector(state => state.entityDetection.data);

    const getEntity = (id) => props.sentence.annotations.find(d => d.id === id)
    const selectedRelationship = () => data?.relationship_types.find(d => d.id === props.relationship_type_id)

    return (
        <div
            onClick={props.onClick}
            className="relationship cur-p"
            title={`${getEntity(props.from_annotation_id)?.text} -> ${selectedRelationship()?.label} -> ${getEntity(props.to_annotation_id)?.text}`}
        >
            <span className="entity">
                {getEntity(props.from_annotation_id)?.text}
            </span>
            <span className="relationship">
                {selectedRelationship()?.label}
            </span>
            <span className="entity">
                {getEntity(props.to_annotation_id)?.text}
            </span>
        </div>
    )

}