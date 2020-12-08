import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './EntityListPage.scss';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import ProgressBar from 'react-bootstrap/ProgressBar'

import {Link} from "react-router-dom";
const axios = require('axios').default;

const EntityListPage = () => {

  const per_page = 100;
  const [currentPage, setCurrentPage] = useState(0);

  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(()=>{
    LoadData();
  }, mounted);

  function LoadData(){
    axios.get("entities").then((res)=>{
    setMounted(true);

    res.data.list = res.data.list.sort((a, b) => (a.progress > b.progress) ? 1 : -1);

    setData(res.data);
    });
  }

  function QtdPages(){
		if(!data) return 0;
		return Math.ceil(data.list.length/per_page)
  }
  
  function GetPaginatedContent(){
		if(!data) return [];
		return data.list.slice( currentPage*per_page, currentPage*per_page+per_page );
  }
  
  function ChangePage(page){
		setCurrentPage( page )
  }
  
  function NextPage(){
		setCurrentPage( Math.min(QtdPages()-1,  currentPage+1) );
	}

	function PrevPage(){
		setCurrentPage( Math.max(0, currentPage-1) )
	}
  
  return (
  <div className="EntityListPage">
    <div className="container">
      <h1>Detecção de Entidades</h1>
  
      { data ?
      <React.Fragment>
        <Table striped hover>
          <thead>
            <tr>
              <th>Texto</th>
              <th>Progresso</th>
            </tr>
          </thead>
          <tbody>
            { GetPaginatedContent().map(v=>
            <tr>
              <td><Link to={'/entity-detection/edit?file='+v.file}>{ v.name }</Link></td>
              <td>
                <ProgressBar now={v.progress} label={ Math.round(v.progress)+"%" }  />
              </td>
            </tr>
            ) }
          </tbody>
        </Table>

        <div className="text-center">
        <Pagination>
        <Pagination.First onClick={()=>ChangePage(0) } />
        <Pagination.Prev onClick={ PrevPage } />


        { [...Array( QtdPages() ).keys()].map(i=>
          <Pagination.Item active={ i===currentPage } onClick={()=>ChangePage(i) }>{i+1}</Pagination.Item>
        ) }

        <Pagination.Next onClick={ NextPage} />
        <Pagination.Last onClick={ ()=>ChangePage(QtdPages()-1)  } />
        </Pagination>
        </div>
      </React.Fragment>
      : 
        <div className="text-center">
					<i class="fas fa-sync fa-spin"></i> Carregando
        </div>
      }
    </div>
  </div>
)};

EntityListPage.propTypes = {};

EntityListPage.defaultProps = {};

export default EntityListPage;
