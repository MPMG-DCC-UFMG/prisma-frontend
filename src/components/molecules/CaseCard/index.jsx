import React from "react";
import { CardContent, CardTitle } from "../../atoms/Card";
import Label from "../../atoms/Label";
import UserRole from "../../atoms/UserRole";
import { Avatar, Badge, Menu, Popconfirm } from "antd";
import { Link, useHistory } from "react-router-dom";
import UserAvatar from "../../atoms/Avatar";
import { useDispatch } from "react-redux";
import { deleteCaseById, fetchCases } from "../../../reducers/cases";

export default function Card(props) {
  const { data } = props;
  const isEnabled = (feature) => data[`has_${feature}`];
  const dispatch = useDispatch();

  const deleteCase = () => {
    dispatch(deleteCaseById(data.id)).then(() => {
      dispatch(fetchCases());
    });
  };

  const history = useHistory();

  const viewCase = () => {
    console.log(`/case/${data.id}/detail`);
    history.push(`/case/${data.id}/detail`);
  };

  const menu = (
    <Menu>
      <UserRole roles={["admin", "root"]} userId={data.user_id}>
        <Link to={`/case/${data.id}/users`}>
          <Menu.Item>Vincular Usuários</Menu.Item>
        </Link>
      </UserRole>
      <UserRole roles={["root"]} userId={data.user_id}>
        <Link to={`/case/${data.id}`}>
          <Menu.Item>Editar caso</Menu.Item>
        </Link>
        <Popconfirm
          title={`Você deseja realmente remover este item?`}
          onConfirm={(e) => deleteCase()}
          okText="Sim"
          cancelText="Não"
        >
          <Menu.Item>Deletar caso</Menu.Item>
        </Popconfirm>
      </UserRole>
    </Menu>
  );

  return (
    <div className="card card-button">
      <CardTitle
        onClick={viewCase}
        title={data.name}
        icon={data.icon}
        color={data.color}
        menu={menu}
      />
      <Badge count={!data.open ? "Caso fechado" : null}>
        <CardContent onClick={viewCase}>
          <Label>Funcionalidades</Label>
          <ul className="fa-ul">
            <li className={!isEnabled("audio_transcription") ? "disabled" : ""}>
              <span className="fa-li">
                <i className="fas fa-file-audio"></i>
              </span>
              Transcrição de Áudio
            </li>
            <li className={!isEnabled("entities_detection") ? "disabled" : ""}>
              <span className="fa-li">
                <i className="fas fa-tags"></i>
              </span>
              Detecção de Entidades
            </li>
            <li className={!isEnabled("paraphrases") ? "disabled" : ""}>
              <span className="fa-li">
                <i className="fas fa-quote-left"></i>
              </span>
              Paráfrases
            </li>
            <li className={!isEnabled("classification") ? "disabled" : ""}>
              <span className="fa-li">
                <i className="fas fa-file-alt"></i>
              </span>
              Classificação
            </li>
            <li className={!isEnabled("image") ? "disabled" : ""}>
              <span className="fa-li">
                <i className="fas fa-file-image"></i>
              </span>
              Imagem
            </li>
          </ul>

          <Label>Usuários</Label>
          {data.users.length ? "" : <em>Nenhum usuário vinculado</em>}
          <Avatar.Group maxCount="10">
            {data.users.map((user) => (
              <UserAvatar
                key={user.id}
                size="small"
                user={user}
                tooltip={true}
              />
            ))}
          </Avatar.Group>
        </CardContent>
      </Badge>
    </div>
  );
}
