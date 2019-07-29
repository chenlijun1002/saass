import { Modal, Button, Form, Input, Select, message,Row,Col } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';
const namespace = 'settingUser';
const FormItem = Form.Item;
const Option = Select.Option;
let timer;
let timeoutTimer;
function hasErrors(fieldsError) {
    let error = Object.keys(fieldsError).some(field => fieldsError[field]);
    return error;
}
@Form.create()
class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCounting: false,
            count: 60,
        }
    }
    componentDidMount() {

        this.props.form.validateFields();
    }
    componentWillMount() {
        //this.getRoles()
    }
    getRoles = () => {
        console.log("asdasdsad");
        let { _this } = this.props;
        _this.getRoles();
        // dispatch({
        //     type: `${namespace}/GetRoles`,
        //     param: { pageIndex: 1, pageSize: 50 }
        // });
   
    }
    handleOk = () => {
        const { _this } = this.props;

        _this.setState({ visible: false }, () => {
            this.forceUpdate();
        });
    };

    handleCancel = () => {
        const { _this } = this.props;
        _this.setState({ visible: false }, () => {
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

        const { dispatch,_this } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
             
                dispatch({
                    type: 'settingUser/CreateAccount',
                    param: values,
                    callback: (data) => {
                        if (data.Code != 0) {
                            message.error(data.Msg);
                          
                        } else {
                            message.success('添加子账号成功');
                            this.handleCancel();
                            _this.reset()
                            _this.GetList();
                        }
                    }
                })

            }
        });
    }
    SendSMS = () => {
        const { dispatch, form } = this.props;
        let phone = form.getFieldValue('phone')

        dispatch({
            type: 'settingUser/SendSMS',
            param: { phone: phone },
            callback: (res) => {
                if (!res) return;
                if (res.Code == 0) {
                    message.success('获取验证码成功！')
                    timer = setInterval(() => {
                        this.setState({
                            isCounting: true,
                            count: this.state.count - 1,
                        }, () => {
                            if (this.state.count === 0) {
                                clearInterval(timer);
                                this.setState({
                                    isCounting: false,
                                    count: 60,
                                });
                            }
                        });

                    }, 1000);
                }
                else {
                    //重置为 获取验证码
                    this.setState({
                        isCounting: false,
                        count: 60
                    });
                }
            }
        });
    }
    Reoles=()=>{
        window.open(`#/${window.storeId}/setting/store/authority/roles`);
    }
    CheckPhone = (rule, value, callback) => {
        let { dispatch } = this.props;
        if (!value || value.length != 11) {
            callback('请输入11位手机号码')
        } else if (value.length == 11) {
            dispatch({
                type: `${namespace}/CheckPhone`,
                param: { phone: value },
                callback: (data) => {
                    if (!data) {
                        callback('手机号码还未注册！')
                    } else {
                        callback()
                    }
                }
            });
        } else {
            callback()
        }
    }
    render() {
        const {
            visible, _this, settingUser
        } = this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
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
                    visible={visible}
                    title="新建子账号"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={640}
                >
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem
                            validateStatus={isFieldTouched('phone') && getFieldError('phone') ? 'error' : ''}
                            help={isFieldTouched('phone') && getFieldError('phone') || ''}
                            label="手机号:"
                           // {...formItemLayout}
                           labelCol={{span:6}}
                           wrapperCol={{span:8}}
                        >
                            {getFieldDecorator('phone', {
                                rules: [{
                                    validator: this.CheckPhone,
                                    required: true,
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="短信验证码:"
                            validateStatus={isFieldTouched('smsCode') && getFieldError('smsCode') ? 'error' : ''}
                            help={isFieldTouched('smsCode') && getFieldError('smsCode') || ''}
                            //{...formItemLayout}
                            labelCol={{span:6}}
                           wrapperCol={{span:8}}
                        >
                            {getFieldDecorator('smsCode', {
                                rules: [{ required: true, message: '请输入验证码' }],
                            })(
                                <div style={{ whiteSpace:'nowrap' }}>
                                    <Input onChange={this.setSMSCode}  style={{ borderRadius: "4px 0 0 4px",width:'49%' }} />
                                    {

                                        <Button style={{ borderRadius: "0 4px 4px 0", borderLeft: 0, }}  disabled={getFieldError('phone') || this.state.isCounting ? true : false} onClick={this.SendSMS}>{this.state.isCounting ? this.state.count + 's' : '发送验证码'}</Button>
                                    }

                                </div>
                            )}
                        </FormItem>

                        <FormItem
                            label="账号角色:"
                            validateStatus={isFieldTouched('roleId') && getFieldError('roleId') ? 'error' : ''}
                            help={isFieldTouched('roleId') && getFieldsError('roleId') || ''}
                            //{...formItemLayout}
                            labelCol={{span:6}}
                           wrapperCol={{span:8}}
                        >
                            {getFieldDecorator('roleId', {
                                rules: [{ required: true, message: '请选择角色' }],
                            })(
                                <div style={{ whiteSpace:'nowrap' }}>
                                    <Select onChange={this.setRoleId} >
                                        {
                                            settingUser.rolesPage.DataList && settingUser.rolesPage.DataList.map((m, index) => {
                                                return <Option value={m.id} key={m.id} >{m.name}</Option >
                                            })
                                        }
                                    </Select >
                                    
                                    <a className="xkd-ml8" onClick={this.getRoles}>刷新</a> 
                                    <a className="xkd-ml8" onClick={this.Reoles}>新增</a>
                                   
                                </div>
                            )}
                        </FormItem>
                        
                        <Row>
                            <Col offset={6}>
                            <Button
                                type="primary"
                                htmlType="submit" 
                               // onClick={this.handleSubmit}
                                //style={{ transform: "translate(20%)" }}
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
}))(AddUser);
