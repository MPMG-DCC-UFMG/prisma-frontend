import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../reducers/users';
import VerticalCenter from '../../templates/VerticalCenter';
import { Form, Button, Divider, Input, message, Spin } from 'antd';
import { ApiRequest } from '../../services/apiRequestService';
import { LoginUrlBuilder } from '../../services/urlBuilder/loginUrlBuilder';
import { useHistory } from 'react-router';
import './login.scss';
import { Link } from 'react-router-dom';

export default function Login (props) {

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setMounted(true);
        if(ApiRequest.token)
            history.replace("/home");
    }, mounted);

    const onFinish = async (values) => {

        setLoading(true);

        try {
            let tokenData = await ApiRequest.post( new LoginUrlBuilder().get(), values );
            ApiRequest.setToken(tokenData.access_token);
            loadUserData();
            setLoading(false);
        } catch(error) {
            console.error(error.response.data.error);
            message.error(error.response.data.error, 5);
            setLoading(false);
        };
    };

    const loadUserData = async () => {
        try {
            dispatch(fetchUser());
            history.replace("/home");
        } catch {
            message.error("Não foi possível recuperar os dados do usuário", 5);
        }
        setLoading(false);
    }
    
    return (
        <VerticalCenter>
            <div className="login-form">
                <h2>Software de Anotação</h2>
                <Card title="Entrar" icon="lock">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >

                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                { required: true, message: 'Digite o seu e-mail' },
                                { type: 'email', message: 'E-mail inválido' }
                            ]}
                            >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Senha"
                            name="password"
                            rules={[{ required: true, message: 'Digite a sua senha' }]}
                            >
                            <Input.Password />
                        </Form.Item>

                        <Divider />

                        <Form.Item wrapperCol={{ span: 24 }} className="ta-c">
                            <Button disabled={ loading } type="primary" htmlType="submit" block>
                                { loading ? <Spin /> : "Entrar" }
                            </Button>
                        </Form.Item>

                    </Form>

                    <Link to="/register">
                        <Button type="ghost" block>
                            Cadastrar
                        </Button>
                    </Link>
                </Card>
            </div> 
        </VerticalCenter>
    );

}