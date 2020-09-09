import React from 'react';
import PropTypes from 'prop-types';
import './AudioDetailPage.scss';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AudioDetailPage = () => (
  <div className="AudioDetailPage">
    <div className="container">
      <h3>Transcrição de Áudio</h3>
      <h1>audio_de_teste.mp3</h1>

      <audio controls>
        <source src="https://previews.customer.envatousercontent.com/files/303339040/preview.mp3" type="audio/mp3"></source>
        Seu navegador não suporta áudio
      </audio>

      <hr />

      <Form.Group>
        <Form.Label>Transcrição</Form.Label>
        <Form.Control as="textarea" rows="5" />
      </Form.Group>

      <Button variant="success">Salvar Alterações</Button>

    </div>
  </div>
);

AudioDetailPage.propTypes = {};

AudioDetailPage.defaultProps = {};

export default AudioDetailPage;
