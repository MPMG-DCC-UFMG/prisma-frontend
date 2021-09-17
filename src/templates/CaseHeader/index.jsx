import React from 'react';
import CaseHeaderContent from '../CaseHeaderContent';

export default function CaseHeader(props) {
    return (
        <CaseHeaderContent {...props} withoutContent={true} />
    );
}