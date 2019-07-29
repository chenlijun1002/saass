import React from 'react';
import {Modal} from 'antd';

export const createModalContainer = (
    Component,
    noOkCancel = false,
    modalProps = {}
  ) => {
    class WithLoadingComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            disabledOk: false,
            okLoading: false
          };
        }
  
        componentWillUnmount() {
          this.isUnmounted = true;
        }
  
        render() {
          return (
            <Modal
              visible
              width={520}
              onCancel={() => {
                this.content && this.content.onCancel ? this.content.onCancel() : this.props.cancel();
              }}
              footer={
                !noOkCancel
                  ? [
                      <Button
                        key="cancel"
                        size="large"
                        onClick={() => {
                          this.content && this.content.onCancel ? this.content.onCancel() : this.props.cancel();
                        }}
                      >
                        取消
                      </Button>,
                      <Button
                        key="Ok"
                        size="large"
                        type="primary"
                        disabled={this.state.disabledOk}
                        onClick={async () => {
                          if (this.content && this.content.onOk) {
                            this.setState({okLoading: true});
                            await this.content.onOk();
                            if (!this.isUnmounted) {
                              this.setState({okLoading: false});
                            }
                          } else {
                            this.props.ok();
                          }
                        }}
                        loading={this.state.okLoading}
                      >
                        确定
                      </Button>
                    ]
                  : []
              }
              {...modalProps}
            >         
                <Component
                  ref={e => {
                    this.content = e;
                  }}
                  {...this.props}
                  disableOk={disabledOk => this.setState({disabledOk})}
                />
            </Modal>
          );
        }
      }
      WithLoadingComponent.propTypes = {
        data: React.PropTypes.object,
        ok: React.PropTypes.func,
        cancel: React.PropTypes.func,
        param: React.PropTypes.object
      };
  
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          visible: false
        };
        this.show = this.show.bind(this);
        this.cancel = this.cancel.bind(this);
        this.ok = this.ok.bind(this);
      }
  
      show(param, onOk, onCancel) {
        this.onOk = onOk;
        this.onCancel = onCancel;
        this.setState({visible: true, param});
      }
  
      ok(obj) {
        this.setState({visible: false});
        if (this.onOk) {
          this.onOk(obj);
        }
      }
  
      cancel() {
        this.setState({visible: false});
        if (this.onCancel) {
          this.onCancel();
        }
      }
  
      render() {
        if (!this.state.visible) {
          return null;
        } else {
          return <WithLoadingComponent param={this.state.param} ok={this.ok} cancel={this.cancel} />;
        }
      }
    }
    return Wrapper;
  };

