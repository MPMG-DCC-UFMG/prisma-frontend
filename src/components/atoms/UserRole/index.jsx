import React from 'react';
import { useSelector } from 'react-redux';

export default function UserRole (props) {

    const { userId, roles } = props;
    const currentUser = useSelector(state => state.user.data);

    const isUser = () => userId && currentUser && currentUser.id===userId;
    const hasRole = () => currentUser && roles && roles.includes(currentUser.role);

    const userAndRole = () => {
        if(userId && roles) {
            return isUser() || hasRole();
        } else if(userId) {
            return isUser();
        } else if(roles) {
            return hasRole()
        } else {
            return true;
        }
    }

    return (<>
        { userAndRole() ? props.children : null }
    </>);
}