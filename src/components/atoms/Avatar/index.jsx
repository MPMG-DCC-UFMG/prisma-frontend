import React from 'react';
import { Avatar, Tooltip } from 'antd';

export default function UserAvatar (props) {

    const { user, size, tooltip } = props;

    function stringToHslColor(s, l) {
        var hash = 0;
        if(!user) return '';
        for (var i = 0; i < user.name.length; i++) {
          hash = user?.name.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        var h = hash % 360;
        return 'hsl('+h+', '+s+'%, '+l+'%)';
      }

    const firstLetters = () => {
        return user?.name.split(" ").map(word => word.slice(0, 1) );
    }

    const renderAvatar = () => (
      <Avatar size={size} style={{ backgroundColor: stringToHslColor(30, 80) }}>{ firstLetters() }</Avatar>
    )

    return (<>
        { tooltip ? (
        <Tooltip title={user?.name}>{ renderAvatar() }</Tooltip>
        ) : (
          renderAvatar()
        )}
    </>);
}