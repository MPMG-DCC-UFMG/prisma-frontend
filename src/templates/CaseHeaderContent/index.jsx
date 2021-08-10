import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseById } from '../../reducers/cases';
import HeaderContent from '../HeaderContent';
import { Spin, Avatar, Tooltip } from 'antd';
import Label from '../../components/atoms/Label';
import UserAvatar from '../../components/atoms/Avatar';
import nl2br from 'react-nl2br';

export default function CaseHeaderContent(props) {

    const { projectId } = useParams();
    const currentCase = useSelector(state => state.case.currentCase);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentCase || currentCase.id != projectId) {
            dispatch(fetchCaseById(projectId));
        }
    }, []);

    const extras = (<>
        <div className="col-xs-6 truncate">
            <Tooltip title={nl2br(currentCase?.description)}>
                { currentCase?.description }
            </Tooltip>
        </div>
        <div className="col-xs-2 ta-r">
            <Label>Usuários</Label>
            {currentCase?.users.length ? "" : "Nenhum usuário vinculado"}
            <Avatar.Group>
                {currentCase?.users.map(user => <UserAvatar key={user.id} user={user} tooltip={true} />)}
            </Avatar.Group>
        </div>
    </>)

    return (
        <HeaderContent linkTo={`/case/${currentCase?.id}/detail`} subtitle={currentCase?.name} color={currentCase?.color} extras={extras}>
            {!currentCase ? <div className="ta-c"><Spin size="large" /></div> : props.children}
        </HeaderContent>
    );

}