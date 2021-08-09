<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="btn-wra">
      <a-button v-for="(item, index) in data.msg" :type="data.activeNum === index ? 'primary' : ''" :key="item.title" @click="toRoute(item.routerName, index)">{{ item.title }}</a-button>
    </div>
    <router-view />
  </div>
</template>

<!-- 老式写法 -->
<!-- <script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script> -->
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from "vue-router";
  const data = reactive({
    activeNum: 0,
    msg: [
      {
        title: '首页',
        routerName: "Home"
      },
      {
        title: '关于',
        routerName: "about"
      }
    ]
  })
  const router = useRouter();
  function toRoute(name: string, index: number) {
    
    router.push({
      name
    })
    data.activeNum = index
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn-wra {
  margin: 0 auto;
  width: 150px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
</style>
