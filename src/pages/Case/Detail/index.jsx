import React from 'react';
import { Avatar, Empty } from 'antd';
import Label from '../../../components/atoms/Label';
import AudioTranscriptionCard from '../../../components/molecules/AudioTranscriptionCard'
import EntityDetectionCard from '../../../components/molecules/EntityDetectionCard';
import ParaphraseCard from '../../../components/molecules/ParaphraseCard';
import { useSelector } from 'react-redux';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import UserAvatar from '../../../components/atoms/Avatar';
import ClassificationCard from '../../../components/molecules/ClassificationCard';

export default function CaseDetail(props) {

    const currentCase = useSelector(state => state.case.currentCase);

    return (
        <CaseHeaderContent>
            {currentCase ? (<>
                {currentCase.open ?
                    <div className="row mt-1">

                        {currentCase.has_audio_transcription ? (
                            <div className="col-xs">
                                <AudioTranscriptionCard currentCase={currentCase} />
                            </div>
                        ) : null}

                        {currentCase.has_classification ? (
                            <div className="col-xs">
                                <ClassificationCard currentCase={currentCase} />
                            </div>
                        ) : null}

                        {currentCase.has_entities_detection ? (
                            <div className="col-xs">
                                <EntityDetectionCard currentCase={currentCase} />
                            </div>
                        ) : null}

                        {currentCase.has_paraphrases ? (
                            <div className="col-xs">
                                <ParaphraseCard currentCase={currentCase} />
                            </div>
                        ) : null}

                    </div>
                    :
                    <Empty description="CASO FECHADO" image="https://cdn4.iconfinder.com/data/icons/internet-security-flat-2/32/Internet_Security_folder_Archive_lock_locked_private-256.png" ></Empty>
                }
            </>) : null}
        </CaseHeaderContent>
    );

}