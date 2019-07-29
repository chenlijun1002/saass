import { message } from 'antd';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// connect(({ global }) => ({
//     global,    
// }))
export function showMessage(msg) {      
    window.g_app._store.dispatch({
        type:'global/changeIsStop'
    })    
    return message.error(msg, 2);
}