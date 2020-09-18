import React from 'react';
import PropTypes from 'prop-types';
import './Irregularities.scss';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom";

const Irregularities = () => {

  const history = useHistory();

  function changePage(destiny) {
    history.push(destiny);
  }
  
  return (
  <div className="Irregularities">
  
    <h2>Identificação de irregularidades em licitações</h2>

    <div className="filter">
      <a href="teste"><i class="fas fa-filter"></i> Filtrar</a>
      <span>
        <strong>Modalidade: </strong>
        Concorrência, Concurso, leilão
        <i class="fa-lg fas fa-times-circle"></i>
      </span>
      <span>
        <strong>Modalidade: </strong>
        Concorrência, Concurso, leilão
        <i class="fa-lg fas fa-times-circle"></i>
      </span>
    </div>

    <div className="block">
      <div className="row">
  
        { [1,2,3,4,5].map(v=>
        <div className="col-xs-12 col-md">
          <Card className="number-cards">
            <Card.Header>Licitações</Card.Header>
            <Card.Body>50.275</Card.Body>
          </Card>
        </div>
        )}
  
      </div>
    </div>

    <div className="block">
      <Card>
        <Card.Header>Detalhamento das Licitações</Card.Header>
        <Card.Body>

        <Table hover>
          <thead>
            <tr>
              <th>Licitação</th>
              <th>Processo</th>
              <th>Valor</th>
              <th>Município</th>
              <th>Funções</th>
              <th>Ano</th>
              <th>Ranking</th>
              <th>T1</th>
              <th>T2</th>
              <th>T3</th>
              <th>T4</th>
              <th>T5</th>
              <th>T6</th>
              <th>T7</th>
              <th>T8</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={()=> changePage("/details") }>
              <td>8534</td>
              <td>125300025</td>
              <td>R$ 999,00</td>
              <td>Belo Horizonte</td>
              <td>Saúde</td>
              <td>2015</td>
              <td>12</td>
              <td>2</td>
              <td>3</td>
              <td>7</td>
              <td>2</td>
              <td>0</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
          </tbody>
          </Table>
          
        </Card.Body>
      </Card>
    </div>
  
  </div>
)};

Irregularities.propTypes = {};

Irregularities.defaultProps = {};

export default Irregularities;
