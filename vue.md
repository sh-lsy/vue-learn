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
        handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
        }
    })
    ```
    

- 立即执行（immediate）

  配置immediate:true, //初始化时让handler调用一下

- 深度监视（deep）

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

#### 绑定样式

- class
  - :class="classname"  
    - 字符串写法适用于：类名不确定，要动态获取
  - :class="['classname1', 'classname2']" 
    - 象写法适用于：要绑定的样式个数不确定、名字也不确定
  - :class="{classname: true}"
    - 对象写法适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用

字符串，数组，对象可以通过vm去管理

- style
  - :style="{fontSize: 40px;}"
    - 对象写法，font-size写成驼峰形式或加引号
  - :style="[{fontSize: 40px;},{backgroundColor:'gray' }]"
    - 数组写法

数组，对象可以通过vm去管理

#### 条件渲染

- v-if
  - v-if="表达式" 
  - v-else-if="表达式"
  - v-else

- v-show
  - v-show="表达式"

##### v-if和v-show的区别

- v-show 是通过css样式控制 设置display:none,v-if为false时，页面就不会渲染
- v-if适用于：切换频率较低的场景。v-show 适用于：切换频率较高的场景。
- v-if可以与template的配合使用 不影响界面结构（template，在渲染时会去掉，从而不影响界面结构）

#### 列表渲染

- v-for指令
  - 用于展示列表数据
  - 语法：v-for="(item, index) in xxx" :key="yyy"
  - 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

##### key的作用 （key的内部原理）

-  虚拟DOM中key的作用

  - key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较

  - 对比规则
    - 旧虚拟DOM中找到了与新虚拟DOM相同的key
      - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
      - 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
    - 旧虚拟DOM中未找到与新虚拟DOM相同的key
      - 创建新的真实DOM，随后渲染到到页面。
  - 用index作为key可能会引发的问题
    - 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
      - 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    - 如果结构中还包含输入类的DOM
      - 会产生错误DOM更新 ==> 界面有问题
  - 如何选择key?
    - 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
    - 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示， 使用index作为key是没有问题的。

#### 模拟一个数据监测

```js
let data = {
  name:'尚硅谷',
  address:'北京',
}

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data)		
console.log(obs)	

//准备一个vm实例对象
let vm = {}
vm._data = data = obs

function Observer(obj){
  //汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj)
  //遍历
  keys.forEach((k)=>{
    Object.defineProperty(this,k,{
      get(){
        return obj[k]
      },
      set(val){
        console.log(`${k}被改了，去解析模板，生成虚拟DOM`)
        obj[k] = val
      }
    })
  })
}
```

#### Vue.set() 或 vm.$set

可以添加响应式数据

```js
this.$set(this.obj,key,value)
```

#### Vue监视数据的原理

- vue会监视data中所有层次的数据
- 如何检测对象中的数据：
  - 通过setter实现监视，且要在new Vue时就传入要监测的数据。
    - 对象中后追加的属性，Vue默认不做响应式处理
    - 如需给后添加的属性做响应式，请使用如下API
      - Vue.set(target，propertyName/index，value)
      - vm.$set(target，propertyName/index，value)
- 监测数组中的数据
  - 通过包裹数组更新元素的方法实现，本质就是做了两件事
    - 调用原生对应的方法对数组进行更新
    - 重新解析模板，进而更新页面
  - 修改数组中的某个元素一定要用如下方法
    - 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    - Vue.set() 或 vm.$set()
- **Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！**

#### v-model 收集表单数据

- <input type="text"/>，则v-model收集的是value值，用户输入的就是value值
- <input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
- <input type="checkbox"/>
  - 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
  - 配置input的value属性
    - v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
    - v-model的初始值是数组，那么收集的的就是value组成的数组

v-model的三个修饰符：

- lazy：失去焦点再收集数据
- number：输入字符串转为有效的数字
- trim：输入首尾空格过滤

#### 过滤器（filter）

对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。

- 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
- 使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
- 过滤器也可以接收额外参数、多个过滤器也可以串联
- 过滤器并没有改变原本的数据, 是产生新的对应的数据

#### vue内置指令

-  v-bind  : 单向绑定解析表达式, 可简写为 :xxx
-  v-model : 双向数据绑定
-  v-for  : 遍历数组/对象/字符串
-  v-on   : 绑定事件监听, 可简写为@
- v-if   : 条件渲染（动态控制节点是否存存在）
- v-else  : 条件渲染（动态控制节点是否存存在）
- v-show  : 条件渲染 (动态控制节点是否展示)
- v-text
  - 作用：向其所在的节点中渲染文本内容。
  - 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会
-  v-html
  - 作用：向指定节点中渲染包含html结构的内容。
  - 与插值语法的区别：
    - v-html会替换掉节点中所有的内容，{{xx}}则不会。
    - v-html可以识别html结构。
  - v-html有安全性问题
    - 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
    - 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上

- v-cloak

  - 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性

  - 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题

    - ```css
      [v-cloak]{
      	display:none;
      }
      ```

- v-once
  - v-once所在节点在初次动态渲染后，就视为静态内容了
  - 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能
  - 

- v-pre
  - 跳过其所在节点的编译过程
  - 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

#### 自定义指令

- 定义
  (1).局部指令：
    new Vue({															new Vue({
      directives:{指令名:配置对象}   或   		directives{指令名:回调函数}
    }) 
  (2).全局指令：
    Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
- 配置对象中常用的3个回调：
  (1).bind：指令与元素成功绑定时调用。
  (2).inserted：指令所在元素被插入页面时调用。
  (3).update：指令所在模板结构被重新解析时调用。

1.指令定义时不加v-，但使用时要加v-；
2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

#### 生命周期

- beforeCreate
  - 无法通过vm去访问data和methods
- created
  - 可以通过vm去访问data和methods，开始解析模板，页面还不能显示内容
- beforeMount
  - 页面呈现的是未经vue编译的的DOM结构
  - 对dom的操作，不奏效
- mounted
  - 页面呈现的是vue编译的的DOM结构
  - 对dom操作有效（尽可能避免），至此 初始化结束，一般再次开启定时器，发送网络请求等
- beforeUpdate
  - 数据是新的， 页面为旧的，即 数据和页面未保持同步
  - （开始根据data生产新的虚拟DOM，然后与旧的虚拟DOM进行比较，最终去完成界面更新）

- updated
  - 数据是新的， 页面为新的， 即 数据和页面保持同步

- beforeDestroy
  - 此时vm里面的data，methods等都是可用状态，马上执行销毁过程
  - 一般在此进行操作：关闭定时器，取消订阅消息，解绑自定义操作等

- destroyed
  - 销毁完毕


可以通过this.$destroy()去执行销毁（完全销毁一个vue实例）

**常用的生命周期钩子**：

- mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
- beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

销毁Vue实例

- 销毁后借助Vue开发者工具看不到任何信息
- 销毁后自定义事件会失效，但原生DOM事件依然有效。
- 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
