import React, { useState } from 'react';
import Header from '../../components/organisms/Header';
import Subheader from '../../components/organisms/Subheader';
import Content from '../../components/organisms/Content';
import Card from '../../components/molecules/Card';
import { Form, Button, Divider, message, Spin } from 'antd';
import FormInput from '../../components/organisms/FormInput';
import { UrlBuilder } from '../../services/urlBuilder/urlBuilder';
import { ApiRequest } from '../../services/apiRequestService';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FixPath } from '../../services/fixPath';

export default function HeaderForm(props) {

    const { formData, editing } = props;
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState();
    const history = useHistory();
    const [form] = Form.useForm();
    const { id } = useParams();
    const params = useParams();

    const baseUrl = () => {
        let url = new UrlBuilder(formData.baseRoute).get();
        return FixPath.fix(url, params);
    }

    const onFinish = (values) => {

        if (values.file)
            values.file = values.file.fileList[0].response.url;

        if (editing)
            edit(values);
        else
            create(values);

    };

    const create = (data) => {
        save(baseUrl(), "post", data);
    }

    const edit = (data) => {
        save(baseUrl() + id, "put", data);
    }

    const save = async (url, method, data) => {
        setLoading(true);
        try {
            await ApiRequest.request(
                url,
                method,
                data
            );
            message.success(editing ? "Edição realizada com sucesso" : "Cadastro realizado com sucesso", 5);
            goBack();
        } catch {
            message.error("Não foi possível salvar. Verifique os dados e tente novamente", 5);
        }
        setLoading(false);
    }

    const loadData = async () => {
        if (editing) {
            const data = await ApiRequest.get(baseUrl() + id);
            setValues(data);
            form.setFieldsValue(data);
        }
    }

    const goBack = () => {
        history.push(formData.pathAfterSave ? FixPath.fix(formData.pathAfterSave, params) : `/${FixPath.fix(formData.path, params)}`);
    }

    useEffect(() => {
        loadData();
    }, [])

    const formFields = () => {
        let fields = formData.form;

        if (editing)
            fields = fields.filter(field => !field.hideOnEditing);

        if (!editing)
            fields = fields.filter(field => !field.hideOnCreating);

        return fields;
    }

    const onValuesChange = (changed, values) => {
        setValues(values);
    }

    const showIf = (conditions) => {
        if(!values) return false;
        for(const key in conditions) {
            if(values[key] !== conditions[key]) return false;
        }
        return true;
    }

    return (
        <div id="structure" className="App">
            <Header />
            <Subheader title={formData.title} />
            <Content>
                <div className="row center-xs">
                    <div className="col-xs-12 col-md-6 ta-l">
                        <Card title={editing ? formData.editTitle : formData.createTitle} icon="edit">
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={onFinish}
                                onValuesChange={onValuesChange}
                            >

                                {formFields().map(field => {
                                    if(!field.showIf || showIf(field.showIf))
                                        return <FormInput field={field} form={form} />
                                    return null;
                                })}

                                <Divider />

                                <Form.Item wrapperCol={{ span: 24 }} className="ta-c">
                                    <Button disabled={loading} type="primary" htmlType="submit">
                                        {loading ? <Spin /> : "Salvar"}
                                    </Button>
                                    <Button className="ml-4" type="link" onClick={goBack}>Cancelar</Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </div>
                </div>
            </Content>
        </div>
    );

}