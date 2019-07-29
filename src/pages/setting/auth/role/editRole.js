import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import styles from '../index.less'
import { Table, Divider,Card, Tag, Button, Row, Col, Input, Form, Icon, Tree,Spin,message } from 'antd';

function hasErrors(fieldsError) {
    let error = Object.keys(fieldsError).some(field => fieldsError[field]);
    console.log("错误：" + error);
    return error;
}
const { TreeNode } = Tree;
const namespace = 'settingUser'
const FormItem = Form.Item;
@Form.create()
class EditRole extends React.Component {
    state = { helfCheckedKeys: [], roleName: '', roleIds: [], opids: [],expandedKeys:[] }
    componentDidMount() {
        this.props.form.validateFields();
        this.setState({ ch: false })
    }
    componentWillMount() {
        this.GetRoleById();
    }
    GetRoleById = () => {
        let { dispatch, form } = this.props;
        let roleId = sessionStorage.getItem('editRoleId') ? sessionStorage.getItem('editRoleId') : 0;
        if (roleId != 0) {
            dispatch({
                type: `${namespace}/GetPrivilegeByRoleId`,
                param: { id: roleId },
                callback: (data) => {
                    this.initData(data.permissions);

                    let roleIds = this.privilegeIds(data.permissions);

                    form.setFieldsValue({
                        roleName: data.roleName,
                        roleIds: roleIds,
                        id: data.id,
                    });
                    let rootKeys=this.getExpandedKeys(data.permissions)
                    this.setState({ roleName: data.roleName,expandedKeys: rootKeys});

                }
            });
        }
    }
    getExpandedKeys = (data) => {
        let expandedKeys = []
        data.map((item) => {
            expandedKeys.push(item.id.toString())
        })
        return expandedKeys;
    }
    ///处理数据  将后台权限数据加工 用作半勾选状态
    initData = (data) => {
        data.map((item) => {

            if (item.child && item.child.length > 0) {
                if (item.checked && item.child.filter(t => t.checked == false).length > 0) {
                    this.state.helfCheckedKeys.push(item)
                }
                this.initData(item.child)
            }
        })
        return data;
    }

    roleName = (rule, value, callback) => {
        let { dispatch } = this.props;
        if (!value || value.length < 2 || value.length > 6) {
            callback('请输入2~6位角色名称')
        } else if (value.length > 1 && value.length < 7) {
            if (value == this.state.roleName) {
                callback()
            } else {
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
            }

        } else {
            callback()
        }
    }

    privilegeIds = (data) => {
        let ids = [];
        this.getPrivilegeId(data, ids);
        return ids;
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
    getPrivilegeId = (data, ids) => {
        data.map((item) => {

            if (item.child && item.child.length > 0) {
                this.getPrivilegeId(item.child, ids)
            }
            //判断半选中状态
            let helfChecked = this.state.helfCheckedKeys.filter(i => i.id == item.id).length > 0 ? true : false;
            //判断菜单是否是选中状态
            if (item.checked && !helfChecked) {
                //如果是操作权限，key加上op_前缀，方便在提交表单时，分别取出页面权限和操作权限
                if (!item.isMenu) {
                    ids.push("op_" + item.id);
                } else {
                    ids.push(item.id.toString());
                }
            }
        })
    }

    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('表单值：', values);
            }
        });
    }

    renderTreeNodes = (data, id) => data.map((item) => {
        if (item.child) {
            return (
                <TreeNode title={item.name} key={item.id} dataRef={item}>
                    {this.renderTreeNodes(item.child, item.id)}
                </TreeNode>
            );
        }
        //如果是操作权限，key加上op_前缀，方便在提交表单时，分别取出页面权限和操作权限
        if (!item.isMenu) {
            return <TreeNode title={item.name} key={"op_" + item.id} className="xkd-inline-block"/>;
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
                    type: `${namespace}/ModifiedRole`,
                    param: { roleName: values.roleName,id:values.id, menuIds: this.state.roleIds, permissionIds: this.state.opids },
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

    normalizeAll = (value, prevValue = []) => {

        return value;
    };
    render() {
        let { settingUser,loading } = this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;


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
                <Card>
                <Form onSubmit={this.handleSubmit} style={{ minWidth: 900 }}>

                    <FormItem className="xkd-display-none">
                        {getFieldDecorator('id', {
                            rules: [{ required: true }],
                        })(
                            <Input type='hidden' />
                        )}
                    </FormItem>
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
                            //normalize: this.normalizeAll,
                            rules: [{ required: true, message: '请选择角色权限!' }],
                        })(
                            <Tree
                                checkable
                                expandedKeys={this.state.expandedKeys}
                                onCheck={this.onCheck}
                            >
                                {

                                    this.renderTreeNodes(settingUser.privilege.permissions ? settingUser.privilege.permissions : [], '0')
                                }
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
    loading:loading.effects[`${namespace}/GetPrivilegeByRoleId`]
}))(EditRole);