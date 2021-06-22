import React from 'react';
import HeaderContent from '../../templates/headerContent';
import Label from '../../components/atoms/label';
import { Avatar } from 'antd';

export default function Case (props) {

    return (
        <div id="structure" className="App">
            <HeaderContent subtitle="Projeto de teste">
                <div className="row ">
                    <div className="col-xs-12 col-md-7">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam at odio deleniti nesciunt nobis reprehenderit voluptas quasi harum doloremque? Quis praesentium libero rerum recusandae sequi deleniti reprehenderit neque illo facilis!</p>
                    </div>
                    <div className="col-xs-12 col-md">
                        <Label>Usuários</Label>
                        <Avatar.Group>
                            <Avatar>RD</Avatar>
                            <Avatar>ZB</Avatar>
                            <Avatar>CD</Avatar>
                        </Avatar.Group>
                    </div>
                </div>
            </HeaderContent>
        </div>
    );

}