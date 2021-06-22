import React from 'react';
import Header from '../../components/organisms/header';
import Subheader from '../../components/organisms/subheader';
import Content from '../../components/organisms/content';


export default function HeaderContent (props) {

    return (
        <div id="structure" className="App">
            <Header />
            <Subheader title={props.subtitle} />
            <Content>
                { props.children }
            </Content>
        </div>
    );

}