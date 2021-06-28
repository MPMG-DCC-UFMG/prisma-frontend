import React from 'react';
import HeaderForm from '../../../templates/HeaderForm';
import formData from '../../../data/form/entity_detection_import.json';

export default function EntityDetectionImport (props) {

    return (
        <HeaderForm subtitle="Projeto de teste" formTitle="Importar documento" formData={formData} >
        </HeaderForm>
    );

}