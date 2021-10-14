import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import { useParams } from 'react-router';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchClassificationScores } from '../../../reducers/classification';

export default function ClassificationLinesChart(props) {

    const params = useParams();
    const scores = useSelector(state => state.classification.scores);
    const dispatch = useDispatch();

    const loadData = async () => {
        dispatch(fetchClassificationScores(params));
    }

    const data = () => {
        if (!scores || scores.length === 0)
            return null;

        return scores.map((d, i) => ({
            iteration: i, value: d
        }))
    }

    const config = () => ({
        data: data(),
        height: 250,
        xField: 'iteration',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    });

    useEffect(() => {
        loadData();
    }, [])

    return (<>
        {data() ?
            <Line {...config()} />
            :
            null
        }
    </>)

}