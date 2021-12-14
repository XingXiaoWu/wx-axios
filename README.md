# 项目使用

## 1.集成
```
npm install @xing.wu/axios
```
## 2.使用

### 2.1 内置方法

包含方法如下：

请求方法：
```bash
  # json类型的POST请求
	POSTJSON,
  # form类型的POST请求
	POSTFORM,
  # GET请求
	GET,
  # PUT请求
	PUT,
  # DELETE类型请求
	DELETE,
  # PATCH类型请求
	PATCH,
  # GET类型的下载请求
	DOWNLOAD,
  # POST类型的下载请求
	DOWNLOADPOST
```

移除内置拦截器
```
	removeDefaultInterceptors,
```

设置默认错误处理
```
  setErrorHandle
```
### 2.2 兜底错误处理

框架内已经封装，此处列一下代码

```js
import axios from '@xing.wu/axios'
// 可替换为任意UI框架提示
import { Message } from 'element-ui'

// 移除默认拦截器
// axios.removeDefaultInterceptors()
// 兜底处理
const errorHandle = (error) => {
  // 处理错误,尝试获取error的message展示
  const { message } = error
  Message.error(message)
}
axios.setErrorHandle(errorHandle)

// 业务自定义拦截器，先执行
axios.interceptors.request.use((config) => config)

// 后执行
axios.interceptors.response.use(
  (response) => {
    // 判断是否为blob类型
    if (response.config.responseType === 'blob') {
      return response
    }
    // 添加自己业务的格式判定业务成功
    if (response.data.success || response.data.success === undefined) {
      return response
    }
    //   不是blob，且success不为true，意味着业务出错
    const error = new Error(response.data.msg || '')
    error.response = response.data || {}
    return Promise.reject(error)
  },
  (error) => Promise.reject(error),
)

export default axios

```

### 2.4 统一前缀的使用

如具有统一前缀，可配置在环境变量`VUE_APP_BASE_API`中配置

### 2.3 网络请求的使用
```js
import axios from '../request'

export default {
  example1: (params) => axios.POSTJSON('/xxx/xxx/xxx', params),
  example2: (params) => axios.GET('/xxx/xxx/xxx', params),
  example3: (params) => axios.POSTFORM('/xxx/xxx/xxx', params),
  example4: (params) => axios.DOWNLOAD('/xxx/xxx/xxx', params),
  example5: (params) => axios.DOWNLOADPOST('/xxx/xxx/xxx', params),
}

```
### 2.4 返回信息

目前后端定义的格式为
```js
{
  status:0,
  message: '',
  data:{},
  success:true,
}
```
当后端接口符合上述格式时，会先判断`success`是否存在，且是否为true

1. `success`存在，且为`true`返回data

例如：
```js
// 假设请求返回内容为
// {
//   status:0,
//   message: '',
//   data:{a:123},
//   success:true,
// }
example1({}).then(response => {
  // 打印结果{a:123}
  console.log(response)
})
```

2. `success`存在，且为`false`，走catch

例如：
```js
// 假设请求返回内容为
// {
//   status:0,
//   message: '',
//   data:{a:123},
//   success:false,
// }
example1({}).then(response => {
  
}).catch(error => {
  console.log('走到这里')
})
```

3. `success`不存在，为`undefined`，则直接返回`response`本身（兼容旧接口）
例如：
```js
// 假设请求返回内容为
// {
//   status:0,
//   message: '',
//   data:{a:123},
// }
example1({}).then(response => {
  // 打印结果
  // {
  //   status:0,
  //   message: '',
  //   data:{a:123},
  // }
  console.log(response)
})
```
### 2.5 错误处理
1. 常见的错误场景，只需要一个弹窗提示即可

此类错误处理已经作为兜底处理，见上方2.2兜底错误处理

此类接口，无需写`catch`操作

例如：
```js
example1({}).then(response => {
  // 业务操作省略
})
```
假设此接口报错，框架已处理，会有一个弹窗提示

2. 需单独处理错误业务

假设某个接口如果业务报错，需要根据不同的错误码进行不同提示，且不需要弹窗提示

例如：
```js
import { Message } from 'element-ui';

example1({}).then(response => {
  // 业务操作省略
}).catch(error => {
  // 移除弹窗提示
  Message.closeAll()
  // 获取后台返回的完整错误内容
  const { status } = error?.response
  if (status === 'xxx'){
    // 
  } else {
    // 
  }
})
```

只要前端请求发出去了，不管是请求失败，还是业务失败，`catch`中的`error`都会具有`response`属性

业务失败的情况下，`response`为后台返回的整个对象
# 提示：如果前端请求没发出去，`error`上不会存在`response`属性

### 2.6 下载导出类需求
`GET`下载请求,使用`DOWNLOAD`

`POST`下载请求,使用`DOWNLOADPOST`

返回值为二进制流


# 项目维护

## 1.使用pnpm
```
pnpm install
```
## 2.编译上传
修改`package.json`中的版本号
```zsh
pnpx tsc
# 建议使用npm6或者yarn上传，因为如果使用的Verdaccio版本太低，>npm7或者pnpm无法识别readme.md
pnpm publish
```
