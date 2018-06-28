import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
import './financingProjectManage.css'


declare var bootbox: any;
declare var $: any;
// declare var portrayal:string;
// declare var people:any;
import '../../../static/mock/tableData2.json';

@Component({
  template: require('./financingProjectManage.html')
})
export default class FinancingProjectManage extends Vue {
  protected axios: any;

  // tableConfig = <any>{
  //   tableData:[]
  // };
  index:Number=1;
  /**
   * 表头
   */
  columns: any = [];
  /**
   * 数据
   */
  tableData: any = [];
  /**
   * 是否展开
   */
  expand: boolean = false;
  /**
   * 展开收起
   */
  Collapsed: String = "展开";
  /**
   * 数据路径
   */
  url: String ="../../../static/mock/tableData2.json";
  /**
   * 加载状态
   */
  loading:boolean=false;

  selectedRowKeys:any=[];


  /**
   * 构造函数
   */
  constructor () {
    super();
    this.axios = axios;    /* 结构声明，在不安装 @types/axios的情况下可以这么调用 */
  }

  /**
   * 初始化方法
   */
  mounted() {
    /**
     * 刷新DOM
     */
    this.$nextTick(() => {
      this.loadData();
    })

    /**表格头 */
    this.columns = [{
      title: '序号',
      dataIndex: 'index++',
      // sorter: true,
      // scopedSlots: { customRender: 'itemName' },
      width: '6%'
    },{
      title: '项目名称',
      dataIndex: 'itemName',
      sorter: (a, b) => a.itemName.length - b.itemName.length,
      scopedSlots: { customRender: 'itemName' },
      width:'12%'
    }, {
      title: '金融机构',
      className: 'column-money',
      dataIndex: 'financeOrgan',
      filters: [
        { text: '金融机构', value: 'financeOrgan' }
      ],
      filterMultiple:false,
      onFilter: (value, record) => record.financeOrgan.indexOf(value) === 0,
      sorter: (a, b) => a.financeOrgan.length - b.financeOrgan.length,
      width: '15%'
    }, {
      title: '融资金额',
      dataIndex: 'money',
      width: '7%'
    }, {
      title: '融资主体',
      dataIndex: 'main',
      width: '15%'
    }, {
      title: '融资方式',
      dataIndex: 'type',
      width: '7%'
    }, {
      title: '融资期限',
      dataIndex: 'timeLimit',
      width: '7%'
    }, {
      title: '综合成本',
      dataIndex: 'compositeCost',
      width: '7%'
    }, {
      title: '经办人',
      dataIndex: 'operator',
      width: '9%'
    }, {
      title: '辅助人',
      dataIndex: 'aider',
      width: '9%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
      fixed: 'right',
      width: 130,
      className: 'column-last'
    }];

  }

    /**
     * 数据加载
     */
  loadData() {
    this.loading = true;
    this.axios.get(this.url).then((response: AxiosResponse) => {
      this.tableData = response.data;
      this.index = response.data.length;
      console.log(this.tableData);
      this.loading = false;
    }, (error) => {
      console.error(error)
    })

    this.selectedRowKeys=[];

  }

  // methods() {
  //   this.handleSearch ();

  // }
    /**新增 */
  handleAdd(){
    console.log("新增项目");
  }
  /**删除 */
  handleDelete() {
    console.log("删除项目");
  }
  /**行内删除 */
  cDelete(key) {
    const newData = [...this.tableData]
    const target = newData.filter(item => key === item.key)[0]
    // if (target) {
    //   Object.assign(target, this.tableData.filter(item => key === item.key)[0])
    //   delete target.editable
    //   this.tableData = newData
    // }
  }

    /**全选 单选 */
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.selectedRowKeys = selectedRowKeys
  }

  /**查询 */
  handleSearch (){
    this.loadData();
  };
  /**
   * 展开收起事件
   */
  toggle() {
    if (this.expand == false) {
      this.expand = true;
      this.Collapsed = "收缩";
    } else {
      this.expand = false;
      this.Collapsed = "展开";
    }

  };



}
