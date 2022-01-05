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

​	 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

```javascript
let obj = {x:100}
let obj2 = {y:200}

Object.defineProperty(obj2,'x',{
    get(){
        return obj.x
    },
    set(value){
        obj.x = value
    }
})
```

#### 事件处理

##### 基本使用

1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；

2.事件的回调需要配置在methods对象中，最终会在vm上；

2.methods中配置的函数，不要用箭头函数！否则this就不是vm了；

4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；

5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

##### Vue中的事件修饰符

- prevent：阻止默认事件（常用）
- stop：阻止事件冒泡（常用）
- once：事件只触发一次（常用）
- capture：使用事件的捕获模式(捕获中执行方法)
- self：只有event.target是当前操作的元素时才触发事件
- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

多个修饰符可以连写（如：@click.prevent.stop）

##### 键盘事件

- Vue中常用的按键别名
  - 回车 => enter
  - 删除 => delete (捕获“删除”和“退格”键)
  - 退出 => esc
  - 空格 => space
  - 换行 => tab (特殊，必须配合keydown去使用)
  - 上 => up
  - 下 => down
  - 左 => left
  - 右 => right
- Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
- 系统修饰键（用法特殊）：ctrl、alt、shift、meta
  - 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
  - 配合keydown使用：正常触发事件。

- 也可以使用keyCode去指定具体的按键， 如@keydown.13  回车事件（不推荐）
- Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
  - Vue.config.keyCodes.huiche = 13     @keydown.huiche

#### 计算属性（computed）

- 定义：要用的属性不存在，要通过已有属性计算得来。
- 原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
  - 初次读取时会执行一次 getter 
  - 当依赖的数据发生改变时会被再次调用 getter
- 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
- 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

#### 监事属性（watch）

- 当被监视的属性变化时, 回调函数自动调用, 进行相关操作

- 监视的属性必须存在，才能进行监视

- 两种写法

  - new Vue时传入watch配置

  - 通过vm.$watch监视

    ```js
    vm.$watch('isHot',{
        immediate:true, //初始化时让handler调用一下
        handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
        }
    })
    ```

    

- 深度监视

  配置deep:true可以监测对象内部值改变（多层)

  ```js
  watch: {
  	key:{
  		handler(nval,oval) {
  			console.log('111')
  		},
  		deep: true
  	}
  }
  ```

  

#### computed和watch之间的区别

- computed能完成的功能，watch都可以完成
- watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
