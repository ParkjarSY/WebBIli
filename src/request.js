import Axios from 'axios'
import router from '@/router/index'

const request = Axios.create({
    baseURL:"http://112.74.99.5:3000/web/api",
    timeout:3000,
})

//请求拦截
request.interceptors.request.use(config => {
    if(localStorage.getItem('token') && localStorage.getItem('id')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },err =>{
    console.log('error');
})

//相应拦截
request.interceptors.response.use(res =>{
    return res.data
  },error=>{
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          router.push('/login')
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    return Promise.reject(error);
  })

export default request;