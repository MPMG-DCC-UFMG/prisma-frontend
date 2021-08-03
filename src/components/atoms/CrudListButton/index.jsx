import { Tooltip } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import { FixPath } from '../../../services/fixPath';
import Icon from '../Icon';

export function CrudListButton (props) {

    const params = useParams();
    const {record, path, icon, request, showIf, tip} = props;

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

        { path ? 
                <Tooltip title={tip}>
                    <Link 
                    to={FixPath.fix(path, params, record.id)}>
                        <Icon icon={icon} />
                    </Link>
                </Tooltip>
            : null }

        { request ? 
                <Tooltip title={tip}>
                    <a onClick={postData}>
                        <Icon icon={icon} />
                    </a>
                </Tooltip>
            : null }
        
    </span>) : null }</>);
}
