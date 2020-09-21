import React from 'react';
import PropTypes from 'prop-types';
import './EntityDetailPage.scss';
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

var numbers = [0,1,2,3,4];

const EntityDetailPage = () => (
  <div className="EntityDetailPage">
    <div className="container">
      <h3>Detecção de Entidades</h3>
      <h1>Lorem ipsum dolor sit amet</h1>

      <div className="row entity-content">
        <div className="col-md-4">
          <ul className="entity-menu">
            <li><ProgressBar now={25} /></li>
            {
              numbers.map(el => <li><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ab veniam repudiandae reprehenderit iure quidem aperiam possimus facere nostrum, sit aliquam voluptate reiciendis molestiae quae eum cumque omnis repellendus ut?</span></li>)
            }
          </ul>
          
        </div>
        <div className="col-md text">
          Lorem ipsum dolor sit amet <span className="entity-label"><i class="fas fa-user"></i> consectetur adipisicing elit</span>. Placeat consequatur similique officiis excepturi laboriosam. Adipisci maxime quis ipsam consequuntur odio necessitatibus tempore nihil possimus? Minima dolore veniam illo perspiciatis quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat consequatur similique officiis excepturi laboriosam. Adipisci maxime quis ipsam consequuntur odio necessitatibus tempore nihil possimus? Minima dolore veniam illo perspiciatis quod?

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
);

EntityDetailPage.propTypes = {};

EntityDetailPage.defaultProps = {};

export default EntityDetailPage;
