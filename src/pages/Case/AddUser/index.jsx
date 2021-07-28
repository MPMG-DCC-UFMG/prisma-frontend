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

export default function CaseAddUser (props) {

    const [options, setOptions] = useState([]);
    const currentCase = useSelector(state => state.case.currentCase);
    const param = useParams();
    const dispatch = useDispatch();

    const map = (opt) => ({ label: opt.name, value: opt.id})

    const filteredOptions = () => _.differenceBy(options, currentCase?.users.map(map), 'value');

    const loadAllUsers = async () => {
        const data = await ApiRequest.setUrl(BaseUrls.USERS, {}).get();
        setOptions( data.map(map));
    }

    const onChange = (value) => {
        addUser(value.value);
    }

    const addUser = async (userId) => {
        await ApiRequest.setUrl(BaseUrls.PROJECT_USER, {projectId: param.projectId, userId}).post(null, null);
        dispatch(fetchCaseById(param.projectId));
        message.success("Usuário vinculado com sucesso!", 5);
    }

    const removeUser = async (userId) => {
        await ApiRequest.setUrl(BaseUrls.PROJECT_USER, {projectId: param.projectId, userId}).delete(null);
        dispatch(fetchCaseById(param.projectId));
        message.success("Usuário desvinculado com sucesso!", 5);
    }

    useEffect(() => {
        loadAllUsers();
    }, [])

    return (
        <CaseHeaderContent>
            <div className="row center-xs">
                <div className="col-xs-12 col-md-6 ta-l">
                    <Card title="Vincular usuários" icon="users">
                        <Select
                            style={{ width: '100%' }}
                            labelInValue
                            filterOption={false}
                            options={filteredOptions()}
                            onChange={onChange}
                            />
                        <Divider orientation="left">Usuários vinculados</Divider>
                        
                        <List 
                            itemLayout="horizontal"
                            dataSource={currentCase?.users}
                            renderItem={item => (
                              <List.Item
                                actions={[
                                    <a onClick={() => removeUser(item.id)} className="color-danger"><Icon icon="trash" /></a>
                                ]}
                              >
                                <List.Item.Meta
                                  avatar={<UserAvatar user={item} />}
                                  title={item.name}
                                />
                              </List.Item>
                            )}
                        />

                    </Card>


                </div>
            </div>
        </CaseHeaderContent>
    );

}