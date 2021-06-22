import React from 'react';
import { CardContent } from '../../atoms/card'
import './styles.scss'

export default function Card (props) {

    return (
        <div className="card card-button card-icon-button">
            <CardContent>
                <div className="icon"><i class="fas fa-plus"></i></div>
                <div className="label">{props.label}</div>
            </CardContent>
        </div>
    );
}