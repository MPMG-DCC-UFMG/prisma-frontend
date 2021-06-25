import React from 'react';
import HeaderContent from '../../templates/HeaderContent';
import Icon from '../../components/atoms/Icon';
import { Button, Divider, Collapse, List } from 'antd';
import AudioTranscriptionAnnotation from '../../components/molecules/AudioTranscriptionAnnotation';

export default function Paraphrase (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Projeto de teste" color="HEX">


                <Divider orientation="left">Texto original</Divider>

                <p className="fz-1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</p>

                <Divider orientation="left">Paráfrases</Divider>

                <List
                    footer={(
                        <div>
                            <Button className="mr-2" type="primary">
                                <Icon icon="plus mr-1" /> Adicionar paráfrase
                            </Button>
                        </div>
                    )}
                    dataSource={['','','']}
                    renderItem={item => <AudioTranscriptionAnnotation />}
                />


            </HeaderContent>
        </div>
    );

}