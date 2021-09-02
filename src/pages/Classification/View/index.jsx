import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassificationViewNormal from './classificationViewNormal';
import ClassificationViewRelationship from './classificationViewRelationship';
import { useParams } from 'react-router-dom';
import { fetchClassification } from '../../../reducers/classification';

export default function ClassificationView(props) {
    const data = useSelector(state => state.classification.data);
    const params = useParams();
    const dispatch = useDispatch();

    const loadData = () => {
        dispatch(fetchClassification(params));
    }

    useEffect(() => {
        if (!data || data.id !== params.id)
            loadData();

    }, [data, params.id]);

    const render = () => {
        switch (data?.type) {
            case "classification_relationship":
                return <ClassificationViewRelationship />
            case "classification":
                return <ClassificationViewNormal />
            default:
                return null;
        }
    }

    return render();
}