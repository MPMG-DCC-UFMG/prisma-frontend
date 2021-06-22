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

    function getClasses() {
        return [getStyle(), 'fa-'+props.icon].join(" ");
    };

    return (
        <i className={ getClasses() }></i>
    )
}