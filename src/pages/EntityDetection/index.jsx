import React from 'react';
import HeaderContent from '../../templates/HeaderContent';
import { List, Progress, Button, Divider } from 'antd';
import EntityDetectionSentenceMenu from '../../components/molecules/EntityDetectionSentenceMenu';

export default function EntityDetection (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Projeto de teste" color="HEX">
                <div className="row between-xs">

                    <div className="col-xs-12 col-md-4">
                        <Progress percent={30} showInfo={false} />
                        <List
                            dataSource={[
                                'O governo dos Estados Unidos emitiu um alerta sobre novas atividades hackers norte...',
                                'O grupo é notório por ter realizado ataques em mais de 30 países, inclusive no Brasil, mas...',
                                'O alerta é assinado pela Agência de Cibersegurança e Segurança de Infraestru...'
                            ]}
                            renderItem={item => <EntityDetectionSentenceMenu item={item} />}
                        >
                        </List>
                    </div>

                    <div className="col-xs-12 col-md-7">
                        <div className="text fz-1">
                            O governo dos Estados Unidos  emitiu um alerta sobre novas atividades hackers norte-coreanos especializados em atacar instituições financeiras. O grupo, chamado de BeagleBoyz , é indicado como responsável por um ataque batizado de FASTCash, em que o dinheiro é sacado de caixas eletrônicas ou movimentado por meio de transferências bancárias.
                        </div>

                        <Divider />

                        <div className="row between-xs">
                            <div className="col-xs">
                                <Button>Voltar</Button>
                            </div>
                            <div className="col-xs ta-c">
                                1/5
                            </div>
                            <div className="col-xs ta-r">
                                <Button type="primary">Avançar</Button>
                            </div>
                        </div>
                    </div>
                </div>

                
            </HeaderContent>
        </div>
    );

}