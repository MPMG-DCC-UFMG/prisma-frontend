import React from 'react';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import Card from '../../../components/molecules/Card';
import { Button, Input, List, Spin, Steps } from 'antd';
import { UploadUrlBuilder } from '../../../services/urlBuilder/uploadUrlBuilder';
import { ApiRequest } from '../../../services/apiRequestService';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.scss';
import AudioPlayer from '../../../components/atoms/AudioPlayer';
import If from '../../../components/atoms/If';
import BaseUrls from '../../../utils/baseUrls';
import { useHistory, useParams } from 'react-router-dom';

const { Step } = Steps;

const fixFileName = (name) => name.replace(/\.[^/.]+$/, "").replace(/_/g, ' ').replace(/-/g, ' ');

const mapFileList = (fileList) => 
    fileList.filter(file => file.response).map(file => ({name: fixFileName(file.name), file: file.response.url}))

export function SelectFiles(props) {

    return (
        <Dragger 
            accept="audio/*"
            action={new UploadUrlBuilder().get()} 
            headers={ ApiRequest.headers }
            multiple={ true }
            onChange = {(info) => {
                props.setFiles(mapFileList(info.fileList));
            }}
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

export function FilesForm(props) {

    const {files, setFiles} = props;

    const handleFileName = (ev, i) => {
        let f = [...files];
        f[i].name = ev.target.value;
        setFiles(f);
    }

    return (<>
        { files.map((file, index) => (<div className="row middle-xs list-item">
        <div className="col-md-4">
                <AudioPlayer file={file.file} />
            </div>
            <div className="col-md">
                <Input onChange={(ev) => handleFileName(ev, index)} placeholder="Nome do arquivo" value={file.name} />
            </div>
        </div> )) }
    </>)
}

export default function AudioTranscriptionAddFiles (props) {

    const [files, setFiles] = useState([]);
    const [sending, setSending] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const stepsLength = 2;
    const params = useParams();
    const history = useHistory();

    const handleVisibility = (i) => currentStep!==i ? 'd-n' : '';

    const sendFiles = async () => {
        setSending(true);
        files.forEach(async (file) => { 
            await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_UPLOAD, params).post(null, file);
        });
        setSending(false);
        history.push(`/case/${params.projectId}/audio-transcription`);
    }

    return (
        <CaseHeaderContent>

            <Card title="Inserir novos arquivos de áudio" icon="upload">
                <Steps current={currentStep}>
                    <Step title="Selecionar arquivos" />
                    <Step title="Cadastrar arquivos" />
                </Steps>

                <div className="mt-2 mb-1">
                    <div className={handleVisibility(0)}>
                        <SelectFiles files={files} setFiles={setFiles} {...props} />
                    </div>
                    <div className={handleVisibility(1)}>
                        <FilesForm files={files} setFiles={setFiles} {...props} />
                    </div>
                </div>

                <div className="row">
                    <If condition={currentStep>0}>
                        <div className="col-xs">
                            <Button onClick={() => setCurrentStep(currentStep-1)} type="default">Voltar</Button>
                        </div>
                    </If>
                    <If condition={currentStep<stepsLength-1}>
                        <div className="col-xs ta-r">
                            <Button disabled={files.length==0} onClick={() => setCurrentStep(currentStep+1)} type="primary">Avançar</Button>
                        </div>
                    </If>
                    <If condition={currentStep===stepsLength-1}>
                        <div className="col-xs ta-r">
                            <Button disabled={sending} onClick={sendFiles} type="primary">{ sending ? <Spin /> : "Salvar" }</Button>
                        </div>
                    </If>
                </div>

            </Card>

        </CaseHeaderContent>
    );

}