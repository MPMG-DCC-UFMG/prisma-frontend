import React from 'react';
import HeaderContent from '../../../templates/HeaderContent';
import CardButton from '../../../components/molecules/CardButton';
import CaseCard from '../../../components/molecules/CaseCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchCases, setCase } from '../../../reducers/cases';
import UserRoles from '../../../components/atoms/UserRole';
import NotAdmin from '../../../components/atoms/NotAdmin';
import { Empty } from 'antd';

export default function CaseList (props) {
    
    const caseList = useSelector((state) => state.case.caseList );
    const dispatch = useDispatch();

    useState(() => {
        dispatch(setCase(null));
        dispatch(fetchCases());
    }, []);

    return (
        <HeaderContent subtitle="Casos">
            <div className="row">
                { (caseList && caseList.length==0) ? (
                    <NotAdmin>
                        <Empty description="Você ainda não foi designado para nenhum caso. Entre em contato com os administradores do projeto" ></Empty>
                    </NotAdmin>
                ) : null }
                <UserRoles roles={['admin', 'root']}>
                    <div className="col-xs-12 col-md-3 mb-1">
                        <Link to="/case/new">
                            <CardButton icon="plus" label="Novo Caso" />
                        </Link>
                    </div>
                </UserRoles>
                { caseList?.map(el => (
                    <div className="col-xs-12 col-md-3 mb-1">
                        <CaseCard data={el} />
                    </div>
                ))}
            </div>
        </HeaderContent>
    );

}