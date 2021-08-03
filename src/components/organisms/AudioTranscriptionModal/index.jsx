import { Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';
import Utils from '../../../utils/utils';

const AudioTranscriptionModal = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const data = useSelector(state => state.audioTranscription.data);

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(true);
        }
    }));

    const handleOk = () => {
        setConfirmLoading(true);

        const data = {segment_ids: selectedRows.reduce((a, r) => [...a, r.key], []) }
        
        console.log(data);

        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
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

    const mappedData = () => data.segments.filter(d => !d.full_audio).map(d => ({ key: d.id, start_time: d.start_time, end_time: d.end_time, approved: d.revisions.filter(r => r.approved).length }))

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
            title="Mesclar Segmentos"
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