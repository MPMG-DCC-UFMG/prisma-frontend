import React from 'react';
import { useSelector } from 'react-redux';
import { ColorService } from '../../../services/colorService';
import Icon from '../Icon';

export default function EntityLabel(props) {

    const data = useSelector(state => state.entityDetection.data);

    const selectedLabel = () => data.entities.find(d => d.id === props.entity_id)

    return (
        <span
            id={props.removeId ? '' : `annotation-${props.id}`}
            data-id={props.id}
            className="entity-label cur-p"
            style={{
                backgroundColor: ColorService.getColor(selectedLabel().color),
                color: "#FFF"
            }}
            onClick={props.onClick}
            draggable="true"
            onDrop={(ev) => {
                props.stopDrag(ev);
            }}
            onDragOver={(ev) => ev.preventDefault() }
            onDragEnd={props.cancelDrag}
            onDrag={props.moveDrag}
            onDragStart={(ev) => {
                ev.dataTransfer.setDragImage(document.createElement("div"), 0, 0)
                props.startDrag(ev);
            } }
        >
            <Icon icon={selectedLabel().icon || "tags"} className="mr-1" />
            {props.text}
        </span>
    )

}