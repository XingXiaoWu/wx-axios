# 说明

axios 请求接口的方法，一个基于基于 promise 的 HTTP 库

# 介绍

这是一个用 axios,QS 封装的库

### 项目结构

```
├── node_modules  #依赖包管理
├── index.js #封装axios的配置文件
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

### 相关说明：

- axios：基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。

### 项目编译和运行

### 1.安装 nodejs v12.16.3

### 2.下载项目

- 新建 vue 项目

```
npm i @xing.wu/axios axios
```

- 使用

  - 在 src 文件夹下新建 api 文件夹,新建 index.js
  - 调用

  ```
  import API from '@xing.wu/axios';
  ```

  - 设置拦截器

    请求拦截器,外部设置的优先执行

    ```
    API.interceptors.request.use(
        (config) => {
            ***
            return config;
        },
        (error) => {
            throw error;
        },
    );
    ```

    结果拦截器，外部设置的最后执行

    ```
    API.interceptors.response.use(
      (response) => {
        // 判断状态
        if (response.status === '0') {
          return response.data;
        }
        // 否则都是错了
        throw new Error(JSON.stringify(response));
      },
      (error) => {
        throw error;
      },
    );
    ```

  - 设置请求出错的配置

  ```
  // 错误处理
  const errorHandle = (error) => {
    // 处理错误,尝试获取error的message展示
    try {
      const tmp = JSON.parse(error.message);
      const { message } = tmp;
      Toast(message);
    } catch (e) {
      Toast(error.toString());
    }
  };

  // 设置错误处理
  API.setErrorHandle(errorHandle);
  ```

  - 请求

  ```
  export default {
      test: (params) => API.GET('/mqc/sapi/doctor/get-doctor-info', params),
  };
  ```
