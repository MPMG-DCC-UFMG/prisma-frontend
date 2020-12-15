import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './AudioListPage.scss';
import Table from 'react-bootstrap/Table'
import {Link} from "react-router-dom";
const axios = require('axios').default;

const AudioListPage = () => {

  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(()=>{
    LoadData();
  }, mounted);

  function LoadData(){
    axios.get("audioTranscriptions").then((res)=>{
    setMounted(true);
    setData(res.data);
    });
  }

  function getFilename(filename){
    filename = filename.split('/');
    filename = filename[filename.length-1];
    return filename;
  }
  
  return(
  <div className="AudioListPage">
    <div className="container">
      <h1>Transcrição de Áudio</h1>
  
      <Table striped hover>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Transcrição</th>
            <th>Corrigida</th>
          </tr>
        </thead>
        <tbody>
          { (data || []).map(v=>
          <tr>
            <td><Link to={'/audio-transcription/edit?file='+v.hdfs_path}>{ getFilename(v.hdfs_path) }</Link></td>
            <td><Link to={'/audio-transcription/edit?file='+v.hdfs_path}>{ v.transcricao }</Link></td>
            <td>{ v.tem_correcoes ? "Sim" : "Não" }</td>
          </tr>
          )}
        </tbody>
      </Table>

      { !data ? 
      <div className="text-center">
        <i class="fas fa-sync fa-spin"></i> Carregando
      </div>
      : null 
      }
    </div>
  </div>
)};

AudioListPage.propTypes = {};

AudioListPage.defaultProps = {};

export default AudioListPage;
