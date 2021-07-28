import React from 'react';
import { Avatar } from 'antd';
import Label from '../../../components/atoms/Label';
import AudioTranscriptionCard from '../../../components/molecules/AudioTranscriptionCard'
import EntityDetectionCard from '../../../components/molecules/EntityDetectionCard';
import ParaphraseCard from '../../../components/molecules/ParaphraseCard';
import { useSelector } from 'react-redux';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import nl2br from 'react-nl2br';
import UserAvatar from '../../../components/atoms/Avatar';

export default function CaseDetail (props) {

    const currentCase = useSelector(state => state.case.currentCase);

    return (
        <CaseHeaderContent>
            { currentCase ? (<>
                <div className="row ">
                    <div className="col-xs-12 col-md-7">
                        <p>{ nl2br(currentCase.description) }</p>
                    </div>
                    <div className="col-xs-12 col-md ta-r">
                        <Label>Usuários</Label>
                        <Avatar.Group>
                            { currentCase.users.map( user => <UserAvatar key={user.id} user={user} tooltip={true} /> )}
                        </Avatar.Group>
                    </div>
                </div>
                <div className="row mt-1">

                    { currentCase.has_audio_transcription ? (
                        <div className="col-xs">
                            <AudioTranscriptionCard currentCase={currentCase} />
                        </div>
                    ) : null }

                    { currentCase.has_entities_detection ? (
                        <div className="col-xs">
                            <EntityDetectionCard />
                        </div>
                    ) : null }

                    { currentCase.has_paraphrases ? (
                        <div className="col-xs">
                            <ParaphraseCard />
                        </div>
                    ) : null }

                </div>
            </>) : null }
        </CaseHeaderContent>
    );

}