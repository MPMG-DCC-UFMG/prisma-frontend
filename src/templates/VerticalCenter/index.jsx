import React from 'react';
import Header from '../../components/organisms/Header';
import Subheader from '../../components/organisms/Subheader';
import Content from '../../components/organisms/Content';

export default function VerticalCenter (props) {

    return (
        <div id="structure" className="App center">
            { props.children }
        </div>
    );

}