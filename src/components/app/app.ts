// import  Component  from 'vue-class-component'
// import Vue from 'vue'
import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';///设置组件中文
import 'moment/locale/zh-cn';///设置组件中文
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import navbar from '../nav'
import header from '../header'
import footer from '../footer'

import './App.css'
// import template from './App.vue'

  @Component({
    name: 'app',
    //  mixins: [template],
    template: require('./app.html'),
    components:{
      "app-navbar":navbar,
      'app-header':header,
      'app-footer':footer,
    },
  // watch: {
  //   // 防止跳过登录直接进系统
  //   $route (newVal, oldVal) {
  //     if (!this.$store.state.token && newVal.path !== '/login') {
  //       this.$router.push('/login')
  //       alert('请登录')
  //     }
  //   }
  // }
})

export default class app extends Vue {
  title:string="Vue2.5";
  footerTitle:string="Copyright 2018";

  /**返回数据 */
  data() {
    return {
      zh_CN
    }
  }

}

