import React from 'react';
import { createModalContainer } from '../../../components/changeModal';

class Component extends React.Component {
    render() {
        return (
            <div>
                1111111
            </div>
        )
    }
}

export const AddLebal = createModalContainer(
    Component,
    true,
    {maskClosable: false}
);

export default AddLebal;
