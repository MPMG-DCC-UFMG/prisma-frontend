import React from 'react';
import PropTypes from 'prop-types';
import './AudioListPage.scss';
import Table from 'react-bootstrap/Table'
import {Link} from "react-router-dom";

const AudioListPage = () => (
  <div className="AudioListPage">
    <div className="container">
      <h1>Transcrição de Áudio</h1>
  
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do Arquivo</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
          <td><Link to={'/audio-transcription/'+1}>audio_de_teste.mp3</Link></td>
          <td>Completo</td>
          <td>28/08/2020</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
);

AudioListPage.propTypes = {};

AudioListPage.defaultProps = {};

export default AudioListPage;
