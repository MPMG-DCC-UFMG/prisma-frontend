import React from 'react';
import PropTypes from 'prop-types';
import './BidderDetails.scss';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import { Link, useHistory } from "react-router-dom";
import BarChart from '../../components/BarChart/BarChart';

const BidderDetails = () => (
  <div className="BidderDetails">
    
    <div className="row">
      <div className="col-xs">
        <h2>Detalhamento do Licitante</h2>
      </div>
      <div className="col-xs-4 col-md-2 text-right">
        <Link to="/details">
          <Button variant="outline-primary">Voltar</Button>
        </Link>
      </div>
    </div>

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
      
        <div className="col-md-4 col-xs-12">
          <Card>
            <Card.Header>Irregularidades identificadas em licitações por licitante</Card.Header>
            <Card.Body>
              <BarChart id="3" />
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-5 col-xs-12">
          <Card>
            <Card.Header>Licitações por Comarca para o Licitante</Card.Header>
            <Card.Body>
              <BarChart id="1" />
            </Card.Body>
          </Card>
          
          <Card className="mt-4">
            <Card.Header>Licitações por Regional de Patrimônio Público para o Licitante</Card.Header>
            <Card.Body>
              <BarChart id="2" />
            </Card.Body>
          </Card>

        </div>

      </div>
    </div>

  </div>
);

BidderDetails.propTypes = {};

BidderDetails.defaultProps = {};

export default BidderDetails;
