import React from 'react';
import { useSelector } from 'react-redux';
import ClassificationViewNormal from './classificationViewNormal';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import ClassificationViewRelationship from './classificationViewRelationship';

export default function ClassificationView(props) {
    const currentCase = useSelector(state => state.case.currentCase);

    const render = () => {
        if(!currentCase) return <CaseHeaderContent></CaseHeaderContent>;

        if(currentCase.classification_has_relationship) {
            return <ClassificationViewRelationship />
        } else {
            return <ClassificationViewNormal />
        }
    }

    return render();
}