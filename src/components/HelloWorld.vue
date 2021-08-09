<template>
  <h1>{{ msg }}</h1>
  <h1>{{ userInfo.name }}{{ message }}</h1>
  <h1>{{ userInfo1 }}</h1>
  <a-button type="primary" @click="setVal">Primary</a-button>
  {{ value }}
  <a-cascader v-model:value="value" :options="options" placeholder="Please select"  change-on-select/>
  <div class="f">
    1221
    <div class="c">111</div>
    <div><SmileOutlined /></div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { SmileOutlined } from '@ant-design/icons-vue'
import { ref, defineProps, onMounted,reactive } from 'vue'
  defineProps({
    msg: {
      type: String,
      required: true,
      default: '12'
    }
  })
  interface Option {
  value: string;
  label: string;
  children?: Option[];
}
  const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      }
    ],
  }
]
  const value = ref<string[]>([])

  onMounted(() => {
    console.log(1111);
  })
  // 获取store
  const store = useStore()
  let userInfo = ref(store.state.userInfo)
  let message = ref(store.state.msg)
  let userInfo1 = ref({
    name:"222"
  })
  console.log(userInfo)
  setTimeout(() => {
    console.log(12121)
    store.commit('setUserInfo', {name: '111'})
    userInfo.value = store.state.userInfo
  },1000)
  function setVal() {
    const data = {
      name: 'ccc'
    }
    userInfo1.value = data
    console.log(userInfo1)
  }
  let val = reactive({
    name: 'aaa'
  })
  val = {
    name: 'bbb'
  }
</script>

<style scoped lang="less">

label {
  margin: 0 0.5em;
  font-weight: bold;
}
.f {
  color: red;
  .c {
    color: blue;
  }
}
</style>
