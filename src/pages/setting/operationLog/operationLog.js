import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Tag,
  Button,
  Layout,
  DateRangePicker,
  Select,
  Form,
  Radio,
} from 'zent';
import {Spin, Card, Table} from 'antd';
import HeaderTab from '@/components/HeaderTab';
import Divider from '@/components/Divider';
import styles from './index.less';
import Detail from './logDetail';
const Option = Select.Option;
const { Row, Col } = Layout;

const namespace = 'oplog';

const { Field, FormInputField, FormSelectField, FormDateRangePickerField, createForm } = Form;

const RadioGroup = Radio.Group;

class FieldForm extends React.Component {
  onRadioChange = e => {
    this.setState({
      formLayout: e.target.value,
    });
  };

  submit = (values, zentForm) => {
    //Notify.success(JSON.stringify(values));
    const { _this, dispatch } = this.props;
    const { oplog } = _this.props;
    const { users, module } = oplog;
    let userId = 0;
    users.forEach(item => {
      if (item.phone == values.userId) {
        userId = item.id;
      }
    });
    _this.Seach({
      userId: userId,
      module: values.module,
      beginDate: values.dateRange[0],
      endDate: values.dateRange[1],
      pageSize: 20,
      pageIndex: _this.state.pageIndex,
    });
  };
  Reset = () => {
    const { _this } = this.props;
    this.props.zentForm.resetFieldsValue();
    _this.Seach({
      userId: '',
      module: '',
      beginDate: '',
      endDate: '',
      pageSize: 20,
      pageIndex: 1,
    });
  };
  render() {
    const { handleSubmit, _this } = this.props;
    const { oplog } = _this.props;
    const { users, module } = oplog;
    let usersList = [];
    if (users) {
      users.forEach((item, index) => {
        usersList.push(item.phone);
      });
    }
    return (
      <div style={{ minWidth: '996px' }}>
        <Form inline={true} onSubmit={handleSubmit(this.submit)}>
          <FormSelectField name="userId" label="操作账号" data={usersList} />
          <FormSelectField name="module" label="操作模块" data={module} />
          <FormDateRangePickerField
            name="dateRange"
            label="操作日期"
            type="split"
            value={[]}
            dateFormat="YYYY-MM-DD HH:mm:ss"
          />
          <div className="zent-form__form-actions xkd-ml67">
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
            <Button onClick={this.Reset}>重置</Button>
          </div>
        </Form>
      </div>
    );
  }
}
const WrappedForm = createForm()(FieldForm);

class OperationLog extends React.Component {
  state = { pageIndex: 1, detailId: 0, visible: false, loading: false };
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch({
      type: `${namespace}/UserList`,
    });
    dispatch({
      type: `${namespace}/ModuleList`,
    });
    this.Seach({
      pageSize: 20,
    });
  }
  detailModal = ref => {
    this.detail = ref;
  };
  render() {
    const COLUMNS = [
      {
        title: '操作账号',
        name: 'userName',
        width: '100px',
      },
      {
        title: '操作模块',
        name: 'moduleName',
        width: '100px',
      },
      {
        title: '操作描叙',
        bodyRender: data => {
          return <div>{data.eventDescr}</div>;
        },
      },
      {
        title: '创建时间',
        name: 'createTime',
        width: '300px',
      },
      {
        title: '操作',
        width: '15%',
        name: 'sold_num',
        bodyRender: data => {
          return (
            <div>
              <a onClick={() => this.showDetail(data.id)}>查看详情</a>
            </div>
          );
        },
      },
    ];

    const { oplog, loading } = this.props;
    return (
      <Spin spinning={loading}>
        <Card>
          <div className="layout-demo-basic xkd-font14">
            <div>
              <WrappedForm _this={this} />
            </div>
            <Detail _this={this} />
            <Table
              columns={COLUMNS}
              //loading={loading}
              datasets={oplog.resultData.Data ? oplog.resultData.Data.DataList : []}
              rowKey={`${Math.random()}`}
              onChange={this.onChangePage.bind(this)}
              pageInfo={{
                total: oplog.resultData.Data ? oplog.resultData.Data.Total : 0,
                pageSize: oplog.seachData.pageSize,
                current: this.state.pageIndex,
              }}
            />
          </div>
        </Card>
      </Spin>
    );
  }

  showDetail = id => {
    const { dispatch } = this.props;
    this.setState({ detailId: id, visible: true });
    dispatch({
      type: `${namespace}/Detail`,
      params: { id: id },
    });
  };
  changeUserId = e => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/changeUserId`,
      userId: e.target.value,
    });
  };
  changeModule = e => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/changeModule`,
      modulestr: e.target.value,
    });
  };
  changeStartTime = e => {
    const { dispatch } = this.props;
    console.log(e);
    dispatch({
      type: `${namespace}/changeStartTime`,
      startTime: e,
    });
  };
  changeEndTime = e => {
    console.log(e);
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/changeTime`,
      startTime: e[0],
      endTime: e[1],
    });
  };
  Reset = () => {
    const { dispatch, oplog } = this.props;
    dispatch({
      type: `${namespace}/resetSearchData`,
    });
  };
  Seach = params => {
    const { dispatch, oplog } = this.props;
    this.setState(
      {
        pageIndex: 1,
      },
      () => {
        // dispatch({
        //   type: `${namespace}/LogList`,
        //   params: { ...oplog.seachData, pageIndex: this.state.pageIndex }
        // })
        dispatch({
          type: `${namespace}/LogList`,
          params: { ...params },
        });
      }
    );
  };
  onChangePage(conf) {
    const { dispatch, oplog } = this.props;

    this.setState(
      {
        pageIndex: conf.current,
      },
      () => {
        window.scrollTo(0, 400);
        dispatch({
          type: `${namespace}/LogList`,
          params: { ...oplog.seachData, pageIndex: this.state.pageIndex },
        });
      }
    );
  }
}

export default connect(({ oplog, global, loading }) => ({
  oplog,
  loading: loading.effects['oplog/LogList'],
}))(OperationLog);
