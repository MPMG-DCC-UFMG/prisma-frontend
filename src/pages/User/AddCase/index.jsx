import { Card, Divider, List, Select, message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserAvatar from '../../../components/atoms/Avatar';
import { ApiRequest } from '../../../services/apiRequestService';
import CaseHeaderContent from '../../../templates/CaseHeaderContent';
import BaseUrls from '../../../utils/baseUrls';
import { fetchCaseById } from '../../../reducers/cases';
import _ from "lodash";
import Icon from '../../../components/atoms/Icon';
import HeaderContent from '../../../templates/HeaderContent';
import Avatar from 'antd/lib/avatar/avatar';
import { ColorService } from '../../../services/colorService';

export default function UserAddCase (props) {

    const [options, setOptions] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const param = useParams();
    const dispatch = useDispatch();

    const map = (opt) => ({ label: opt.name, value: opt.id})

    const filteredOptions = () => _.differenceBy(options, currentUser?.projects.map(map), 'value');
    const canRemove = (caseId) => _.intersectionBy(options, currentUser?.projects.map(map), 'value').some(project => project.value===caseId);

    const loadCurrentUser = async () => {
        const data = await ApiRequest.setUrl(BaseUrls.USER, param).get();
        setCurrentUser(data);
    }

    const loadAllProjects = async () => {
        const data = await ApiRequest.setUrl(BaseUrls.PROJECTS, {}).get();
        setOptions( data.map(map));
    }

    const onChange = (value) => {
        addUser(value.value);
    }

    const addUser = async (projectId) => {
        await ApiRequest.setUrl(BaseUrls.PROJECT_USER, {userId: param.userId, projectId}).post(null, null);
        loadCurrentUser();
        message.success("Caso vinculado com sucesso!", 5);
    }

    const removeUser = async (projectId) => {
        await ApiRequest.setUrl(BaseUrls.PROJECT_USER, {userId: param.userId, projectId}).delete(null);
        loadCurrentUser();
        message.success("Caso desvinculado com sucesso!", 5);
    }

    useEffect(() => {
        loadCurrentUser();
        loadAllProjects();
    }, [])

    return (
        <HeaderContent subtitle="Casos do usuário">
            <div className="row center-xs">
                <div className="col-xs-12 col-md-6 ta-l">
                    <Card title={`Vincular casos ao usuário ${currentUser?.name}`} icon="folder">
                        <Select
                            style={{ width: '100%' }}
                            labelInValue
                            filterOption={false}
                            options={filteredOptions()}
                            onChange={onChange}
                            />
                        <Divider orientation="left">Casos vinculados</Divider>
                        
                        <List 
                            itemLayout="horizontal"
                            dataSource={currentUser?.projects}
                            renderItem={item => (
                              <List.Item
                                actions={[
                                    canRemove(item.id) ? <a onClick={() => removeUser(item.id)} className="color-danger"><Icon icon="trash" /></a> : null
                                ]}
                              >
                                <List.Item.Meta
                                  avatar={<Avatar style={{backgroundColor: ColorService.getColor(item.color)}}><Icon color={item.color} icon={item.icon} /></Avatar>}
                                  title={item.name}
                                />
                              </List.Item>
                            )}
                        />

                    </Card>


                </div>
            </div>
        </HeaderContent>
    );

}