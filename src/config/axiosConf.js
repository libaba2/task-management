
import axios from 'axios'
import store from '../store';
 
axios.defaults.baseURL = "http://127.0.0.1:9000/"//api前缀
 
const instance = axios.create({
  xsrfCookieName: 'xsrf-token'
});
 
instance.interceptors.request.use(function (config) {
  store.dispatch({type: 'SET_REQLOADING', value: true})
  return config;
}, function (error) {
  return Promise.reject(error);
});
 
instance.interceptors.response.use(function (response) {
  store.dispatch({type: 'SET_REQLOADING', value: false})
  return response.data
}, function (error) {
  return Promise.reject(error);
});

export default instance;