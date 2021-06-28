import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'

export default function Card (props) {
    return (
        <div className="card">
            <CardTitle title={props.title} icon={props.icon} />
            <CardContent>
                {props.children}
            </CardContent>
        </div>
    );
}