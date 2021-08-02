import React from 'react';
import { Link } from 'react-router-dom';
import { ColorService } from '../../../services/colorService';
import './styles.scss';

export default function SubHeader (props) {

    const color = () => {
        if(props.color)
            return { backgroundColor: ColorService.getColor(props.color) }
        else {
            return;
        }
    }

    return (
        <header id="subheader" style={ color() } className={ props.color ? 'secondary' : '' }>
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        <h2>
                            { props.linkTo ? (
                                <Link to={props.linkTo}>{props.title}</Link>
                                ) : <>{props.title}</> }
                        </h2>
                    </div>
                </div>
            </div>
        </header>
    );

}