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

### 组件化编程

#### 模块与组件、模块化与组件

- 模块
  - 理解：向外提供特定功能的 js 程序, 一般就是一个 js 文件
  - 为什么: js 文件很多很复杂
  - 作用: 复用 js, 简化 js 的编写, 提高 js 运行效率
- 组件
  - 理解： 用来实现局部(特定)功能效果的代码集合(html/css/js/image…..）
  - 为什么： 一个界面功能复杂，写在一起臃肿
  - 作用: 复用编码, 简化项目编码, 提高运行效率
- 模块化
  - 当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用。
- 组件化
  - 当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用,。

非单文件组件

1. 模板编写没有提示 
2. 没有构建过程, 无法将 ES6 转换成 ES5 
3. 不支持组件的 CSS 
4. 真正开发中几乎不用

 单文件组件

1. 引入组件 
2. 映射成标签
3. 使用组件标

#### Vue使用组件三大步骤

- 定义组件(创建组件)

  - 使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

    -  区别如下：

      ​        1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。

      ​        2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。

      ​      备注：使用template可以配置组件结构。

- 注册组件
  - 局部注册：靠new Vue的时候传入components选项
  - 全局注册：靠Vue.component('组件名',组件)

- 使用组件(写组件标签)
  - 自己定义在components里面的名字 <Name></Name>
#### ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```
#### props配置项
1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值  数组对象等需默认函数返回
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
#### mixin(混入)  （vue3 移除）
1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入：```Vue.mixin(xxx)```
    ​	局部混入：```mixins:['xxx']	```

#### webStorage
1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。
  #### 组件的自定义事件
  1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @emitName="test"/>```  或 ```<Demo v-on:emitName="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('emitName',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('emitName',数据)```		

5. 解绑自定义事件```this.$off('emitName')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('emitName',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！
#### 全局事件总线（GlobalEventBus）
1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。
#### nextTick
1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
#### Vue封装的过度与动画
1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。
#### vue脚手架配置代理
- 方法一
​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）
- 方法二
​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。
#### 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
#### Vuex
- 概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

- 何时使用？

​		多个组件需要共享数据时

- 搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```