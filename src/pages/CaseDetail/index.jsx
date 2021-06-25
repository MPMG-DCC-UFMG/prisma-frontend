import React from 'react';
import { Avatar } from 'antd';
import HeaderContent from '../../templates/HeaderContent';
import Label from '../../components/atoms/Label';
import AudioTranscriptionCard from '../../components/molecules/AudioTranscriptionCard'
import EntityDetectionCard from '../../components/molecules/EntityDetectionCard';
import ParaphraseCard from '../../components/molecules/ParaphraseCard';

export default function CaseDetail (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Projeto de teste" color="HEX">
                <div className="row ">
                    <div className="col-xs-12 col-md-7">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam at odio deleniti nesciunt nobis reprehenderit voluptas quasi harum doloremque? Quis praesentium libero rerum recusandae sequi deleniti reprehenderit neque illo facilis!</p>
                    </div>
                    <div className="col-xs-12 col-md ta-r">
                        <Label>Usuários</Label>
                        <Avatar.Group>
                            <Avatar>RD</Avatar>
                            <Avatar>ZB</Avatar>
                            <Avatar>CD</Avatar>
                        </Avatar.Group>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-xs">
                        <AudioTranscriptionCard />
                    </div>
                    <div className="col-xs">
                        <EntityDetectionCard />
                    </div>
                    <div className="col-xs">
                        <ParaphraseCard />
                    </div>
                </div>
            </HeaderContent>
        </div>
    );

}