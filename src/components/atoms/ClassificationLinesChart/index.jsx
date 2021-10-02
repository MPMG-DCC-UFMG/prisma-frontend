import React, { useState } from 'react';
import { Line } from '@ant-design/charts';
import { useParams } from 'react-router';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';

export default function ClassificationLinesChart(props) {

    const params = useParams();
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_SCORES, params).get();
        setData(
            response.map((d, i) => ({
                iteration: i, value: d
            }))
        );
    }

    const config = () => ({
        data,
        height: 250,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    });

    return (<>
        <Line {...config()} />
    </>)

}