import React, { Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Card, Button } from 'antd';
import HeaderTab from '@/components/HeaderTab';
import Divider from '@/components/Divider';
import styles from './index.less';

const datasets = [
  {
    item_id: '5024217',
    bro_uvpv: '0/0',
    stock_num: '60',
    sold_num: 0,
  },
  {
    item_id: '5024277',
    bro_uvpv: '0/0',
    stock_num: 59,
    sold_num: 0,
  },
  {
    item_id: '13213123',
    bro_uvpv: '0/0',
    stock_num: 159,
    sold_num: 0,
  },
];

const columns = [
  {
    title: '商品名称',
    bodyRender(data) {
      return <div>{data.item_id}</div>;
    },
  },
  {
    title: '现价',
    name: 'bro_uvpv',
    textAlign: 'right',
    width: '15%',
  },
  {
    title: '原价',
    name: 'stock_num',
    width: '15%',
    textAlign: 'right',
    //isMoney: true
  },
  {
    title: '操作',
    width: '25%',
    name: 'sold_num',
    bodyRender: data => {
      return (
        <div>
          <span className={`${styles.brandColor} ${styles.pointer}`}>删除</span>
          <Divider type="vertical" />
          <span
            className={`${styles.brandColor} ${styles.pointer}`}
            onClick={() => this.editPage(1)}
          >
            编辑
          </span>
          <Divider type="vertical" />
          <span className={`${styles.brandColor} ${styles.pointer}`}>预览</span>
        </div>
      );
    },
  },
];

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      maxPageToShow: 8,
      pageSize: 20,
      // activeId:`${this.props.location.pathname}`,
      tabs: [
        {
          title: '出售中',
          key: `/${window.storeId}/goods/list/onsale`,
          // disabled: true
        },
        {
          title: '已售罄',
          key: `/${window.storeId}/goods/list/soldout`,
        },
        {
          title: '仓库中',
          key: `/${window.storeId}/goods/list/instock`,
        },
      ],
    };
  }
  componentWillMount() {
    const { dispatch, form } = this.props;
  }

  onChange = data => {
    console.log(data);
    this.setState({
      current: data.current,
      pageSize: data.pageSize,
    });
  };
  onTabChange = id => {
    console.log(id, router, '=========');
    this.setState(
      {
        activeId: id,
      },
      () => {
        router.replace({
          pathname: `${id}`,
        });
        // if(id==1){
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages`
        //     })
        // }else{
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages/draft`
        //     })
        // }
      }
    );
  };

  releaseGoods = () => {
    router.replace({
      pathname: `/${window.storeId}/goods/releaseGoods`,
    });
  };

  render() {
    return (
      <Fragment>
        <HeaderTab
          _this={this}
          type="slider"
          activeId={this.state.activeId}
          onChange={this.onTabChange}
          tabs={this.state.tabs}
        >
          {/* <Tabs
            type="slider"
            activeId={this.state.activeId}
            onChange={this.onTabChange}
            tabs={this.state.tabs} /> */}
        </HeaderTab>

        <Card>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" style={{ marginRight: 16 }} onClick={this.releaseGoods}>
              发布商品
            </Button>
            <Button>刷新</Button>
          </div>
          <Table
            columns={columns}
            datasets={datasets}
            rowKey="item_id"
            onChange={this.onChange.bind(this)}
            pageInfo={{
              limit: this.state.limit,
              current: this.state.current,
              maxPageToShow: this.state.maxPageToShow,
              total: this.state.total,
              pageSize: [20, { value: 30, isCurrent: true }],
            }}
          />
        </Card>
      </Fragment>
    );
  }
}

export default connect(({ storenavigation, global, loading }) => ({
  storenavigation,
}))(Pagination);
