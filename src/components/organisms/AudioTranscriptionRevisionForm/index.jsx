import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAudioTranscription } from "../../../reducers/audioTranscription";
import { ApiRequest } from "../../../services/apiRequestService";
import BaseUrls from "../../../utils/baseUrls";


export default function AudioTranscriptionRevisionForm (props) {

    const { edit } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const urlParams = {
        projectId: params.projectId,
        audioTranscriptionId: params.id,
        segmentId: props.segment.id,
    }
    const dispatch = useDispatch();

    const addRevision = async (data) => {
        setLoading(true);
        try {

            if(edit)
                await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT_REVISION_UPDATE, urlParams, edit.id)
                    .put(null, data);
            else 
                await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT_REVISION_CREATE, urlParams)
                    .post(null, data);

            
            message.success("Revisão adicionada com sucesso", 5);
            form.resetFields();
        } catch {
            message.error("Não foi possível adicionar a revisão", 5);
        }
        dispatch(fetchAudioTranscription(params));
        setLoading(false);
    }

    const onFinish = (values) => {
        addRevision(values);
      };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{
                revision: edit?.revision || ""
            }}
        >
            <Form.Item 
                label="Transcrição" 
                name="revision"
                rules={[{ required: true, message: 'Digite sua transcrição antes de enviar' }]}
            >
                <Input.TextArea autoSize placeholder="Digite aqui a sua transcrição" />
            </Form.Item>

            <Form.Item>
                <Button disabled={loading} htmlType="submit" type="primary">{ loading ? <Spin /> : "Enviar" }</Button>
                <Button onClick={props.onCancel} type="link">Cancelar</Button>
            </Form.Item>

        </Form>
    );

}