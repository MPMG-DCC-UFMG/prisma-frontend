import React from 'react';
import PropTypes from 'prop-types';
import './EntityLabel.scss';
import entities from '../../assets/entities.json';

const EntityLabel = (props) => {

  function getEntityInfo(props){
    let _label = props.data.entity.label;
    var e = entities.find(v=>v.label==_label);
    return e;
  }

  return (
    <span 
      className="entity-label" 
      onClick={(e)=>props.clickLabel(props.data.index, e)}
      style={ getEntityInfo(props) ? {backgroundColor: getEntityInfo(props).color } : {}}
      >
        { getEntityInfo(props) ? <i className={getEntityInfo(props).icon}></i> : null }
        { props.data.text }
    </span>
)};

EntityLabel.propTypes = {};

EntityLabel.defaultProps = {};

export default EntityLabel;
