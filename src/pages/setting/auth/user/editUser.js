import { Modal, Button, Form, Input, Select, message,Row,Col } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';
import SelectRole from './selectRole'
const namespace = 'settingUser';
const FormItem = Form.Item;
const Option = Select.Option;
function hasErrors(fieldsError) {
    let error = Object.keys(fieldsError).some(field => fieldsError[field]);
    return error;
}
@Form.create()
class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCounting: false,
            count: 60,
            roleId: 0
        }
    }

    componentWillMount() {
    }
    handleOk = () => {
        const { _this } = this.props;

        _this.setState({ editvisible: false }, () => {
            this.forceUpdate();
        });
    };

    handleCancel = () => {
        const { _this } = this.props;
        _this.setState({ editvisible: false }, () => {
            this.forceUpdate();
        });
    };
    setSMSCode = (e) => {
        const { form } = this.props;

        form.setFieldsValue({
            smsCode: e.target.value,
        });
    }
    setRoleId = (e) => {
        const { form } = this.props;
        form.setFieldsValue({
            roleId: e,
        });
        console.log(form.getFieldValue('roleId'));
    }
   
    handleSubmit = (e) => {
        const { _this,dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {

                dispatch({
                    type: 'settingUser/UpdateAccount',
                    param: values,
                    callback: (data) => {
                        if (data.Code != 0) {
                            message.error(data.Msg);
                          
                        } else {
                            message.success('修改子账号成功');
                            this.props.form.resetFields();
                            this.handleCancel();
                            _this.reset()
                            _this.GetList();
                        }
                    }
                })
         

               // this.handleCancel();
            }
        });
    }

    render() {
        const {
            editvisible, _this, user, settingUser
        } = this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue
        } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 10 },
                md: { span: 10 },

            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 14 },
                md: { span: 14 },
            },
        };

        return (
            <div>
                <Modal
                    visible={editvisible}
                    title="编辑子账号"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={640}
                >
                    <Form layout="horizontal">
                        <FormItem >
                            {getFieldDecorator('id', {
                                initialValue: user.id,
                                rules: [{ required: true }],
                            })(
                                <Input type='hidden' />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={isFieldTouched('phone') && getFieldError('phone') ? 'error' : ''}
                            help={isFieldTouched('phone') && getFieldError('phone') || ''}
                            label="手机号:"
                           // {...formItemLayout}
                           labelCol={{span:6}}
                           wrapperCol={{span:8}}
                        >
                            {getFieldDecorator('phone', {
                                initialValue: user.name,
                                rules: [{ required: true, message: '请输入11位手机号码', len: 11 }],
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem
                            label="账号角色:"
                            validateStatus={isFieldTouched('roleId') && getFieldError('roleId') ? 'error' : ''}
                            help={isFieldTouched('roleId') && getFieldsError('roleId') || ''}
                           // {...formItemLayout}
                           labelCol={{span:6}}
                           wrapperCol={{span:8}}
                        >
                            {getFieldDecorator('roleId', {
                                initialValue: user.roleId,
                                rules: [{ required: true, message: '请选择角色' }],
                            })(
                                <SelectRole data={settingUser.rolesPage.DataList ? settingUser.rolesPage.DataList : []} _this={_this} form={this.props.form} />
                            )}
                        </FormItem>                        
                        <Row>
                            <Col offset={6}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={this.handleSubmit}
                                //style={{ transform: "translate(100px)" }}
                            >
                                保存
                             </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect(({ settingUser, global, loading }) => ({
    settingUser,
}))(EditUser);
