# litadmin
> axios请求接口的方法，一个基于基于 promise 的 HTTP 库

## 介绍


### 说明

　这是一个用axios，QS,封装的库。
    
### 项目结构
```
├── node_modules  #依赖包管理
├── index.js #封装axios的配置文件
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

### 相关技术：

* axios: 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。

## 项目编译和运行


第一步： 先安装node v8.2.1环境，可以用nvm安装，支持多版本切换
可参看链接：https://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html

第二步：下载项目
先新建Vue项目，在项目里下载依赖包
```
#npm命令下载
npm install @xing.wu/axios --save
```
假定依赖包已经下载完成。

第三步：引用
（1）在VUE项目中的src文件夹下新建一个API文件夹，文件夹里面新建一个api.js
（2）调用包
```
   import API from '@xing.wu/axios'
```
api.js里面写一些API的接口，进行接口管理
###  接口请求方式 POSTJSON POSTFORM GET PUT DELETE PATCH
    例如（以POSTFORM为例）： 
```
import API from '@xing.wu/axios';
import { Message } from 'element-ui';
// 错误处理
function errorHandle(data) {
  Message.error(data.toString());
}
// 处理handle
function handle(data) {
  if (data.status !== '0') {
    throw Error(data.message);
  }
  return data.data;
}
API.setResponseHandle(handle);
API.setErrorHandle(errorHandle);

export default {
  getExample: (params) => API.GET('/stastic/getCertNum', params),
};
```

### 在VUE项目的main.js调用api.js,把API的方法挂载到Vue实例上
例如：
```
        import API from '../src/api/api'
        Vue.prototype.$API = API
```
这样全局都可以使用这个请求方法了！！！
### （3）调用方法
loginParams 为请求的参数
```
      Vue.$API.login(loginParams).then(result => {
        # 请求成功的操作
      }).catch( error => {
        # 请求失败的操作,通常可以不要这个操作，都被api中的默认处理掉了
      })
```