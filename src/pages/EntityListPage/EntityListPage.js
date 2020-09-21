import React from 'react';
import PropTypes from 'prop-types';
import './EntityListPage.scss';
import Table from 'react-bootstrap/Table'
import {Link} from "react-router-dom";

const EntityListPage = () => (
  <div className="EntityListPage">
    <div className="container">
      <h1>Detecção de Entidades</h1>
  
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Texto</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
          <td><Link to={'/entity-detection/'+1}>Lorem ipsum dolor sit amet</Link></td>
          <td>Completo</td>
          <td>28/08/2020</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
);

EntityListPage.propTypes = {};

EntityListPage.defaultProps = {};

export default EntityListPage;
