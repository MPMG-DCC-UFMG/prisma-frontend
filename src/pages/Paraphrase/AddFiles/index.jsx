import React from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Card from '../../../components/molecules/Card';
import { Button, Input, Select, Spin, Steps, Tooltip } from 'antd';
import { UploadUrlBuilder } from '../../../services/urlBuilder/uploadUrlBuilder';
import { ApiRequest } from '../../../services/apiRequestService';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.scss';
import If from '../../../components/atoms/If';
import BaseUrls from '../../../utils/baseUrls';
import { useHistory, useParams } from 'react-router-dom';

const { Step } = Steps;


const mapFileList = (fileList) => {
    return fileList
        .filter(file => file.response)
        .map(file => ({
            file: file.response.url
        }))
}

export function SelectFiles(props) {

    return (
        <Dragger
            accept=".json"
            action={new UploadUrlBuilder().get()}
            headers={ApiRequest.headers}
            onChange={(info) => {
                props.setFiles(mapFileList(info.fileList));
            }}
            multiple={true}
            {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique ou arraste arquivos para esta área para fazer o upload</p>
            <p className="ant-upload-hint">
                Você pode enviar um ou mais arquivos.
            </p>
        </Dragger>
    )
}


export default function ParaphraseAddFiles(props) {

    const [files, setFiles] = useState([]);
    const [sending, setSending] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const params = useParams();
    const history = useHistory();

    const handleVisibility = (i) => currentStep !== i ? 'd-n' : '';

    const sendFiles = async () => {
        setSending(true);
        files.forEach(async (file) => {
            await ApiRequest.setUrl(BaseUrls.PARAPHRASE_UPLOAD, params).post(null, file);
        });
        setTimeout(() => {
            history.push(`/case/${params.projectId}/paraphrase`);
            setSending(false);
        }, 1000)
    }

    return (
        <CaseHeaderContent>

            <Card title="Inserir novos documentos" icon="upload">
                <Steps current={currentStep}>
                    <Step title="Selecionar arquivos" />
                </Steps>

                <div className="mt-2 mb-1">
                    <div className={handleVisibility(0)}>
                        <SelectFiles files={files} setFiles={setFiles} {...props} />
                    </div>
                </div>

                <div className="row">
                    <If condition={currentStep > 0}>
                        <div className="col-xs">
                            <Button onClick={() => setCurrentStep(currentStep - 1)} type="default">Voltar</Button>
                        </div>
                    </If>
                    <div className="col-xs ta-r">
                        <Button disabled={sending} onClick={sendFiles} type="primary">{sending ? <Spin /> : "Salvar"}</Button>
                    </div>
                </div>

            </Card>

        </CaseHeaderContent>
    );

}