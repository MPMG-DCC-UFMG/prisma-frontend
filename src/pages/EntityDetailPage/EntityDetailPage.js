import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './EntityDetailPage.scss';
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useParams } from "react-router-dom";
import entities from '../../assets/entities.json';
import EntityLabel from '../../components/EntityLabel/EntityLabel'

const axios = require('axios').default;

const EntityDetailPage = (props)=>{

	const [iData, setIData] = useState(0);
	const [data, setData] = useState(null);
	const [mounted, setMounted] = useState(false);
	const [currentSelection, setCurrentSelection] = useState();
	const [menuPosition, setMenuPosition] = useState({
		top: 0,
		left: 0,
		display: "none"
	});
	const [textEntities, setTextEntities] = useState([]);
	const [currentEntity, setCurrentEntity] = useState(-1);


	React.useEffect(()=>{
		LoadData();
	}, mounted);

	React.useEffect(()=>{
		ChangeSentence(0)
	}, data);

	function LoadData(){
		let file = (new URLSearchParams(window.location.search)).get("file");
		axios.get("entity?file="+file).then((res)=>{
			setMounted(true);
			setData(res.data);
		});
	}

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	function ChangeSentence(i){
		if(!data) return;

		i = Math.max(i, 0);
		i = Math.min(i, data.sentences.length-1);

		setIData(i);
		setMenuPosition({
			display: "none"
		});

		if(!data.sentences[i].annotations) {
			data.sentences[i].annotations = {
				user_id: "default",
				timestamp: (new Date()).toISOString(),
				entities: getUniqueListBy(data.sentences[i].entities, "start")
			};
		}
		setData(data);

	}

  	function clickLabel (i, e) {
		setCurrentEntity(i);
		setMenuPosition({
			top: e.clientY+"px",
			left: e.clientX+"px"
		});
	}

	function getListClass(index){
		let classes = [];
		
		if(data.sentences[index].annotations) classes.push("done");
		if(index==iData) classes.push("selected");
		
		return classes.join(" ");
	}

	function _onMouseUp() {
		var event = event || window.event;
		var selection = window.getSelection();
		console.log(selection);

		if(selection.type=="Range"){
			
			var offset = data.sentences[iData].text.indexOf(selection.baseNode.data);
			var curSel = {
				start: offset+Math.min(selection.baseOffset, selection.focusOffset),
				end: offset+Math.max(selection.baseOffset, selection.focusOffset),
				entity: selection.baseNode.data.substring(selection.baseOffset, selection.focusOffset)
			};
			console.log(curSel);

			setCurrentSelection(curSel);
			setCurrentEntity(-1);
			setMenuPosition({
				top: event.clientY+"px",
				left: event.clientX+"px"
			});

		} else {
			setMenuPosition({
				display: "none"
			});
		}

	}

	function _labeledText(){
		if(!data.sentences[iData].annotations) return [];
		var t = data.sentences[iData].text;
		var ent = data.sentences[iData].annotations.entities;
		ent = ent.sort((a, b) => (a.start > b.start) ? 1 : -1);

		var text = [];

		// Caso não tenha nenhuma entidade
		if(ent.length==0) return [{
			type: 'text',
			text: t
		}];

		// Caso a primeira entidade comece após a primeira string
		if(ent[0].start>0) text.push({
			type: 'text',
			text: t.substring(0, ent[0].start)
		});

		// Adiciona as tags
		for(let i=0; i<ent.length; i++){

			text.push({
				type: 'label',
				index: i,
				text: t.substring(ent[i].start, ent[i].end),
				entity: ent[i]
			});

			text.push({
				type: 'text',
				text: t.substring(ent[i].end, ent[i+1] ? ent[i+1].start : t.length)
			});

		}

		return text;
	}

	function _addEntity(_entity){
		
		var ent = data.sentences[iData].annotations.entities;
		console.log(currentSelection);

		if(currentEntity>=0) {
			ent[currentEntity].label = _entity.label;
		} else {
			ent.push({
				start: currentSelection.start,
				end: currentSelection.end,
				entity: currentSelection.entity,
				label: _entity.label,
			});
		}
		
		//ORDENA POR POSIÇÂO
		ent = ent.sort((a, b) => (a.start > b.start) ? 1 : -1);
		setTextEntities(ent);

		setMenuPosition({
			display: "none"
		});

  	}
  
	function _removeEntity(_entity){
		var ent = data.sentences[iData].annotations.entities;
		ent.splice(currentEntity, 1);

		//ORDENA POR POSIÇÂO
		ent = ent.sort((a, b) => (a.start > b.start) ? 1 : -1);
		setTextEntities(ent);

		setMenuPosition({
			display: "none"
		});
	  }
	  
	  function Save(){
		console.log(data);

		axios.post("entity", {
			file: (new URLSearchParams(window.location.search)).get("file"),
			data: data
		});

		Next();
	  }

	  function Next() {
		ChangeSentence(iData+1);
	  }

	  function Prev() {
		ChangeSentence(iData-1);
	  }

	  function CalcProgress(){
		  let count = 0;
		  data.sentences.forEach(el=>{ if(el.annotations) count++ });

		  return count/data.sentences.length*100;
	  }

	  function getFilename(filename){
		filename = filename.split('/');
		filename = filename[filename.length-1];
		filename = filename.split('.').slice(0, -1).join('.');
		return filename;
	  }

	return (
		<div className="EntityDetailPage">
			{ data ?
			<div className="container">
				<h3>Detecção de Entidades</h3>
				<h1 className="truncate">{ getFilename(data.file) }</h1>

				<ul className="entity-tag-menu" style={menuPosition}>
					{ entities.map(entity=> <li onClick={()=>_addEntity(entity)}><span style={ {color: entity.color} } className={entity.icon}></span> {entity.label} </li> ) }
          { currentEntity>=0 ? <li onClick={_removeEntity} className="remove"><i className="fas fa-fw fa-trash-alt"></i> REMOVER</li> : null }
				</ul>

				<div className="row entity-content">
					<div className="col-md-4">
						<div className="entity-menu-progress">
							<ProgressBar now={CalcProgress()} />
						</div>

						<ul className="entity-menu">
							{
								data.sentences.map((el, index) => <li className={getListClass(index)} onClick={()=>ChangeSentence(index)}><span>{el.text}</span></li>)
							}
						</ul>
						
					</div>
					<div className="col-md text">

						<div className="textSelect" onMouseUp={_onMouseUp} >
							{ _labeledText().map(v=>
								v.type=="label" ?
									<EntityLabel data={v} clickLabel={clickLabel} />
								: <span>{v.text}</span>
							) }
						</div>
						<hr />

						<div className="row middle-xs">

							<div className="col-md">
								<Button onClick={Prev} variant="outline-primary">Voltar</Button>
								<Button onClick={Save} className="ml-2" variant="outline-danger">Pular</Button>
							</div>

							<div className="col-md text-center">
								{ iData+1 }/{ data.sentences.length }
							</div>            

							<div className="col-md text-right">
								<Button onClick={Save} variant="outline-primary">Salvar e Avançar</Button>
							</div>

						</div>
					</div>
				</div>

			</div>
			: 
			<div className="text-center">
				<i class="fas fa-sync fa-spin"></i> Carregando
			</div>
			}
		</div>
	)};

EntityDetailPage.propTypes = {};

EntityDetailPage.defaultProps = {};

export default EntityDetailPage;
