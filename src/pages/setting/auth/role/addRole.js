import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import styles from '../index.less'
import { Card, Table, Divider, Tag, Button, Row, Col, Input, Form, Icon, Tree ,Spin} from 'antd';

function hasErrors(fieldsError) {
    let error = Object.keys(fieldsError).some(field => fieldsError[field]);
    console.log("错误：" + error);
    return error;
}
const { TreeNode } = Tree;
const namespace = 'settingUser'
const FormItem = Form.Item;
@Form.create()
class AddRole extends React.Component {
    state = { roles: [], ch: true, roleIds: [], opids: [], expandedKeys:[]}
    componentDidMount() {
        this.props.form.validateFields();
        this.setState({ ch: false })
    }
    componentWillMount() {
        this.GetPrivilege();
    }

    GetPrivilege = () => {
        let { dispatch } = this.props;
        dispatch({
            type: `${namespace}/GetPrivilege`,
            callback: (data) => {
                let rootKeys=this.getExpandedKeys(data)
                this.setState({ roles: data, expandedKeys: rootKeys });
            }
        });
    }
    getExpandedKeys = (data) => {
        let expandedKeys = []
        data.map((item) => {
            expandedKeys.push(item.id.toString())
        })
        return expandedKeys;
    }
  

    renderTreeNodes = data => data.map((item) => {
        if (item.child) {
            return (
                <TreeNode title={item.name} key={item.id} dataRef={item}>
                    {this.renderTreeNodes(item.child)}
                </TreeNode>
            );
        }
        //如果是操作权限，key加上op_前缀，方便在提交表单时，分别取出页面权限和操作权限
        if (!item.isMenu) {
            return <TreeNode title={item.name} key={"op_" + item.id} className="xkd-inline-block" />;
        } else {
            return <TreeNode title={item.name} key={item.id.toString()} />;
        }
    })

    handleSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: `${namespace}/CreateRole`,
                    param: { roleName: values.roleName, menuIds: this.state.roleIds, permissionIds: this.state.opids },
                    callback: (data) => {
                        if (data.Data) {
                            router.replace({
                                pathname: `/${window.storeId}/setting/store/authority/roles`,
                            });
                        } else {
                            message.error(data.Msg)
                        }
                    }
                });
            }
        });
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {

        let _roleIds = [] //菜单权限
        let _opids = []//操作权限
        checkedKeys.map((item) => {
            if (item.indexOf('op_') > -1) {
                item = item.replace('op_', '');
                _opids.push(item)
            } else {
                _roleIds.push(item);
            }
        })
        info.halfCheckedKeys.map((item) => {
            if (item.indexOf('op_') > -1) {
                item = item.replace('op_', '');
                _opids.push(item)
            } else {
                _roleIds.push(item);
            }
        })
        this.setState({ roleIds: _roleIds, opids: _opids });

    }
    normalizeAll = (value, prevValue = []) => {

        return value;
    };
    roleName = (rule, value, callback) => {
        let { dispatch } = this.props;
        if (!value || value.length < 2 || value.length > 6) {
            callback('请输入2~6位角色名称')
        } else if (value.length > 1 && value.length < 7) {
            dispatch({
                type: `${namespace}/CheckRoleName`,
                param: { roleName: value },
                callback: (data) => {
                    if (data) {
                        callback('角色名称已经存在！')
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
        const {loading}=this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        console.log('asdsa:' + this.state.expandedKeys);
        const roleNameError = isFieldTouched('roleName') && getFieldError('roleName');
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 2 },
                md: { span: 2 },

            },
            wrapperCol: {
                xs: { span: 6 },
                sm: { span: 6 },
                md: { span: 8 },
            },
        };
        return (
            <div style={{ minWidth: 900 }}>
               <Spin spinning={loading}>
                <Card >
                    <Form onSubmit={this.handleSubmit} style={{ minWidth: 900 }}>

                        <FormItem
                            {...formItemLayout}
                            validateStatus={roleNameError ? 'error' : ''}
                            help={roleNameError || ''}
                            label="角色名称:"
                        >

                            {getFieldDecorator('roleName', {
                                rules: [{
                                    validator: this.roleName,
                                    required: true,
                                }],
                            })(
                                <Input placeholder="2-6字符" />
                            )}
                        </FormItem>
                        <Divider
                            dashed={true}
                        />
                        <div className={styles.addRoleTitle}>添加权限</div>
                        <FormItem className={styles.RoleCard}>
                            {getFieldDecorator('roleIds', {
                                valuePropName: 'checkedKeys', trigger: 'onCheck',
                                normalize: this.normalizeAll,
                                rules: [{ required: true, message: '请选择角色权限!' }],
                            })(


                                <Tree
                                    checkable
                                   // defaultExpandAll={this.state.isOpen}
                                    expandedKeys={this.state.expandedKeys}
                                    onCheck={this.onCheck}
                                >

                                    {this.renderTreeNodes(this.state.roles)}
                                </Tree>
                            )}

                        </FormItem>
                    </Form>
                </Card>
              </Spin>
                <div className="xkd-bottom-actions">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit}
                        className="xkd-translate-88"
                    >
                        保存
                  </Button>
                </div>
            </div>
        )
    }
}
export default connect(({ settingUser, global, loading }) => ({
    settingUser,
    loading:loading.effects[`${namespace}/GetPrivilege`]
    
}))(AddRole);