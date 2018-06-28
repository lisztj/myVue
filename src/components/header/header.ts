import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './header.css'
declare var $:any;
@Component({
    name:'app-header',
    template: require('./header.html'),

  })
export default class header extends Vue {
  app={
    name:"投融资管理平台"
};
  arrow:boolean=true;

  mounted(){
   this.changeDedentIcon();
  }
  changeDedentIcon(){
    if(this.arrow){
      this.arrow=false;
      $('.body').removeClass('app-aside-folded');
    }else if(!this.arrow){
      this.arrow=true;
      $('.body').addClass('app-aside-folded');
    }
  }
  logoOut(){
    window.sessionStorage.clear();
    this.$router.push('./login');
  }
  get userName(){
      return  sessionStorage.getItem('userName');
  }
}
