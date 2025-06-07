---
title: vue cli4引入vant并配置自动rem换算 postcss-pxtorem和lib-flexible + 黑名单
description: 在引入 vant 的时候，我看到官方推荐了两个自动转换 px 为 rem 的插件，一个叫 postcss-pxtorem ，一个叫 lib-flexible。
tags:
  - vue
  - vant
  - postcss-pxtorem
  - lib-flexible
---
> 在引入 `vant` 的时候，我看到官方推荐了两个自动转换 `px` 为 `rem` 的插件，一个叫 `postcss-pxtorem` ，一个叫 `lib-flexible` 。
<!-- more -->

# 安装插件

- 安装 `postcss-pxtorem`
```bash
npm install postcss-pxtorem --save-dev
```

安装 `lib-flexible`，由于时间的问题， `lib-flexible` 其实已经弃用了，现在是使用名为 `amfe-flexible` 的插件， `amfe-flexible` 实际上就是在 `lib-flexible` 的基础上更新的，所以用法都是一样。

```bash
npm i -s  amfe-flexible
```

- 安装完毕只需要引入 `amfe-flexible`

# 引入插件

- `main.js` 文件引入：

```javascript
import 'amfe-flexible'
```

# 创建配置文件

在根目录，和 `package.json` 同级，创建一个名为 `postcss.config.js` 的文件，然后里面的内容我直接照搬 `vant` 提供的。

如果有这个文件，可以自行修改里面的内容，没有才创建。

```javascript
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```
然后保存，这个时候我们再去 `vue` 里面，对元素设置 `px`，运行时会发现网页上自动转换成了 `rem` 单位。

百度到一个新的配置

```javascript
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

# 黑名单

顾名思义，在黑名单中的类名，将不会自动 `rem` 转换

```javascript
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.van-notify',],
    }
  }
}
```
