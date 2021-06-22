import React from 'react';
import Icon from '../icon'

export function CardTitle (props) {
    return (
        <div className="card-title">
            <Icon icon="frog" />
            TITULO
        </div>
    );
}

export function CardContent (props) {
    return (
        <div className="card-content">
            {props.children}
        </div>
    );
}
