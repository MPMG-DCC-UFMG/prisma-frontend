import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseById } from '../../reducers/cases';
import HeaderContent from '../HeaderContent';
import { Spin } from 'antd';

export default function CaseHeaderContent (props) {

    const { projectId } = useParams();
    const currentCase = useSelector(state => state.case.currentCase);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!currentCase || currentCase.id!=projectId){
            dispatch(fetchCaseById(projectId));
        }
    }, []);

    return (
        <HeaderContent linkTo={`/case/${currentCase?.id}/detail`} subtitle={currentCase?.name} color={currentCase?.color}>
            { !currentCase ? <div className="ta-c"><Spin size="large" /></div> : props.children }
        </HeaderContent>
    );

}