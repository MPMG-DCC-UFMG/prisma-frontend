import { Spin, Tooltip } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ApiRequest } from '../../../services/apiRequestService';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';
import Icon from '../Icon';

export default function AudioPlayer(props) {

    const {file} = props;
    const audioFile = () => new UrlBuilder("files/"+file).get();
    const [ exists, setExists ] = useState(false);

    const checkExist = () => {
            ApiRequest.head(audioFile()).then(res => {
                setExists(true);
            }).catch(error => {
                console.error(error);
                setTimeout(() => {
                    checkExist();
                }, 3000);
            });
    }

    const allowDownload = () => props.allowDownload ? '' : "nodownload";

    useEffect(() => {
        setExists(false);
        checkExist();
    }, [file])

    return (<>
        { exists ? 
            <>
                <audio controls controlsList={allowDownload()} >
                    <source src={audioFile()} ></source>
                </audio>
                <Tooltip title={<p>
                    Altere a velocidade do áudio pressionando no seu teclado os números: <br />
                    1: 0,75x <br />
                    2: 1,00x <br />
                    3: 1,25x <br />
                    4: 1,75x <br />
                    5: 2,00x <br />
                </p>}>
                    <span><Icon icon="question-circle" /></span>
                </Tooltip>
            </>
        : 
            <div><Spin /> Convertendo áudio...</div>
        }
    </>)
}