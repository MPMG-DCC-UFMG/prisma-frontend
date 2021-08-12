import { Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '../../../services/apiRequestService';
import BaseUrls from '../../../utils/baseUrls';
import Utils from '../../../utils/utils';
import { fetchAudioTranscription } from '../../../reducers/audioTranscription';

const AudioTranscriptionModal = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const data = useSelector(state => state.audioTranscription.data);
    const params = useParams();
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(true);
        }
    }));

    const handleOk = async () => {
        setConfirmLoading(true);

        const data = {segment_ids: selectedRows.reduce((a, r) => [...a, r.key], []) }
        await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION_SEGMENT+"/merge", params).post(null, data);
        dispatch(fetchAudioTranscription(params));

        setVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const columns = [
        {title: "Segmento", dataIndex: "segment", render: (text, record, i) => `Segmento ${i+1}`},
        {title: "Tempo", dataIndex: "time", render: (text, record, i) => `${Utils.secondsToMinutes(record.start_time)} - ${Utils.secondsToMinutes(record.end_time)}`},
        {title: "Transc. Aprovadas", dataIndex: "approved"},
    ]

    const mappedData = () => data.segments.filter(d => !d.full_audio && !d.is_merge).map(d => ({ key: d.id, start_time: d.start_time, end_time: d.end_time, approved: d.revisions.filter(r => r.approved).length }))

    const rowSelection = {
        onChange: (_selectedRowKeys, _selectedRows) => {
            setSelectedRows(_selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.approved===0
        }),
      };

    return (
        <Modal
            title="Concatenar Segmentos"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Table 
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection
                }}
                dataSource={mappedData()}
                columns={columns}
                pagination={false}
            />
        </Modal>
    );

})

export default AudioTranscriptionModal;