import React from 'react';
import Header from '../../components/organisms/Header';
import Subheader from '../../components/organisms/Subheader';
import Content from '../../components/organisms/Content';
import Card from '../../components/molecules/Card';
import { Form, Button, Divider } from 'antd';
import FormInput from '../../components/organisms/FormInput';

export default function HeaderForm (props) {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const { formData, formTitle, subtitle, color } = props;

    return (
        <div id="structure" className="App">
            <Header />
            <Subheader title={subtitle} color={color} />
            <Content>
                <div className="row center-xs">
                    <div className="col-xs-12 col-md-6 ta-l">
                        <Card title={formTitle} icon="edit">
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >

                                { formData.map( field => <FormInput field={field} /> )}

                                <Divider />

                                <Form.Item wrapperCol={{ span: 24 }} className="ta-c">
                                    <Button type="primary" htmlType="submit">
                                        Enviar
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </div>
                </div>
            </Content>
        </div>
    );

}