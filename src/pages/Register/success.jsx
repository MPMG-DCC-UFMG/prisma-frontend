import { Result } from 'antd';
import React from 'react';
import VerticalCenter from '../../templates/VerticalCenter';

export default function RegisterSuccess (props) {

    return (
        <VerticalCenter>
            <Result
                status="success"
                title="Cadastro realizado com sucesso"
                subTitle="Seu cadastro encontra-se em aprovação. Solicite o administrador do sistema a ativação do seu cadastro."
                extra={[]}
            />
        </VerticalCenter>
    );

}