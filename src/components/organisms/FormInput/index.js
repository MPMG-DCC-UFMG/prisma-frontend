import React from 'react';
import { Alert, Form, Input, Switch, Select, Badge, Upload, Button } from 'antd';
import Icon from '../../atoms/Icon';
import icons from '../../../data/icons.json';
import colors from '../../../data/colors.json';
import { UploadUrlBuilder } from '../../../services/urlBuilder/uploadUrlBuilder';
import { ApiRequest } from '../../../services/apiRequestService';

export default function FormInput (props) {

    const getField = () => {
        switch (props.field.type) {

            case "input":
                return (
                    <Input />
                )

            case "password":
                return (
                    <Input.Password />
                )

            case "textarea":
                return (
                    <Input.TextArea rows={props.field.rows || 5} autoSize={props.field.autoSize || true} showCount={props.field.showCount} maxLength={props.field.maxLength} />
                )

            case "switch":
                return (
                    <Switch />
                )

            case "select":
                return (
                    <Select>
                        { props.field.options.map(option => (
                            <Select.Option value={option.key}>{option.value}</Select.Option>
                        ))}
                    </Select>
                )

            case "icon-select":
                return (
                    <Select
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                    >
                        { icons.map(icon => (
                            <Select.Option value={icon}><Icon icon={icon} /> {icon}</Select.Option>
                        ))}
                    </Select>
                )

            case "color-select":
                return (
                    <Select
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >
                        { colors.map(color => (
                            <Select.Option value={color}><Badge color={color} text={color} /></Select.Option>
                        ))}
                    </Select>
                )

            case "upload":
                return (
                    <Upload 
                        action={new UploadUrlBuilder().get()} 
                        headers={ ApiRequest.headers }
                        {...props}>
                        <Button icon={<Icon icon="upload" />}> Anexar arquivo</Button>
                    </Upload>
                )

            default:
                return ( <Alert message={`Campo do tipo ${props.field.type} não configurado`} type="error" /> )

        }
    }

    const getValuePropName = () => {
        switch (props.field.type) {
            case "switch":
                return "checked";
            default:
                return "value";
        }
    }

    return (
        <React.Fragment>
            <Form.Item
                label={props.field.label}
                name={props.field.name}
                rules={props.field.rules}
                valuePropName={getValuePropName()}
                initialValue={props.field.defaultValue}
            >
                { getField() }
            </Form.Item>
        </React.Fragment>
    );

}