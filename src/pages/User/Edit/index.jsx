import React from 'react';
import HeaderForm from '../../../templates/HeaderForm';
import userForm from '../../../data/form/me';
import passwordForm from '../../../data/form/password.json';

export default function EditUser (props) {

    return (
        <HeaderForm formData={props.type === 'password' ? passwordForm : userForm} editing={true} >
        </HeaderForm>
    );

}