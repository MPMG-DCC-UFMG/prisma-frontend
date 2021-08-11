import React from 'react';
import Header from '../../components/organisms/Header';
import Subheader from '../../components/organisms/Subheader';
import Content from '../../components/organisms/Content';


export default function HeaderContent(props) {

    const classes = () => {
        const c = ['App'];
        if(!props.subtitle)
            c.push('without-subheader');
        console.log(c);
        return c.join(' ');
    }

    return (
        <div id="structure" className={classes()}>
            <Header />
            {props.subtitle
                ? <Subheader linkTo={props.linkTo} title={props.subtitle} color={props.color} extras={props.extras} />
                : null
            }
            <Content>
                {props.children}
            </Content>
        </div>
    );

}