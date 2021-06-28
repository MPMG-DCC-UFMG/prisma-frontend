import React from 'react';
import HeaderForm from '../../../../templates/HeaderForm';
import formData from '../../../../data/form/entities.json';

export default function EntityDetectionEntitiesForm (props) {

    return (
        <HeaderForm subtitle="Projeto de teste" color="hex" formTitle="Cadastrar Entidade" formData={formData} >
        </HeaderForm>
    );

}