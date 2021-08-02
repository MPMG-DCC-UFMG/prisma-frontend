import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import { FixPath } from '../../../services/fixPath';
import Icon from '../Icon';

export function CrudListButton (props) {

    const params = useParams();
    const {record, path, icon, request, showIf} = props;

    const postData = async () => {
        await ApiRequest.setUrl(request.path, params, record.id)
                .request(null, request.method, request.data);
        props.onReload();
    };

    const conditional = () => {
        if(!showIf) return true;
        let show = true;

        for(const key in showIf) {
            if(record[key] != showIf[key]) 
                show = false;
        }
        return show;
    }

    return (<>{ conditional() ? (<span className="mr-2">

        { path ? <Link 
                to={FixPath.fix(path, params, record.id)}>
                <Icon icon={icon} />
                </Link>
            : null }

        { request ? <a onClick={postData}>
                <Icon icon={icon} />
                </a>
            : null }
        
    </span>) : null }</>);
}
