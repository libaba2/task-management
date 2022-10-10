import request from '../config/axiosConf';

export const login = (data)=>{
    return request.post('/user/login',data)
}
export const queryTaskInfos = ()=>{
    return request.get('/task/queryTask')
}
export const addTaskInfo = (data)=>{
    return request.post('/task/addTask',data)
}