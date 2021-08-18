import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import LoggedUser from '../../molecules/LoggedUser';
import logo from '../../../assets/logo_dark.svg';

export default function Header (props) {

    return (
        <header id="header">
            <div className="container">
                <div className="row middle-xs">
                    <div className="col-xs-6">
                        <h1>
                            <Link to="/" title="PRISMA - Primeiro Software de Múltipla Anotação">
                                <img src={logo} alt="PRISMA - Primeiro Software de Múltipla Anotação" height="50" />
                            </Link>
                        </h1>
                    </div>
                    <div className="col-xs-6 ta-r">
                        <LoggedUser />
                    </div>
                </div>
                <div className="user">

                </div>
            </div>
        </header>
    );

}