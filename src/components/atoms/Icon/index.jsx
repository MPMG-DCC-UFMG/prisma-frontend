import React from 'react';

export default function Icon(props) {

    function getStyle() {
        switch(props.style){
            case "brand":
                return 'fab';
                break;
            case "regular":
                return 'far';
                break;
            case "light":
                return 'fal'
                break;
            default:
                return 'fas'
                break;
        }
    }

    function getColor() {
        return props.color ? `color-${props.color}` : '';
    }

    function getClasses() {
        return [getStyle(), 'fa-'+props.icon, getColor(), ...[props.className]].join(" ");
    };

    return (
        <i style={props.style} className={ getClasses() }></i>
    )
}