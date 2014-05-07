# 经传前端开发规范

---

## 命名规范

1. 文件和目录名只能包含 [a-z\d\-]，并以英文字母开头
2. 首选合适的英文单词/缩写，其次选择汉语拼音，简洁明了
3. data api 命名为小写并用连字符，如 data-trigger-type
4. 事件名为驼峰，如 .trigger('itemSelected')
5. 符合规范
   - 常量全大写 UPPERCASE_WORD
   - 变量驼峰 camelName
   - 类名驼峰，并且首字母要大写 CamelName

## 目录结构

项目的开发目录结构，可以直接 clone 生成

```
astro
  -- css
       -- astro               存放css文件(支持LESS)
            -- index.less     使用LESS编写
            -- index.css      工具自动生成
       -- package.json        peaches包信息
  -- images
       -- astro               存放img文件
       -- Gruntfile.js        smushit配置文件
       -- package.json        smushit包信息
  -- js
       -- astro               存放JS文件
       -- Gruntfile.js        build配置文件
       -- package.json        build包信息
  -- index.html               页面模板文件
```

## JS编码风格

### 编码

统一用 utf-8

### 长度

长度不超过 80 个字符

### 缩进

缩进使用 2个 或 4个 空格，组件内保持统一，不混用。

### 花括号

#### 花括号不换行

````
if (foo) {
}
````

**不允许一行判断，一律换行**

````
if (foo)
    return;
````

### 命名约定

1. 常量 UPPERCASE_WORD
2. 变量 camelName
3. 类名 CamelName

### 空格

#### 操作符之间需要空格

````
var x = y + z
````

#### 只空一格

````
{
	a: 'short',
	aaaaaaaa: 'long'
}
````

### 逗号与换行

建议用正常的处理方法

````
{
	a: 'a',
	b: 'b',
	c: 'c'
}
````

### 变量声明

首先，**变量在使用前必须声明**

对于单 var 模式和多 var 模式，不做强行约定，但在同一个文件里，风格必须一致。

## JS注释规范

### 总原则

1. **As short as possible（如无必要，勿增注释）**。尽量提高代码本身的清晰性、可读性。
1. **As long as necessary（如有必要，尽量详尽）**。合理的注释、空行排版等，可以让代码更易阅读、更具美感。

总之，注释的目的是：**提高代码的可读性，从而提高代码的可维护性。**

### 什么时候需要添加注释

1. 说明某段代码的用途

```js
// alert right tips
alert('It is right!');
```

### 注释书写规范

1. 源码中的注释，推荐用英文。
1. 含有中文时，标点符号用中文全角。
1. 中英文夹杂时，英文与中文之间要用一个空格分开。
1. 注释标识符与注释内容要用一个空格分开：`// 注释` 与 `/* 注释 */`。


## 文档规范

### README.md

每个组件必须有 README.md 文件，用来描述组件的基本情况。

```
# 模块名称

-----

该模块的概要介绍。

-----

## 使用说明

如何使用该模块，可以根据组件的具体特征，合理组织。

## API

需要提供 API 说明，属性、方法、事件等。
```

### HISTORY.md

记录组件的变更，最好和 issues 进行绑定。

1. 历史记录文件放在模块根目录下，文件名为 **HISTORY.md**。

2. 一切有价值的修改必须如实地记录在文件中，推荐关联上对应的 issue 地址。

3. 模块的修改类型共有五项：
  - `NEW` #3 新增的属性、功能、方法、特性等等。
  - `FIXED` #15 修复 bug 和影响使用的性能问题等。
  - `IMPROVED` 接口增强、健壮性和性能提升、代码优化、依赖模块升级等。
  - `CHANGED` 涉及到兼容性变化的改动。
  - `UNRESOLVED` 已知的但本版本暂未修复的问题。

```
### 1.1.0

* [fixed] #18 修复了 XXX 问题
* [fixed] #29 修复了 YYY 问题
* [new] #12 增加了 ZZZ 功能
* [improved] #23 优化了 BBB 代码

### 1.0.0

* [new] 第一个发布版本
```


## Reference

 -  [注释规范](https://github.com/aralejs/aralejs.org/wiki/JavaScript-%E6%B3%A8%E9%87%8A%E8%A7%84%E8%8C%83)

 -  [编码风格](https://github.com/aralejs/aralejs.org/wiki/JavaScript-%E7%BC%96%E7%A0%81%E9%A3%8E%E6%A0%BC)

 -  [编码与文档的讨论](https://github.com/aralejs/aralejs.org/issues/36)

 -  [常用词命名统一表](https://github.com/aralejs/aralejs.org/wiki/%E5%B8%B8%E7%94%A8%E8%AF%8D%E5%91%BD%E5%90%8D%E7%BB%9F%E4%B8%80%E8%A1%A8)
