import methodMap from './methodMap'
import axios from 'axios'
import Qs from 'qs'

// const _token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcHAuZ296b29tLmNuIiwiaWF0IjoxNTI2Mjg2MDcyLCJzdWIiOiJ7XCJ1c2VyTmFtZVwiOlwiMTM1MDAwMDAwMDFcIixcInVzZXJTZXhcIjoxLFwidXNlckV4cGlyZVRpbWVcIjpudWxsLFwidXNlckF0dHJpXCI6bnVsbCxcIm9yZ0lkXCI6XCJSMS0xNzItMTc3XCIsXCJvcmdOYW1lXCI6XCJB6L2m6ZifLWFicy3ph43luobkurrlr7_kv53kv53pmanmsZ_ljJfliIblhazlj7hcIixcImxvZ29QYXRoXCI6XCJodHRwOi8vaW1hZ2UuZ296b29tLmNuLzgwYjU1NTBjODUwYjRiNjY5ZTI2MWRiMWYzNTUwNTY3LmpwZ1wiLFwidXNlck1vYmlsZVwiOlwiMTM1MDAwMDAwMDFcIixcInVzZXJJZFwiOjk3OTY1NzUzNDI2Mzc1MDY1NyxcInVzZXJFbWFpbFwiOm51bGwsXCJ1c2VyQWNjb3VudFN0YXR1c1wiOjEsXCJtYW5hZ2VyXCI6MSxcImRwdElkXCI6OTc5NjY2MjYxODEwMjAwNTc3LFwiZHB0TmFtZVwiOlwi6KGM5pS_6YOoXCIsXCJ1c2VyTmlja05hbWVcIjpcIueuoeeQhuWRmFwiLFwidXNlclBhc3N3b3JkXCI6XCI4ZDk2OWVlZjZlY2FkM2MyOWEzYTYyOTI4MGU2ODZjZjBjM2Y1ZDVhODZhZmYzY2ExMjAyMGM5MjNhZGM2YzkyXCIsXCJ1c2VyUGF0aFwiOlwiaHR0cDovL2ltYWdlLmdvem9vbS5jbi9lMjU1ODc1NGFmYzg0MDBlYWNlMTkwYzFmZjEwMGY2MFwiLFwicGVybXNcIjpbXCIxMVwiLFwiMjJcIixcIjEyXCIsXCIyM1wiLFwiMjRcIixcIjE0XCIsXCIxNVwiLFwiMTZcIixcIjE3XCIsXCIxOFwiLFwiMTlcIixcIjFcIixcIjJcIixcIjNcIixcIjIwXCIsXCIyMVwiXSxcInRva2VuXCI6bnVsbCxcImNoYW5nZVBhc3N3b3JkU3RhdHVzXCI6MSxcInN3aXRjaFdhcm5GbGFnXCI6MCxcImNvZGVcIjpudWxsLFwibm90aWZ5Q2Fyc1wiOlwiXCJ9In0.Z-SLCDtrZl9Bh1rbNEmGCPgUh40OnxwzSJuV-sy77fY';

const config = {
  //基础URL
  baseURL: 'http://localhost:8080',
  //请求延时时间
  timeout: 2000,
  //token
  // 'x-access-token': _token,
  // 是否是跨域请求
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  //请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json'
};
const AxiosInst = axios.create(config);

//这是干啥的，如果不创建空类？，main.js在import导入的时候，“HTTP”上会报错“导入的模块中未声明默认导出”
//如果把class的定义放到结尾变成
// export default class Http{};就会报错Uncaught TypeError: Cannot set property 'install' of undefined
class Http{}

Http.install = function(Vue){
  Vue.prototype.request = function(method,params){
    let mtdMap = methodMap[method];
    if(mtdMap){
      let paramsType = typeof (params);
      if (paramsType === null || paramsType !== 'object') {
        params = {};
      }
      if (typeof mtdMap.method === 'undefined') {
        console.log('method 错误', '缺少请求 method 方法', '\n');
        return false;
      }
      if (mtdMap.method === 'post') {
        return Vue.prototype.apiPost(mtdMap.url, params);
      }else if (mtdMap.method === 'get') {
        return Vue.prototype.apiGet(mtdMap.url, params);
      } else {
        return false;
      }
    }else{
      closeLoading();
      console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n');
    }
  }
  Vue.prototype.apiPost = function (url, params){
    return new Promise((resolve, reject) =>{
      console.log(params);
      AxiosInst.post(url, params).then((response)=>{
        setTimeout(() => closeLoading(), 800);
        console.log(response);
        resolve(response.data);
      }).catch((error) => {
        closeLoading();
        reject(error);
      })
    })
  };

  Vue.prototype.apiGet = function (url, params){
    return new Promise((resolve, reject) => {
      AxiosInst.get(url).then((response) => {
        setTimeout(() => closeLoading(), 800);
        resolve(response.data);
      }).catch((error) => {
        closeLoading();
        reject(error);
      })
    });
  };

  function closeLoading(){}
};

export default Http;
