import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import styles from '../index.less'
import { Table, Divider, Tag, Button, Select, Form, Row, Col, Input, Popconfirm, message } from 'antd';
import AddUser from './addUser'
import EditUser from './editUser'
const FormItem = Form.Item;
const namespace = 'settingUser'
const Option = Select.Option;
@Form.create()
class Users extends React.Component {
    state = {
        selectId: 0,
        editvisible: false,
        paginationProps: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
            pageSize: 10,
            total: 0,
            pageIndex: 1,
        },
        visible: false
    }
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    componentWillMount() {
        let { dispatch } = this.props;
        this.GetList();
        this.getRoles();

    }
    getRoles = () => {
        const { dispatch } = this.props;
        dispatch({
            type: `${namespace}/GetRoles`,
            param: { pageIndex: 1, pageSize: 50 }
        });
    }
    setRoleId = (e) => {
        const { form } = this.props;
        form.setFieldsValue({
            roleId: e,
        });
    }
    GetList = () => {
        const { dispatch, form } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = { ...values, pageIndex: this.state.paginationProps.pageIndex, pageSize: this.state.paginationProps.pageSize }
                if (values.roleId == 0) {
                    delete values.roleId;
                }
                console.log(values)
                dispatch({
                    type: `${namespace}/AccountList`,
                    param: values
                });
            }
        });
    }
    handleSubmit = () => {
        this.setState({ paginationProps: { ...this.state.paginationProps, pageIndex: 1 } })
        this.GetList();
    }
    onChange = data => {
        let { dispatch } = this.props;
        let { paginationProps } = this.state;
        let pagination = {
            ...paginationProps,
            ...data, pageIndex: data.current
        };
        this.setState({ paginationProps: pagination }, () => {
            this.GetList();
        })
    };
    NewUser = () => {
        this.setState({
            visible: true,
            selectId: 0,
        })
    }
    delete = (id) => {
        let { dispatch } = this.props;
        dispatch({
            type: `${namespace}/DelAccount`,
            param: { id: id },
            callback: (data) => {
                if (data.Data) {
                    message.success('删除成功')
                    this.reset();
                    this.GetList();
                } else {
                    message.error(data.Msg)
                }
            }
        });
    }
    lockUser = (id) => {
        let { dispatch } = this.props;
        dispatch({
            type: `${namespace}/LockAccount`,
            param: { id: id },
            callback: (data) => {
                if (data.Data) {
                    message.success('冻结成功')
                    this.reset();
                    this.GetList();
                } else {
                    message.error(data.Msg)
                }
            }
        });
    }
    unLockUser = (id) => {
        let { dispatch } = this.props;
        dispatch({
            type: `${namespace}/UnLockAccount`,
            param: { id: id },
            callback: (data) => {
                if (data.Data) {
                    message.success('解冻成功')
                    this.reset();
                    this.GetList();
                } else {
                    message.error(data.Msg)
                }
            }
        });
    }
    EditUser = (userId) => {
        let { dispatch } = this.props;
        this.setState({
            editvisible: true,
        }, () => {
            dispatch({
                type: `${namespace}/Account`,
                param: { id: userId },
                callback: () => {
                    this.forceUpdate()
                }
            });

        })

    }
    reload = () => {
        window.location.reload();
    };
    reset = () => {
        let { form } = this.props;
        form.resetFields();
    };
    Detail = (id) => {
        sessionStorage.setItem('DetailRoleId', id);

        router.replace({
            pathname: `/${window.storeId}/setting/store/authority/staff/info`,
        });
    }

    render() {
        let { global } = this.props;
        const {
            getFieldDecorator,
        } = this.props.form;
        const { settingUser, loading } = this.props;

        const columns = [
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
                width: '20%',
                align: 'left',
            },
            {
                title: '姓名',
                dataIndex: 'realName',
                key: 'realName',
                width: '10%',
                align: 'left',
            },
            {
                title: '角色',
                dataIndex: 'roleName',
                key: 'roleName',
                width: '10%',
                align: 'left',
            },
            {
                title: '账号状态',
                dataIndex: 'status',
                key: 'status',
                width: '10%',
                align: 'left',
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                width: '20%',
                align: 'left',
            },
            {
                title: '操作',
                key: '操作',
                width: '30%',
                align: 'right',
                render: (text, data) => {
                    if (global.oemInfo.telPhone && data.phone == global.oemInfo.telPhone) {
                        return (< div >                           
                                本账号
                        </div>)
                    }
                    else {
                        return (

                            < div >
                                <a onClick={() => this.EditUser(data.id)}>
                                    编辑
                    </a>
                                <Divider type="vertical" />
                                {
                                    data.status == "正常" ?
                                    <Popconfirm title="确认冻结此账号？" onConfirm={() => this.lockUser(data.id)} okText="是" cancelText="否"> <a>冻结</a>  </Popconfirm>:
                                    <Popconfirm title="确认解冻此账号？" onConfirm={() => this.unLockUser(data.id)} okText="是" cancelText="否">    <a >解冻</a> </Popconfirm>
                                }


                                < Divider type="vertical" />

                                <Popconfirm title="确认删除？" onConfirm={() => this.delete(data.id)} okText="是" cancelText="否">
                                    <a>
                                        删除
                            </a>
                                </Popconfirm>


                            </div >

                        )
                    }
                }
            },
        ];
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 18 },
            },
        };

        return (
            <div>
                <div style={{ marginBottom: 24 }}>
                    <Button type="primary" onClick={() => this.NewUser()}>
                        新建子账号
              </Button>
                    <span className="xkd-ml16 xkd-color-bf">最多可创建30个子账号</span>

                </div>
                <div style={{ marginBottom: 24 }}>
                    {/* <Form onSubmit={this.search}  >
                        <Row >
                            <Col span={8} >
                                <FormItem label='角色名称：' {...formItemLayout}>
                                    {getFieldDecorator(`roleId`)(

                                        <Select className="xkd-width-per-100">
                                            <Option value={0} >全部</Option >
                                            {
                                                settingUser.rolesPage.DataList && settingUser.rolesPage.DataList.map((m, index) => {
                                                    return <Option value={m.id} key={m.id}>{m.name}</Option >
                                                })
                                            }

                                        </Select >

                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} >
                                <FormItem label='手机号:' {...formItemLayout}>
                                    {getFieldDecorator(`phone`)(
                                        <Input className="xkd-width-per-100" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{ transform: 'translate(-6%)' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.handleSubmit}
                                >
                                    筛选
                             </Button>
                                <Button className="xkd-ml8" onClick={this.reset}>
                                    重置
                             </Button>
                            </Col>
                        </Row>
                    </Form> */}
                    <Form
                        className="ant-advanced-search-form"
                        onSubmit={this.search}
                    >
                        <Row gutter={24}>
                         <Col span={8}  >
                            <Form.Item label="角色名称:"
                               // labelCol={{span:6}}
                               // wrapperCol={{span:8}}
                               {...formItemLayout}
                            >
                                {getFieldDecorator(`roleId`)(
                                    <Select className="xkd-width-per-100">
                                        <Option value={0} >全部</Option >
                                        {
                                            settingUser.rolesPage.DataList && settingUser.rolesPage.DataList.map((m, index) => {
                                                return <Option value={m.id} key={m.id}>{m.name}</Option >
                                            })
                                        }

                                    </Select >
                                )}
                            </Form.Item>
                         </Col>
                         <Col span={8}>
                            <FormItem label='手机号:' {...formItemLayout}>
                                {getFieldDecorator(`phone`)(
                                    <Input className="xkd-width-per-100" />
                                )}
                            </FormItem> 
                         </Col>
                         <Col span={8} >
                            <div className="xkd-mt4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={this.handleSubmit}
                            >
                                筛选
                            </Button>
                            <Button className="xkd-ml8" onClick={this.reset}>
                                重置
                            </Button>
                            </div>
                        </Col>
                        </Row>                        
                    </Form>
                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={settingUser.accountList.Data ? settingUser.accountList.Data.DataList : []}
                    rowKey="id"
                    onChange={this.onChange.bind(this)}
                    pagination={this.state.paginationProps}
                />
                <AddUser _this={this} visible={this.state.visible} />
                <EditUser _this={this} editvisible={this.state.editvisible} user={settingUser.user} />
            </div>
        )
    }

}
export default connect(({ settingUser, global, loading }) => ({
    settingUser, global,
    loading: loading.effects['settingUser/AccountList'],
}))(Users);
