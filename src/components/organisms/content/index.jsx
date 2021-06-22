import React from 'react';

export default function Content (props) {

    return (
        <main id="content">
            <div className="container">
                { props.children }
            </div>
        </main>
    );

}