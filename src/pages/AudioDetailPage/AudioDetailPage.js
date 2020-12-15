import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './AudioDetailPage.scss';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const axios = require('axios').default;

const AudioDetailPage = () => {

	const [currentFile, setCurrentFile] = useState("");
	const [data, setData] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [newTranscription, setNewTranscription] = useState('');
	const [audioUrl, setAudioUrl] = useState(null);
  const [mounted, setMounted] = useState(false);
  
	React.useEffect(()=>{
    LoadAudioUrl();
    LoadData();
    setMounted(true);
  }, mounted);
  
  function LoadAudioUrl(){
    let file = (new URLSearchParams(window.location.search)).get("file");
    setCurrentFile(file);
		axios.get("audio?file="+file).then((res)=>{
			setAudioUrl(res.data.url);
		});
  }
  
  function LoadData(){
    let file = (new URLSearchParams(window.location.search)).get("file");
		axios.get("audioTranscription?file="+file).then((res)=>{
      setNewTranscription(res.data.transcricao.transcricao);
      setData(res.data);
		});
  }
  
  function getFilename(filename){
		filename = filename.split('/');
		filename = filename[filename.length-1];
		//filename = filename.split('.').slice(0, -1).join('.');
		return filename;
  }
  
  function SaveTranscriptions(){
    setShowForm(false);
    let file = (new URLSearchParams(window.location.search)).get("file");
    axios.post("audioTranscription?file="+file, {
      data: data.correcoes
    }).then((res)=>{});
  }

  function AddCorrection(){
    let d = {...data};
    d.correcoes.push({
      user_id: 'default',
      transcricao: newTranscription,
      timestamp: (new Date()).toISOString()
    });
    setData(d);
    SaveTranscriptions();
  }

  function RemoveCorrection(i){
    if(window.confirm("Tem certeza que deseja remover esta correção?")){
      let d = {...data};
      d.correcoes.splice(i, 1);
      setData(d);
      SaveTranscriptions();
    }
  }
  
  return (
  <div className="AudioDetailPage">
    <div className="container">
      <h3>Transcrição de Áudio</h3>
      <h1 className="truncate">{ getFilename(currentFile) }</h1>

      { audioUrl ? 
      <audio controls>
        <source src={audioUrl}></source>
        Seu navegador não suporta áudio
      </audio>
      : null }

      <hr className="my-4" />

      { data ?
      <React.Fragment>

        <h4>Transcrição</h4>
        <p className="original">{data.transcricao.transcricao}</p>

        <hr className="my-4"/>

        <h4>Correções Sugeridas</h4>

        <div className="lista-correcao">
          { data.correcoes.map((v,i)=>
          <div className="lista-correcao-item">
              <div className="row">
                <div className="col-xs">
                  <div className="info">
                    { (new Date(v.timestamp)).toLocaleDateString('pt-BR')+" às "+(new Date(v.timestamp)).toLocaleTimeString('pt-BR') }
                  </div>
                  {v.transcricao}
                </div>
                <div className="col-xs-1 text-right">
                  <a className="icon" onClick={()=>RemoveCorrection(i)}><i class="fas fa-trash"></i> </a>
                </div>
              </div>
          </div>
          )}
        </div>

        { data.correcoes.length==0 ?
        <div className="alert alert-info mt-3">
          Nenhuma correção sugerida
        </div>
        : null }

        { showForm ?
        <React.Fragment>
          <div className="form-group" mt-4>
            <label className="form-label">
              <strong>Nova Correção</strong>
            </label>
            <textarea 
              value={newTranscription} 
              onChange={(ev)=>setNewTranscription(ev.target.value)}
              name="newTranscription" 
              id="newTranscription" 
              rows="5" 
              className="form-control">
            </textarea>
          </div>
  
          <div className="row middle-xs">       
            <div className="col-md text-center">
              <Button className="mx-1" type="button" onClick={()=>setShowForm(false)} variant="outline-primary">Cancelar</Button>
              <Button className="mx-1" type="button" onClick={AddCorrection} variant="primary">Salvar</Button>
            </div>
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div className="row middle-xs">       
            <div className="col-md text-center">
              <Button type="button" onClick={()=>setShowForm(true)} variant="outline-primary">Adicionar Correção</Button>
            </div>
          </div>
        </React.Fragment>
        }


      </React.Fragment>
      : null }

    </div>
  </div>
)};

AudioDetailPage.propTypes = {};

AudioDetailPage.defaultProps = {};

export default AudioDetailPage;
