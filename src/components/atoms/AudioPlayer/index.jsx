import React from 'react';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';

export default function AudioPlayer(props) {

    const {file} = props;
    const audioFile = () => new UrlBuilder("files/"+file).get();

    return (
        <audio controls >
            <source src={audioFile()} ></source>
        </audio>
    )
}