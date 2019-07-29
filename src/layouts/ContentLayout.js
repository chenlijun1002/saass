import React, { PureComponent, Fragment } from 'react';
import GlobalHeader from './Header';

export default class ContentLayout extends PureComponent {
  render() {
    const {
        children, 
        toggle,      
      } = this.props;   
    return (
      <Fragment >
        <GlobalHeader {...this.props}  toggle={this.toggle}/>
      </Fragment>
    );
  }
}
