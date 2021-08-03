import { Spin } from 'antd';
import { set } from 'lodash';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ApiRequest } from '../../../services/apiRequestService';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';

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
        checkExist();
    }, [])

    return (<>
        { exists ? 
            <audio controls controlsList={allowDownload()} >
                <source src={audioFile()} ></source>
            </audio>
        : 
            <div><Spin /> Convertendo áudio...</div>
        }
    </>)
}