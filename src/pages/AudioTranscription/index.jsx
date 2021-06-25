import React from 'react';
import HeaderContent from '../../templates/HeaderContent';
import Icon from '../../components/atoms/Icon';
import { Button, Divider, Collapse, List } from 'antd';
import AudioTranscriptionAnnotation from '../../components/molecules/AudioTranscriptionAnnotation';

export default function AudioTranscription (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Projeto de teste" color="HEX">
                <h2>Arquivo de Teste.mp3</h2>
                <p>
                    <audio controls >
                        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg"></source>
                    </audio>
                </p>

                <Button className="mr-2" type="primary">
                    <Icon icon="plus mr-1" /> Adicionar Transcrição
                </Button>

                <Button>
                    <Icon icon="cut mr-1" /> Segmentar
                </Button>

                <Divider orientation="left">Segmentos</Divider>

                <Collapse>
                    { [1,2,3,4].map(i => (<Collapse.Panel header={'Segmento '+i}>

                        <p>
                            <audio controls >
                                <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg"></source>
                            </audio>
                        </p>

                        <Divider orientation="left">Anotações</Divider>

                        <List
                            footer={(
                                <div className="ta-c">
                                    <Button className="mr-2" type="primary">
                                        <Icon icon="plus mr-1" /> Adicionar anotação
                                    </Button>
                                </div>
                            )}
                            dataSource={['','','']}
                            renderItem={item => <AudioTranscriptionAnnotation />}
                        />

                    </Collapse.Panel> ))}
                </Collapse>

            </HeaderContent>
        </div>
    );

}