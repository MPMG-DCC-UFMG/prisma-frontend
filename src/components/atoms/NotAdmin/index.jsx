import React from 'react';
import { useSelector } from 'react-redux';

export default function NotAdmin (props) {

    const currentUser = useSelector(state => state.user.data);

    const isAdmin = () => currentUser && currentUser.role==="admin";

    return (<>
        { !isAdmin() ? props.children : null }
    </>);
}