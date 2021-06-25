import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import Label from '../../atoms/Label'
import { Avatar } from 'antd';

export default function Card (props) {

    const isEnabled = (feature) => props[feature] ? true : false;

    return (
        <div className="card card-button">
            <CardTitle title="Nome do projeto" icon="tags" />
            <CardContent>
                <Label>Funcionalidades</Label>
                <ul className="fa-ul">
                    <li className={ !isEnabled('audio_transcription') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-file-audio"></i></span>Transcrição de Áudio</li>
                    <li className={ !isEnabled('entity_detection') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-tags"></i></span>Detecção de Entidades</li>
                    <li className={ !isEnabled('paraphrase') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-quote-left"></i></span>Paráfrases</li>
                </ul>

                <Label>Usuários</Label>
                <Avatar.Group>
                    <Avatar size='small'>RD</Avatar>
                    <Avatar size='small'>ZB</Avatar>
                    <Avatar size='small'>CD</Avatar>
                </Avatar.Group>
            </CardContent>
        </div>
    );
}