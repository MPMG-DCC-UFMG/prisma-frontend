import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAudioTranscription } from "../../../reducers/audioTranscription";
import { fetchParaphrase } from "../../../reducers/paraphrase";
import { ApiRequest } from "../../../services/apiRequestService";
import BaseUrls from "../../../utils/baseUrls";


export default function ParaphraseRevisionForm (props) {

    const { edit, initialValue } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const urlParams = {
        projectId: params.projectId,
        paraphraseId: params.id
    }

    const dispatch = useDispatch();

    const addRevision = async (data) => {
        setLoading(true);
        try {

            if(edit)
                await ApiRequest.setUrl(BaseUrls.PARAPHRASE_REVISION_EDIT, urlParams, edit.id)
                    .put(null, data);
            else 
                await ApiRequest.setUrl(BaseUrls.PARAPHRASE_REVISION_ADD, urlParams)
                    .post(null, data);

            
            message.success("Paráfrase adicionada com sucesso", 5);
            dispatch(fetchParaphrase(params));
            form.resetFields();
        } catch {
            message.error("Não foi possível adicionar a Paráfrase", 5);
        }
        setLoading(false);
    }

    const onFinish = (values) => {
        addRevision(values);
      };

    const onKeyDown = (ev) => {
        if (ev.ctrlKey && ev.keyCode === 13) {
            form.submit();
        }
    }

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{
                revision: edit?.revision || initialValue
            }}
        >
            <Form.Item 
                label="Paráfrase" 
                name="revision"
                rules={[{ required: true, message: 'Digite sua paráfrase antes de enviar' }]}
                extra="Pressione CTRL+ENTER para enviar sua paráfrase"
            >
                <Input.TextArea onKeyDown={onKeyDown} autoSize placeholder="Digite aqui a sua paráfrase" />
            </Form.Item>

            <Form.Item>
                <Button disabled={loading} htmlType="submit" type="primary">{ loading ? <Spin /> : "Enviar" }</Button>
                { props.onCancel ? <Button onClick={props.onCancel} type="link">Cancelar</Button> : null }
            </Form.Item>

        </Form>
    );

}