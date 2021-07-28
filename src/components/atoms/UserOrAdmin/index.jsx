import React from 'react';
import { useSelector } from 'react-redux';

export default function UserOrAdmin (props) {

    const { userId } = props;
    const currentUser = useSelector(state => state.user.data);

    const isUserOrAdmin = () => currentUser && (currentUser.role==="admin" || currentUser.id===userId);

    return (<>
        { isUserOrAdmin() ? props.children : null }
    </>);
}