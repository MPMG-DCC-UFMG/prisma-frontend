import React from 'react';
import { Alert, Form, Input, Switch, Select, Badge, Upload, Button } from 'antd';
import Icon from '../../atoms/Icon';
import icons from '../../../data/icons.json';
import colors from '../../../data/colors.json';
import roles from '../../../data/roles.json';
import { UploadUrlBuilder } from '../../../services/urlBuilder/uploadUrlBuilder';
import { ApiRequest } from '../../../services/apiRequestService';
import { useSelector } from 'react-redux';

export default function FormInput(props) {

    const user = useSelector(state => state.user.data);

    const validatePassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('As senhas não coincidem!'));
        }
    })

    const rules = (fieldType, rules) => {
        return fieldType === 'confirm_password' ? [...rules, validatePassword] : rules;
    }

    const getField = () => {
        switch (props.field.type) {

            case "input":
                return (
                    <Input />
                )

            case "password":
            case "confirm_password":
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
                        {props.field.options.map(option => (
                            <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
                        ))}
                    </Select>
                )

            case "role-select":
                return (
                    <Select>
                        {roles.filter(role => !role.roles || role.roles.includes(user.role)).map(option => (
                            <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
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
                        {icons.map(icon => (
                            <Select.Option key={icon} value={icon}><Icon icon={icon} /> {icon}</Select.Option>
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
                        {colors.map(color => (
                            <Select.Option key={color} value={color}><Badge color={color} text={color} /></Select.Option>
                        ))}
                    </Select>
                )

            case "upload":
                return (
                    <Upload
                        action={new UploadUrlBuilder().get()}
                        headers={ApiRequest.headers}
                        {...props}>
                        <Button icon={<Icon icon="upload" />}> Anexar arquivo</Button>
                    </Upload>
                )

            default:
                return (<Alert message={`Campo do tipo ${props.field.type} não configurado`} type="error" />)

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
                rules={rules(props.field.type, props.field.rules)}
                valuePropName={getValuePropName()}
                initialValue={props.field.defaultValue}
                wrapperCol={props.field.wrapperCol}
                labelCol={props.field.labelCol}
                style={props.field.style}
            >
                {getField()}
            </Form.Item>
        </React.Fragment>
    );

}