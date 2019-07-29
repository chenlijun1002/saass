import { Modal, Button, Form, Input, Select, message } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

export default class SelectRole extends React.Component {
   
    setRoleId=(e)=>{
        const { form } = this.props;
        form.setFieldsValue({
            roleId: e,
        });
        console.log(form.getFieldValue('roleId'));
    }
    Reoles=()=>{
        window.open(`#/${window.storeId}/setting/store/authority/roles`);
    }
    render() {
        const {
           data,_this
        } = this.props;
        return (
            <div style={{whiteSpace:'nowrap'}}>
                <Select  {...this.props}  onChange={this.setRoleId}>
                    {
                        data && data.map((m, index) => {
                            return <Option value={m.id} key={m.id}>{m.name}</Option >
                        })
                    }
                </Select >
                <a className="xkd-ml8" onClick={_this.getRoles}>刷新</a>
                <a className="xkd-ml8" onClick={this.Reoles}>新增</a>
            </div>
        )
    }
}