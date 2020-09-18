import React from 'react';
import PropTypes from 'prop-types';
import './BiddingDetails.scss';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link, useHistory } from "react-router-dom";

import BarChart from '../../components/BarChart/BarChart';

const BiddingDetails = () => {

  const history = useHistory();

  function changePage(destiny) {
    history.push(destiny);
  }
  
  return (
  <div className="BiddingDetails">
    <div className="row">
      <div className="col-xs">
        <h2>Detalhamento da Licitação</h2>
      </div>
      <div className="col-xs-4 col-md-2 text-right">
        <Link to="/">
          <Button variant="outline-primary">Voltar</Button>
        </Link>
      </div>
    </div>

    <div className="block">
      <Tabs defaultActiveKey="geral" id="uncontrolled-tab-example">
        <Tab eventKey="geral" title="Geral">
          <div className="block">
  
            <div className="row">

              <div className="col-md-3 col-xs-12">
                <Card>
                  <Card.Header>Informações Gerais</Card.Header>
                  <Card.Body>
                    <dl>
                      <dt>Licitação</dt>
                      <dd>3245</dd>
    
                      <dt>Modalidade</dt>
                      <dd>Concurso</dd>
                      
                      <dt>Município</dt>
                      <dd>Governador Valadares</dd>
    
                      <dt>Esfera</dt>
                      <dd>M</dd>
                      
                      <dt>População</dt>
                      <dd>123.456</dd>
                      
                      <dt>Microrregião</dt>
                      <dd>Governador Valadares</dd>
                      
                      <dt>Mesorregião</dt>
                      <dd>MG</dd>
                      
                      <dt>Ano</dt>
                      <dd>2000</dd>
    
                    </dl>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-3 col-xs-12">

                <Card>
                  <Card.Header>Vencedores</Card.Header>
                  <Card.Body>
                    <ul className="list clickable with-color">
                      <li onClick={()=> changePage("/bidder-details") } className="color-1">
                        157.321
                      </li>
                      <li onClick={()=> changePage("/bidder-details") } className="color-2">
                        157.321
                      </li>
                      <li onClick={()=> changePage("/bidder-details") } className="color-3">
                        157.321
                      </li>
                    </ul>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Header>Participantes</Card.Header>
                  <Card.Body>
                    <ul className="list clickable with-color">
                      <li onClick={()=> changePage("/bidder-details") } className="color-7">
                        157.321
                      </li>
                      <li onClick={()=> changePage("/bidder-details") } className="color-8">
                        157.321
                      </li>
                      <li onClick={()=> changePage("/bidder-details") } className="color-9">
                        157.321
                      </li>
                      <li onClick={()=> changePage("/bidder-details") } className="color-13">
                        157.321
                      </li>
                    </ul>
                  </Card.Body>
                </Card>

              </div>

              <div className="col-md col-xs-12">

                <Card>
                  <Card.Header>Recursos alocados por vencedor</Card.Header>
                  <Card.Body>
                    <BarChart id="1" />
                  </Card.Body>
                </Card>

                
                <Card className="mt-4">
                  <Card.Header>Recursos alocados por vencedor</Card.Header>
                  <Card.Body>
                    <BarChart id="2" />
                  </Card.Body>
                </Card>

              </div>

            </div>
  
          </div>
        </Tab>
        <Tab eventKey="irregularidades" title="Irregularidades">
          <div className="block">
            <div className="row">
              <div className="col-md-4 col-xs-12">
                <Card className="mt-4">
                  <Card.Header>Telefones em Comum</Card.Header>
                  <Card.Body>
                    <ul className="list with-color">

                      <li className="color-7">
                        <div className="row middle-xs">
                          <div className="col-xs-3">
                            157.321
                          </div>
                          <div className="col-xs">
                            <span className="irregularity-pill color-1"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                            <span className="irregularity-pill color-2"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                          </div>
                        </div>
                      </li>

                      <li className="color-1">
                        <div className="row middle-xs">
                          <div className="col-xs-3">
                            157.321
                          </div>
                          <div className="col-xs">
                            <span className="irregularity-pill color-1"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                            <span className="irregularity-pill color-3"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                          </div>
                        </div>
                      </li>

                      <li className="color-4">
                        <div className="row middle-xs">
                          <div className="col-xs-3">
                            157.321
                          </div>
                          <div className="col-xs">
                            <span className="irregularity-pill color-3"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                            <span className="irregularity-pill color-2"><span className="irregularity-pill-content">(31) 9999-9999</span></span>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>

  </div>
)};

BiddingDetails.propTypes = {};

BiddingDetails.defaultProps = {};

export default BiddingDetails;
