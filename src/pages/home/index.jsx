import React from 'react';
import HeaderContent from '../../templates/headerContent';
import CardButton from '../../components/molecules/cardButton';
import CaseCard from '../../components/molecules/caseCard';
import { Link } from 'react-router-dom';

export default function Home (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Casos">
                <div className="row">
                    <div className="col-xs-12 col-md-3">
                        <CardButton icon="plus" label="Novo Caso" />
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <Link to="/case/123">
                            <CaseCard audio_transcription paraphrase />
                        </Link>
                    </div>
                </div>
            </HeaderContent>
        </div>
    );

}