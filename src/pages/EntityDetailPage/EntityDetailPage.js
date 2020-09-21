import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './EntityDetailPage.scss';
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

var numbers = [0,1,2,3,4];

var entities = [
	{
		label: "CPF",
		icon: "fas fa-fw fa-id-card",
		color: "#56C0E0"
	},
	{
		label: "PESSOA",
		icon: "fas fa-fw fa-user",
		color: "#1C7CD5"
	},
	{
		label: "CNPJ",
		icon: "fas fa-fw fa-building",
		color: "#F0AD4E"
	},
	{
		label: "ORGANIZACAO",
		icon: "fas fa-fw fa-tag",
		color: "#D9534F"
	},
	{
		label: "LOCAL",
		icon: "fas fa-fw fa-map-marker-alt",
		color: "#5CB85C"
	},
	{
		label: "TEMPO",
		icon: "fas fa-fw fa-clock",
		color: "#9E62D2"
	}
]

var text = "O governo dos Estados Unidos  emitiu um alerta sobre novas atividades hackers norte-coreanos especializados em atacar instituições financeiras. O grupo, chamado de BeagleBoyz , é indicado como responsável por um ataque batizado de FASTCash, em que o dinheiro é sacado de caixas eletrônicas ou movimentado por meio de transferências bancárias.";


const EntityDetailPage = ()=>{

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => {
      document.removeEventListener('click', handleClick, false);
    }
  }, [])

	const [currentSelection, setCurrentSelection] = useState();
	const [menuPosition, setMenuPosition] = useState({
		top: 0,
		left: 0,
		display: "none"
	});


	const [textEntities, setTextEntities] = useState([]);
	const [currentEntity, setCurrentEntity] = useState(-1);

  function handleClick (e) {
    if(e.target.className=="entity-label"){
      setCurrentEntity(parseInt(e.target.getAttribute("data-i")));
      setMenuPosition({
				top: e.clientY+"px",
				left: e.clientX+"px"
			});
    }

  }

	function _onMouseUp() {
		var event = event || window.event;
		var selection = window.getSelection();
		if(selection.type=="Range"){
			
			var offset = text.indexOf(selection.baseNode.data);
			setCurrentSelection({
				start: offset+Math.min(selection.baseOffset, selection.focusOffset),
				end: offset+Math.max(selection.baseOffset, selection.focusOffset),
			});

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

	function getEntitySpan(i){
    let _label = textEntities[i].label;
		var e = entities.find(v=>v.label==_label);
		if(e) {
			return "<span data-i='"+i+"' class='entity-label' style='background-color: "+e.color+"'><i class='"+e.icon+"'></i>";
		} else {
			return "<span>";
		}
	}

	function _labeledText(){
		var t = text;
		var ent = textEntities;
		ent = textEntities.sort((a, b) => (a.start > b.start) ? 1 : -1);

		for(let i=ent.length-1; i>=0; i--) {
			t = t.slice(0, ent[i].end) + "</span>" + t.slice(ent[i].end);
			t = t.slice(0, ent[i].start) + getEntitySpan(i) + t.slice(ent[i].start);
		}

		return t;
	}

	function _addEntity(_entity){
		
    var ent = textEntities;

    if(currentEntity>=0) {
      ent[currentEntity].label = _entity.label;
    } else {
      ent.push({
        start: currentSelection.start,
        end: currentSelection.end,
        label: _entity.label
      });
    }
    
    //ORDENA POR POSIÇÂO
    ent = textEntities.sort((a, b) => (a.start > b.start) ? 1 : -1);
    setTextEntities(ent);

		setMenuPosition({
			display: "none"
		});

  }
  
	function _removeEntity(_entity){
    var ent = textEntities;
    ent.splice(currentEntity, 1);

    //ORDENA POR POSIÇÂO
    ent = textEntities.sort((a, b) => (a.start > b.start) ? 1 : -1);
    setTextEntities(ent);

		setMenuPosition({
			display: "none"
		});
  }

	return (
		<div className="EntityDetailPage">
			<div className="container">
				<h3>Detecção de Entidades</h3>
				<h1>Lorem ipsum dolor sit amet</h1>

				<ul className="entity-tag-menu" style={menuPosition}>
					{ entities.map(entity=> <li onClick={()=>_addEntity(entity)}><span style={ {color: entity.color} } className={entity.icon}></span> {entity.label} </li> ) }
          { currentEntity>=0 ? <li onClick={_removeEntity} className="remove"><i className="fas fa-fw fa-trash-alt"></i> REMOVER</li> : null }
				</ul>

				<div className="row entity-content">
					<div className="col-md-4">
						<ul className="entity-menu">
							<li><ProgressBar now={25} /></li>
							{
								numbers.map(el => <li><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ab veniam repudiandae reprehenderit iure quidem aperiam possimus facere nostrum, sit aliquam voluptate reiciendis molestiae quae eum cumque omnis repellendus ut?</span></li>)
							}
						</ul>
						
					</div>
					<div className="col-md text" onMouseUp={_onMouseUp}>
							<div className="textSelect" dangerouslySetInnerHTML={{__html: _labeledText()}} >
							</div>
							<hr />

						<div className="row middle-xs">

							<div className="col-md">
								<Button variant="outline-primary">Voltar</Button>
							</div>

							<div className="col-md text-center">
								1/4
							</div>            

							<div className="col-md text-right">
								<Button variant="outline-primary">Avançar</Button>
							</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	)};

EntityDetailPage.propTypes = {};

EntityDetailPage.defaultProps = {};

export default EntityDetailPage;
