import React from 'react';
import Header from '../../components/organisms/Header';
import Subheader from '../../components/organisms/Subheader';
import Content from '../../components/organisms/Content';


export default function HeaderContent (props) {

    return (
        <div id="structure" className="App">
            <Header />
            <Subheader linkTo={props.linkTo} title={props.subtitle} color={props.color} />
            <Content>
                { props.children }
            </Content>
        </div>
    );

}