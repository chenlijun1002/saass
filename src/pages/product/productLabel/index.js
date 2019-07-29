import React, { Component } from 'react';
import {Button,Input,Table,Popconfirm,message,Form,Divider,Modal} from 'antd';
import moment from 'moment';
import styles from './index.less';
import { connect } from 'dva';

const FormItem = Form.Item;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
 

  @connect(({ global, pruductLebal }) => ({
    oemInfo: global.oemInfo,
    pruductLebal:pruductLebal.pruductLebal,
    
  }))

  class ProductLabel extends Component {
    constructor(props) {
        super(props);
        this.state ={
            pagination: {
                showSizeChanger: true,
                showTotal: total => `共 ${total} 条记录`,
                pageSize: 10,
                total: 0,
            },
            addGroupName: '',
            editLabelName: '',
            loading: true,
            visible: false,
            isFetching: false,
        }
    }
 
    componentDidMount() {
        this.getLabelList(1);
        this.props.form.validateFields();
    }

    componentWillMount() {
        this.getLabelList(1);
    }

    // 添加标签
    clickAddLabel = name => {
        const { dispatch } = this.props;
          dispatch({
            type: 'pruductLebal/AddLabel',
            payload: {
               name: name,
            },
            callBack: {
                success: res => {
                    if(res.Code === 0) {
                        message.success('添加成功', 2);
                        this.setState(
                            {
                                loading: true,
                            },
                            () => {
                                this.getLabelList(1);
                            }
                        );
                    }
                },
                error: res => {
                    message.error(res.Msg, 2);
                },
            },
          }); 
    };

    // 修改标签
    clickEditLabel = (id, name)=> {
        const { dispatch } = this.props;
        dispatch({
          type: 'pruductLebal/EditLebalName',
          payload: {
              id: id,
             name: name,
          },
          callBack: {
              success: res => {
                  if(res.Code === 0) {
                      message.success('修改成功', 2);
                      this.setState(
                          {
                            loading: true,
                          },
                          () => {
                            this.getLabelList(1);
                          }
                      );
                  }
              },
              error: res => {
                  message.error(res.Msg, 2);
              },
          },
        }); 
    }

    // 删除
    clickDelete = id => {
        const { dispatch } = this.props;
        const deleteId = id.toString();
        dispatch({
            type: 'pruductLebal/DeleteLebal',
            payload: {
              id: deleteId,
            },
            callBack: {
              success: res => {
                if (res.Code === 0) {
                  message.success('删除成功');
                  this.setState({
                      loading: true
                  },
                    () => {
                        this.getLabelList(1);
                    }
                  );
                }
              },
              error: res => {
                message.error(res.Msg);
              },
            },
          });
    }

    //获取标签列表
    getLabelList= pageIndex => {
        const { dispatch, pruductLebal} = this.props;
        dispatch({
            type: 'pruductLebal/GetLabelList',
            payload: {
                pageIndex: pageIndex,
                pageSize: this.state.pagination['pageSize']
            },
            callBack: {
                success: res => {
                    if(res.Code ===0) {
                        this.setState({
                            loading: false,
                            pagination: {
                                pageSize: this.state.pagination['pageSize'],
                                current: pageIndex,
                                total: res.Data.Total,
                                showSizeChanger: true,
                                showTotal: total => `共 ${total} 条记录`,
                            },
                        });
                    }
                },
                error: res => {
                    message.error(res.Msg);
                },
            },
        });
    }

    // change
    changeTable =(data, filters, sorter) => {
        this.setState(
            {
              loading: true,
              pagination: {
                pageSize: data.pageSize,
                total: data.total,
                showSizeChanger: true,
                showTotal: total => `共 ${total} 条记录`,
              },
              pageIndex: data.current,
            }, ()=> {
                this.getLabelList(data.current); 
            })
    }

    showAddModal = option => {
        this.setState({
            visible: true,
            clickOption: option,
          });
    }

    showEditModal = (option, data) => {
        this.setState({
            visible: true,
            clickOption: option,
            id: data.id,
            dataName: data.name
          });
    }

    handleOk = (e) => {
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

      handleSubmit =e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) =>{
            if (this.state.clickOption === 'add') {
                const name = values.name;
                if(!err) {
                    this.handleOk();
                    this.clickAddLabel(name);
                }
            } else {
                const name = values.name;
                if(!err) {
                    this.handleOk();
                    this.clickEditLabel(this.state.id, name);
                }
            }
         
        })
      }
    render() {
        const {getFieldDecorator, getFieldError, getFieldsError, isFieldTouched} = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const {loading, dataName, clickOption} = this.state;
        const {pruductLebal}= this.props;
        const deleteLebal = (
            <div className="popContent">
                <p>删除标签</p>
            </div>
        );

        return (
            <Form className={styles.contentBox}>               
                <Button
                    type="primary"
                    style={{marginBottom: 16}}
                    onClick={() =>this.showAddModal('add')}
                >
                    新增标签
                </Button>
                <Table
                 dataSource={pruductLebal}
                 pagination={this.state.pagination}
                 rowKey={record => record.Id}
                 loading={loading}
                 onChange={this.changeTable}
                 columns={[
                    {
                    title: '标签名称',
                    dataIndex: 'name',
                    key: 'name',
                    },
                    {
                      title: '标签绑定商品数',
                      dataIndex: 'productNum',
                      key: 'productNum',
                    },
                    {
                      title: '创建时间',
                      dataIndex: 'createTime',
                      key: 'createTime',
                      align: 'left',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: (Text, record) => {
                          return (
                            <div>
                                <a
                                    style={{marginBottom: 16,cursor: 'pointer'}}
                                    onClick={
                                        () => this.showEditModal('edit', record)
                                    }
                                >
                                    编辑
                                </a>
                                <Divider type="vertical" />
                                <Popconfirm
                                  placement="topRight"
                                  title={deleteLebal}
                                  onConfirm={() => this.clickDelete(record.id)}
                                >
                                  <a href="javascript:;">删除</a>
                                </Popconfirm> 
                            </div>
                        )
                      }
                    },
                 ]}
                />
                <Modal
                    title={clickOption === 'edit' ? '编辑标签': '新增标签'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem validateStatus={nameError ? 'error' : ''} label="商品标签" hasFeedback className={styles.inputForm}>
                            {getFieldDecorator('name', {
                                // initialValue: dataName,
                                rules: [
                                    {required: true, message: '标签不能为空', whitespace: true},
                                    {pattern: /^.{1,6}$/, message: '标签不能超过6个字'}
                                ]
                            })(<Input placeholder="不超过6个字" />)}
                        </FormItem>
                        <FormItem style={{textAlign: 'right'}}>
                            <Button onClick={this.handleCancel} style={{marginRight: 16}}>
                                取消
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.isFetching}
                                disabled={hasErrors(getFieldsError())}
                            >
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </Form>
        )
    }
  }

  export default Form.create({})(ProductLabel);

