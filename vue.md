## Vue 特点

- 采用组件化模式，提高代码复用率、且让代码更好的维护
- 声明式编码，让编码人员无需直接操作DOM，提高开发效率（注意： 此处vue并没有完全追寻mvvm模式，可以$refs去获取DOM）
- 使用虚拟DOM + diff算法，尽量复用DOM节点

### Vue基础

####  vue模板语法

- 插值语法：
  - 功能：用于解析标签体内容
  -  写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。

- 指令语法：
  - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
  - 常见指令： v-bind（:)  v-on(@)   v-if  等

#### 数据绑定

- 单项绑定(v-bind)
  - 数据只能从data流向页面
- 双向绑定(v-model)
  - 数据不仅能从data流向页面，还可以从页面流向data

MVVM模型（vue 没有完全遵循mvvm模型）

1. M：模型(Model) ：data中的数据

2. V：视图(View) ：模板代码

3. VM：视图模型(ViewModel)：Vue实例

####  数据代理 Object.defineProperty

