## 一、关于 Astro 的一些话：

Astro(A front-end framework solution for the JZ Web) 是凝结业界优秀开源项目组成的前端框架解决方案小组的项目名称。他包括页面模板库的 `HTML解决方案` ,构建样式库的 `CSS解决方案` 和基础组件库的 `JS解决方案` 。目前 Astro 致力于为中小型团队内部的前端开发人员提供一整套简洁、快速、高效的开发解决方案。

基于 `开源·分享·贡献` 的理念建立 [Astro](https://github.com/billwing/astro 'Astro') 这个项目，对优秀开源项目取其精华，发扬光大。发布的所有开源源代码，均采用 [MIT License]((https://github.com/billwing/astro/LICENSE.md) 许可。欢迎参与 Astro 的开发，或[提出你宝贵的意见](mailto:tbrweb@gmail.com 'tbrweb@gmail.com')。

## 二、仓库目录结构：

``` 
---
  |---- astro-dev/           开发目录(开发目录结构)
  |---- astro-docs/          规范文档(前端开发规范)
  |---- component-docs/      组件文档(包括CSS,JS等)
  |---- tpl/                 模板文件(页面结构模板)
  |---- css/                 样式文件(支持Less,CSS)
  |---- js/              	   脚本文件
  |---- images/              图片文件
  |---- flash/               动画文件
  |---- examples/            框架模板
  |---- index.html			     首页模板
  |---- respond-proxy.html   Respond JS Proxy
  |---- SPA.html             单页应用模板
  |---- SPA-sample.html      小项目页面模板
  |---- README.md			 
  |---- LICENSE.md
  |---- HISTORY.md
  |---- package.json
```

## 三、参考开源项目：

#### 1. [Sea.js](http://seajs.org/ 'A Module Loader for the Web')
* 作者：[lifesinger](https://github.com/lifesinger)

* 简介：Sea.js 追求简单、自然的代码书写和组织方式，具有以下核心特性：
简单友好的模块定义规范：Sea.js 遵循 [CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md) 规范，可以像 [Node.js](http://nodejs.org/) 一般书写模块代码；
自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。
Sea.js 还提供常用插件，非常有助于开发调试和性能优化，并具有丰富的可扩展接口。

* 源码：[https://github.com/seajs](https://github.com/seajs)

#### 2. [Arale](http://aralejs.org/ '随心构建互联网应用')
* 作者：[Members](https://github.com/orgs/aralejs/members)

* 简介：Arale 立足于支付宝的前端需求和国内前端社区，基于 [Sea.js](http://seajs.org/) 和 [CMD](https://github.com/seajs/seajs/issues/242) 规范，致力发展小而美的前端模块架构，建立了一套从编码测试到部署的开发体系， 是一个开放、简单、易用的前端解决方案。

* 源码：[https://github.com/aralejs](https://github.com/aralejs)

#### 3. [Alice](http://aliceui.org/ '写样式的更好方式')
* 作者：[Members](https://github.com/orgs/aliceui/members)

* 简介：Alice 是漫游仙境的童话女神，是支付宝的样式解决方案，是一套精选的基于 CMD 生态圈的样式模块集合，是 Arale 的子集，也是一套模块化的样式命名和组织规范，是写 CSS 的更好方式。
她包括了一套通用样式模块库，一个模块化样式构建规范，一组帮助书写和组织样式的工具，以及产出更多 Alice 模块和样式库的完善方案。

* 源码：[https://github.com/aliceui](https://github.com/aliceui)
 
## 四、意见反馈：

关于 Astro 的 FAQ: [https://github.com/billwing/astro/wiki](https://github.com/billwing/astro/wiki)

任何批评、问题和意见等，都欢迎与我们联系：[tbrweb@gmail.com](mailto:tbrweb@gmail.com)

## 五、版权和许可

基于 [MIT License](http://en.wikipedia.org/wiki/MIT_License "WikiPedia 中关于 MIT License 的描述") 开源。由于Astro基于开源项目组成的，所以版权属于 `参考开源项目` 所有。版权说明文件可以在这个链接中查看：

[https://github.com/billwing/astro/LICENSE.md](https://github.com/billwing/astro/LICENSE.md)
