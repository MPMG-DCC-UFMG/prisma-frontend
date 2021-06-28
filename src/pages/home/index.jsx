import React from 'react';
import HeaderContent from '../../templates/HeaderContent';
import CardButton from '../../components/molecules/CardButton';
import CaseCard from '../../components/molecules/CaseCard';
import { Link } from 'react-router-dom';

export default function Home (props) {

    return (
        <HeaderContent subtitle="Casos">
            <div className="row">
                <div className="col-xs-12 col-md-3">
                    <Link to="/case/new">
                        <CardButton icon="plus" label="Novo Caso" />
                    </Link>
                </div>
                <div className="col-xs-12 col-md-3">
                    <Link to="/case/123">
                        <CaseCard audio_transcription paraphrase />
                    </Link>
                </div>
            </div>
        </HeaderContent>
    );

}