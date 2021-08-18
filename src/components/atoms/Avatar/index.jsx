import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { FixPath } from '../../../services/fixPath';
import BaseUrls from '../../../utils/baseUrls';
import { UrlBuilder } from '../../../services/urlBuilder/urlBuilder';

export default function UserAvatar(props) {

  const { user, size, tooltip } = props;

  function stringToHslColor(s, l) {
    var hash = 0;
    if (!user) return '';
    for (var i = 0; i < user.name.length; i++) {
      hash = user?.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  const firstLetters = () => {
    return image() ? '' : user?.name.split(" ").map(word => word.slice(0, 1));
  }

  const renderAvatar = () => (
    <Avatar
      size={size}
      style={{
        backgroundColor: stringToHslColor(30, 80),
        backgroundSize: "cover",
        backgroundImage: `url(${image()})`
      }}>
      {firstLetters()}
    </Avatar>
  )
  const image = () => user?.photo ? new UrlBuilder(FixPath.fix(BaseUrls.IMAGE_FILE, {file: user.photo})).get() : null;

  return (<>
    {tooltip ? (
      <Tooltip title={user?.name}>{renderAvatar()}</Tooltip>
    ) : (
      renderAvatar()
    )}
  </>);
}