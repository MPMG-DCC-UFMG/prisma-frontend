import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import VerticalCenter from '../../templates/VerticalCenter';

export default function RegisterSuccess (props) {

    return (
        <VerticalCenter>
            <Result
                status="success"
                title="Cadastro realizado com sucesso"
                subTitle="Seu cadastro encontra-se em aprovação. Solicite ao administrador do sistema a ativação do seu cadastro."
                extra={[<Link to="/login"><Button>Voltar à tela inicial</Button></Link>]}
            />
        </VerticalCenter>
    );

}