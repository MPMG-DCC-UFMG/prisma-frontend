import React from 'react';
import './styles.scss';

export default function SubHeader (props) {

    return (
        <header id="subheader">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        <h2>{props.title}</h2>
                    </div>
                </div>
            </div>
        </header>
    );

}