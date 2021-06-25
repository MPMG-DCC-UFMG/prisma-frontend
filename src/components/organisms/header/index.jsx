import React from 'react';
import Logo from '../../../assets/logo.svg';
import './styles.scss';
import { Link } from 'react-router-dom';

export default function Header (props) {

    return (
        <header id="header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        <h1>
                            <Link to="/"><img src={Logo} alt="" />
                            Software de Anotação
                            </Link>
                        </h1>
                    </div>
                    <div className="col-xs-6"></div>
                </div>
                <div className="user">

                </div>
            </div>
        </header>
    );

}