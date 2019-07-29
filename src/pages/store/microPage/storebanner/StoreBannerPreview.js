import React, { PureComponent } from 'react';
import { connect } from 'dva';

class StoreBannerPreview extends PureComponent {
  state = {
    logoImageUrl: '',
    StoreName: '',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'storeinfo/GetStoreInfo',
      callback: {
        success: res => {
          if (res.Code === 0) {
            this.setState({
              logoImageUrl: res.Data ? `${res.Data.StoreLogo}?x-oss-process=style/240` : '',
              StoreName: res.Data ? res.Data.StoreName : '',
            });
          }
        },
      },
    });
  }

  onError = e => {
    e.target.src =
      'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/store/storelogo.png';
  };

  render() {
    const { value, cdnUrl } = this.props;
    const { logoImageUrl, StoreName } = this.state;
    return (
      <div>
        {value.layout === '1' ? (
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 185,
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${value.shareimg ||
                  'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png'})`,
              }}
            >
              <div className="cap-shop-banner__cover-mask" />
              <div
                style={{
                  position: 'absolute',
                  top: 110,
                  width: '100%',
                }}
              >
                <div className="cap-shop-banner__content">
                  <div className="cap-shop-banner__logo">
                    {logoImageUrl ? (
                      <img
                        src={`${cdnUrl}/${logoImageUrl}`}
                        alt="店铺logo"
                        onError={this.onError}
                      />
                    ) : null}
                  </div>
                  <div className="cap-shop-banner__right-content">
                    <h3 className="cap-shop-banner__right-content-title--middle">{StoreName}</h3>
                    <p className="cap-shop-banner__sum-content">
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-fff">
                          全部商品999
                        </span>
                      </a>
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-fff">
                          上新30
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {value.layout === '2' ? (
          <div className="rc-design-vue-preview rc-design-component-shop-banner-preview">
            <div
              className="cap-shop-banner cap-shop-banner--type-2"
              store_info_style="1"
              background_image="http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png"
              type="shop_banner_weapp"
              __zent-design-uuid__="3a9f77ea-49a7-44fb-8a80-d2cb36386665"
            >
              <div
                className="cap-shop-banner__cover"
                style={{
                  backgroundImage: `url(${value.shareimg ||
                    'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png'})`,
                }}
              >
                <div className="cap-shop-banner__cover-mask" />
              </div>
              <div className="cap-shop-banner__inner">
                <div className="cap-shop-banner__content">
                  <div className="cap-shop-banner__logo">
                    {logoImageUrl ? (
                      <img
                        src={`${cdnUrl}/${logoImageUrl}`}
                        alt="店铺logo"
                        onError={this.onError}
                      />
                    ) : null}
                  </div>
                  <div className="cap-shop-banner__right-content">
                    <h3 className="cap-shop-banner__right-content-title--middle">{StoreName}</h3>
                    <p className="cap-shop-banner__sum-content">
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-999">
                          全部商品999
                        </span>
                      </a>
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-999">
                          上新30
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {value.layout === '3' ? (
          <div className="rc-design-vue-preview rc-design-component-shop-banner-preview">
            <div
              className="cap-shop-banner cap-shop-banner--type-3"
              store_info_style="3"
              background_image="http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png"
              type="shop_banner_weapp"
              __zent-design-uuid__="3a9f77ea-49a7-44fb-8a80-d2cb36386665"
            >
              <div
                className="cap-shop-banner__cover"
                style={{
                  backgroundImage: `url(${value.shareimg ||
                    'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png'})`,
                }}
              >
                <div className="cap-shop-banner__cover-mask" />
              </div>
              <div className="cap-shop-banner__inner">
                <div className="cap-shop-banner__content">
                  <div className="cap-shop-banner__logo">
                    {logoImageUrl ? (
                      <img
                        src={`${cdnUrl}/${logoImageUrl}`}
                        alt="店铺logo"
                        onError={this.onError}
                      />
                    ) : null}
                  </div>
                  <div className="cap-shop-banner__right-content">
                    <h3 className="cap-shop-banner__right-content-title--middle">{StoreName}</h3>
                    <p className="cap-shop-banner__sum-content">
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-999">
                          全部商品999
                        </span>
                      </a>
                      <a>
                        <span className="cap-shop-banner__sum-content-total xkd-color-999">
                          上新30
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {value.layout === '4' ? (
          <div className="rc-design-vue-preview rc-design-component-shop-banner-preview">
            <div
              className="cap-shop-banner cap-shop-banner--type-4"
              store_info_style="4"
              background_image="http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png"
              type="shop_banner_weapp"
              __zent-design-uuid__="3a9f77ea-49a7-44fb-8a80-d2cb36386665"
            >
              <div
                className="cap-shop-banner__cover"
                style={{
                  backgroundImage: `url(${value.shareimg ||
                    'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png'})`,
                }}
              >
                <div className="cap-shop-banner__cover-mask" />
              </div>
              <div className="cap-shop-banner__inner">
                <div className="cap-shop-banner__content">
                  <div className="cap-shop-banner__logo">
                    {logoImageUrl ? (
                      <img
                        src={`${cdnUrl}/${logoImageUrl}`}
                        alt="店铺logo"
                        onError={this.onError}
                      />
                    ) : null}
                  </div>
                  <div className="cap-shop-banner__right-content">
                    <h3 className="cap-shop-banner__right-content-title--middle">{StoreName}</h3>
                    <p className="cap-shop-banner__sum-content">
                      <a>
                        <span className="cap-shop-banner__sum-content-total">全部商品999</span>
                      </a>
                      <a>
                        <span className="cap-shop-banner__sum-content-total">上新30</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default connect(({ storeinfo, global }) => ({
  cdnUrl: global.oemInfo.cdnUrl,
  storeinfo,
  global,
}))(StoreBannerPreview);
