import React from 'react';
import FormBuilder from '../../components/organisms/FormBuilder';
import VerticalCenter from '../../templates/VerticalCenter';
import registerForm from '../../data/form/register.json';

export default function Register (props) {

    return (
        <VerticalCenter>
            <div style={{ minWidth: 500 }}>
                <FormBuilder formData={registerForm} />
            </div>
        </VerticalCenter>
    );

}