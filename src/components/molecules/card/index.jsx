import React from 'react';
import { CardContent, CardTitle } from '../../atoms/card'

export default function Card (props) {
    return (
        <div className="card">
            <CardTitle />
            <CardContent>
                {props.children}
            </CardContent>
        </div>
    );
}