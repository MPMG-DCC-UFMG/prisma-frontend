import { Button, Card, Form, Spin, Switch } from 'antd';
import React from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Icon from '../../../components/atoms/Icon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function AudioTranscriptionExport(props) {

    const [sending, setSending] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();

    const onFinish = async (values) => {
        setSending(true);
        const zip = await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_EXPORT, params).get();
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + zip.data; //Image Base64 Goes here
        a.download = zip.filename; //File name Here
        a.click();
        setSending(false);
    };

    return (
        <CaseHeaderContent>

            <div className="row center-xs">
                <div className="col-xs-12 col-md-6 ta-l">
                    <Card
                        title="Exportar"
                        actions={[
                            <Button disabled={sending} onClick={() => form.submit() } type="primary">
                                { !sending ? <>
                                    <Icon icon="file-export" />&nbsp;Exportar
                                </> : <Spin /> }
                            </Button>
                        ]}
                    >
                        <Form
                            form={form}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            onFinish={onFinish}
                        >

                            <Form.Item
                                label="Apenas transcrições aprovadas"
                                name="only_approved_revisions"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                        </Form>
                    </Card>
                </div>
            </div>

        </CaseHeaderContent>
    );

}