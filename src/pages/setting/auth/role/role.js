import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import styles from '../index.less'
import { Table, Divider, Tag, Button, Popconfirm, message } from 'antd';
const namespace = 'settingUser'
class Role extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paginationProps: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条记录`,
                pageSize: 10,
                pageIndex: 1,
                total: 0,
            },
        }

    }
    componentDidMount() {
        this.GetList();

    }
    GetList = () => {
        const { dispatch, form } = this.props;
        dispatch({
            type: `${namespace}/GetRoles`,
            param: { pageIndex: this.state.paginationProps.pageIndex, pageSize: this.state.paginationProps.pageSize },
            callback: (data) => {

                this.setState({ paginationProps: { ...this.state.paginationProps, total: data.Total } })
            }
        });
    }
    addRole = () => {
        router.replace({
            pathname: `/${window.storeId}/setting/store/authority/roles/add`,
        });
    }
    editRole = id => {
        sessionStorage.setItem('editRoleId', id);

        router.replace({
            pathname: `/${window.storeId}/setting/store/authority/roles/edit`,
        });
    };
    delete = id => {
        let { dispatch } = this.props;
        console.log(id)
        dispatch({
            type: `${namespace}/DelRole`,
            param: { id: id },
            callback: (data) => {
                if (data.Data) {
                    message.success('删除成功')
                    this.GetList();
                } else {
                    message.error(data.Msg)
                }
            }
        });
    }
    render() {
        const { settingUser,loading } = this.props;
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                align: 'left',
                render: (text, data) => (
                    <div>
                        {data.name}
                    </div>
                ),
            },
            {
                title: '账号数量',
                dataIndex: 'userNum',
                key: 'userNum',
                width: '20%',
                align: 'right',
            },

            {
                title: '操作',
                key: '操作',
                width: '30%',
                align: 'right',
                render: (text, data) => (
                    <span>
                        <span
                            className={`${styles.brandColor} ${styles.pointer}`}
                            onClick={() => this.editRole(data.id)}
                        >
                            编辑
                        </span>
                        {
                            data.userNum > 0 ? null :<Divider type="vertical" />
                        }

                  
                        {
                            data.userNum > 0 ? null :

                                <Popconfirm title="确认删除？" onConfirm={() => this.delete(data.id)} okText="是" cancelText="否">

                                    <span
                                        className={`${styles.brandColor} ${styles.pointer}`}

                                    >
                                        删除
                       </span>
                                </Popconfirm>
                        }

                    </span>
                ),
            },
        ];

        const Data = [{
            "id": 1,
            "name": "角色名称",
            "userNum": 2
        }, {
            "id": 2,
            "name": "角色名称2",
            "userNum": 2
        }, {
            "id": 3,
            "name": "角色名称3",
            "userNum": 2
        }, {
            "id": 4,
            "name": "角色名称4",
            "userNum": 2
        }]
        return (
            <div>
                <div style={{ marginBottom: 24 }}>
                    <Button type="primary" onClick={this.addRole}>
                        新建
              </Button>

                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={settingUser.rolesPage ? settingUser.rolesPage.DataList : []}
                    rowKey={(record)=>record.id}
                    onChange={this.onChange.bind(this)}
                    pagination={this.state.paginationProps}
                />
            </div>
        )
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
    reload = () => {
        window.location.reload();
    };
}
export default connect(({ settingUser, global, loading }) => ({
    settingUser,
    loading: loading.effects['settingUser/GetRoles'],
}))(Role);
