import React from 'react';

export default function VerticalCenter (props) {

    return (
        <div id="structure" className="App center">
            { props.children }
        </div>
    );

}