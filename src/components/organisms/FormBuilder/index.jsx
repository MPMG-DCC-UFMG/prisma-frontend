import React, { useState } from 'react';
import Card from '../../molecules/Card';
import { Form, Button, Divider, message, Spin } from 'antd';
import FormInput from '../FormInput';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';
import { ApiRequest } from '../../../services/apiRequestService';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FixPath } from '../../../services/fixPath';

export default function FormBuilder (props) {

    const { formData, editing } = props;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [form] = Form.useForm();
    const { id } = useParams();
    const params = useParams();

    const baseUrl = () => {
        let url = new UrlBuilder(formData.baseRoute).get();
        return FixPath.fix(url, params);
    }

    const onFinish = (values) => {

        if(values.file)
            values.file = values.file.fileList[0].response.url;

        if(editing)
            edit(values);
        else 
            create(values);

    };

    const create = (data) => {
        save(baseUrl(), "post", data);
    }

    const edit = (data) => {
        save(baseUrl()+id, "put", data);
    }

    const save = async (url, method, data) => {
        setLoading(true);
        try {
            const result = await ApiRequest.request(
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
        if(editing) {
            console.log(id);
            const data = await ApiRequest.get(baseUrl()+id);
            form.setFieldsValue(data);
        }
    }

    const goBack = () => {
        history.push( formData.pathAfterSave ? FixPath.fix(formData.pathAfterSave, params) : `/${FixPath.fix(formData.path, params)}`);
    }

    useEffect(()=>{
        loadData();
    }, [])

    const formFields = () => {
        let fields = formData.form;

        if(editing)
            fields = fields.filter(field => !field.hideOnEditing);

        return fields;
    }

    return (
        <Card title={ editing ? formData.editTitle : formData.createTitle } icon="edit">
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
            >

                { formFields().map( field => <FormInput field={field} form={form} /> )}

                <Divider />

                <Form.Item wrapperCol={{ span: 24 }} className="ta-c">
                    <Button disabled={ loading } type="primary" htmlType="submit">
                    { loading ? <Spin /> : "Salvar" }
                    </Button>
                    <Button className="ml-4" type="link" onClick={goBack}>Cancelar</Button>
                </Form.Item>

            </Form>
        </Card>
    );

}