import { message, Button, notification } from 'antd'

const placement={placement:'bottomRight'}

export default {
    
    showErrorMsg(text){
        return notification['error']({
            message: '错误！',
            description:text,
            placement,
          });
    },
    showSuccessMsg(text){
        return notification['success']({
            message: '成功！',
            description:text,
            placement,
          });
    },
    showWaringMsg(text){
        return notification['warning']({
            message: '警告！',
            description:text,
            placement,
          });
    },
    showInfoMsg(text){
        return notification['info']({
            message: '提示！',
            description:text,
            placement,
          });
    },

}