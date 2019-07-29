import React, { PureComponent } from 'react';

export default class NoticePreview extends PureComponent {
    render() {
        const { value } = this.props;

        return (
            <div className="rc-design-component-notice-preview">
                {value.content}
            </div>
        );
    }
}