import React from 'react';
import HeaderForm from '../../../templates/HeaderForm';
import formData from '../../../data/form/case.json';

export default function CaseForm (props) {

    return (
        <HeaderForm subtitle="Casos" formTitle="Cadastrar Caso" formData={formData} >
        </HeaderForm>
    );

}