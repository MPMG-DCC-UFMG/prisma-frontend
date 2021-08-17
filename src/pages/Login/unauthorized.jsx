import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ApiRequest } from '../../services/apiRequestService';
import VerticalCenter from '../../templates/VerticalCenter';

export default function Unauthorized (props) {

    const history = useHistory();

    const logout = () => {
        ApiRequest.removeToken();
        history.replace("/login");
    };

    return (
        <VerticalCenter>
            <Result
                status="warning"
                title="Sessão Expirada"
                subTitle="Para continuar acessando a página é necessário fazer o login novamente."
                extra={[<Button onClick={logout}>Voltar à tela de login</Button>]}
            />
        </VerticalCenter>
    );

}