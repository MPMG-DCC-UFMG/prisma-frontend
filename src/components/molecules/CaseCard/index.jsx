import React from 'react';
import { CardContent, CardTitle } from '../../atoms/Card'
import Label from '../../atoms/Label'
import { Avatar, Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserAvatar from '../../atoms/Avatar';

export default function Card (props) {
    const { data } = props;
    const isEnabled = (feature) => data[`has_${feature}`];

    const menu = (
        <Menu>
            <Link to={`/case/${data.id}`}>
                <Menu.Item>
                    Editar caso
                </Menu.Item>
            </Link>
            <Link to={`/case/${data.id}/users`}>
                <Menu.Item>
                    Vincular Usuários
                </Menu.Item>
            </Link>
        </Menu>
    )

    return (
        <div className="card card-button">
            <CardTitle title={data.name} icon={data.icon} color={data.color} menu={menu} />
            <CardContent>
                <Label>Funcionalidades</Label>
                <ul className="fa-ul">
                    <li className={ !isEnabled('audio_transcription') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-file-audio"></i></span>Transcrição de Áudio</li>
                    <li className={ !isEnabled('entities_detection') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-tags"></i></span>Detecção de Entidades</li>
                    <li className={ !isEnabled('paraphrases') ? 'disabled' : '' }><span className="fa-li"><i className="fas fa-quote-left"></i></span>Paráfrases</li>
                </ul>

                <Label>Usuários</Label>
                <Avatar.Group maxCount="10">
                    { data.users.map( user => <UserAvatar key={user.id} size="small" user={user} tooltip={true} /> )}
                </Avatar.Group>
            </CardContent>
        </div>
    );
}