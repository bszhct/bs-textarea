# bs-textarea
通用组件脚手架。


## 快速使用
```bash
// 安装
yarn install

// 开发
yarn run dev

// 打包
yarn run build
```


## 功能
* 组件支持纯 ts 方式和 react 方式
* 支持提交前代码检测
* 支持实时开发并预览结果



## 说明
1. 关于图片
* 所有引用的图片全部放到 `src/images` 目录下，一般来说，组件里面不应该引用很大的图片文件，建议图片都用 svg 的。
* 通过 require 来使用
```ts
const icon = require('./images/icon.svg')
const image = require('./images/image.png')
```

2. 关于声明文件
项目打包时会默认生成，如果想要学习语法，请移步
[快速入门篇](https://segmentfault.com/a/1190000009247663)
[详细讲解篇](https://www.tslang.cn/docs/handbook/declaration-files/introduction.html)

3. 关于样式引用
* 所有的样式都在 `src/index.styl` 中引用，其他 ts/tsx 文件中不要单独引用
```css
@import './a.styl'
@import './b.styl'
@import './c.styl'
```

## 反馈
[传送门](https://github.com/bszhct/cli/issues/1)
