import { Button, Card, Form, Spin, Switch } from 'antd';
import React from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Icon from '../../../components/atoms/Icon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function ImageTranscriptionExport(props) {

    const [sending, setSending] = useState(false);
    const [files, setFiles] = useState();
    const [form] = Form.useForm();
    const params = useParams();

    const onFinish = async (values) => {
        setSending(true);
        const zip = await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_EXPORT, params).get();
        setFiles(zip);
        setSending(false);
    };

    const downloadPath = (file) => process.env.REACT_APP_HOST + "files/temp/" + file;

    return (
        <CaseHeaderContent>

            <div className="row center-xs">
                <div className="col-xs-12 col-md-6 ta-l">
                    <Card
                        title="Exportar"
                        actions={[
                            <Button disabled={sending} onClick={() => form.submit()} type="primary">
                                {!sending ? <>
                                    <Icon icon="file-export" />&nbsp;Exportar
                                </> : <Spin />}
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

                            {files ? <>
                                <h3>Arquivos gerados, faça download abaixo:</h3>
                                <ul>
                                    {files.map(file => <li>
                                        <a href={downloadPath(file)}>{file}</a>
                                    </li>)}
                                </ul>
                            </> : null}

                        </Form>
                    </Card>
                </div>
            </div>

        </CaseHeaderContent>
    );

}