<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select="multipleSelect"
      @row-click="sameSelect"
      @select-all="selectAll"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      origin: -1, // 起始
      pin: false, // 是否按下shift键
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      multipleSelection: [],
      select: false,
      selections: [],
      temp: 0, // 保存上次选择的行index
    };
  },
  watch: {
    selections(newVal,oldVal=[]){
      console.log('------watch----',newVal,oldVal)
      oldVal.forEach(row => {
        // 同步删除
        console.log(`----------同步删除------------`);
        if (!newVal.includes(row)) {
          console.log(`---remove-------toooo----${row}--------`);
          // const item = this.tableData.find(item => {item == row})
          console.log('item',item);
          const item = this.tableData.indexOf(row) === -1 ? false:true
          console.log('sssss',this.tableData[2]==row,item)
          if(item) {
            console.log(`----------不选------------`);
            this.$refs.multipleTable.toggleRowSelection(row,false)
          }
        }
      });
      newVal.forEach(row => {
        // 同步新增
        console.log(`----------同步新增------------`);
        console.log('!oldVal.includes(row)',row,oldVal,newVal,!oldVal.includes(row));
        if (!oldVal.includes(row)) {
          console.log(`-----add-----toooo----${row}--------`);
          // const item = this.tableData.find(item => { item.date == row.date})
          const item = this.tableData.indexOf(row) === -1 ? false:true
          console.log('add  -----  item',item)
          if(item) {
            console.log(`----------选上------------`);
            this.$refs.multipleTable.toggleRowSelection(row,true)
          }
        }
      })
    
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    removeSelectItem(item) {
      if(this.selections.includes(item)) {
        const tmp = [...this.selections]
        tmp.splice(this.selections.indexOf(item),1) 
        this.selections = tmp
      }
      // console.log('this.selections  remove', this.selections);
    },
    addSelectItem(item) {
      // this.selections.push(item);
      const tmp = [...this.selections]
      tmp.push(item)
      this.selections = tmp
      console.log('this.selections  add', this.selections);
    },
    clearSelections() {
      this.selections = []
    },
    getSelectItemIndex(arr) {
      let indexArr = []
      arr.forEach((item) => {
        indexArr.push(this.tableData.indexOf(item))
        console.log(`----------${this.tableData.indexOf(item)}----get--------`);
      })
      console.log('arr',indexArr);
      return indexArr
    },
    selectAll(selection) {
      console.log(`----------${selection}------------`);
      this.selections = selection
    },
    multipleSelect(select, row) {
      console.log('select', select);
     this.commonSelect(row)
    },
    sameSelect(row) {
      this.commonSelect(row)
    },
    commonSelect(row) {
      console.log('------rowclick触发----');
      console.log('temp', this.temp);
      // const preIdx = this.temp;
      const data = this.tableData; // 获取所以数据     $refs.multipleTable.
      const origin = this.origin; // 起点数 从-1开始
      const endIdx = data.indexOf(row); // 当前点击节点 终点数
      console.log('endIndex', endIdx);
      if (this.pin && this.selections.includes(data[origin])) {
        // 按住shift 循环加入区间之间的row
        let oeMinIdx = Math.min(origin, endIdx);
        let sum = Math.abs(origin - endIdx) + 1;
        // 保留起点行，删除其他行
        this.clearSelections()
        this.addSelectItem(data[origin])
        // 选中 起点行 -- 到当前点击行
        let i = 0;
        while (i < sum) {
          const addIndex = oeMinIdx + i;
          if (!this.selections.includes(data[addIndex])) {
            console.log(`----------if-----add-------`);
            this.addSelectItem(data[addIndex]);
            console.log(
              'this.selections-----add',
              this.selections,
              data[addIndex]
            );
          }
          i++;
        }

        
      } else {
        // 未按住shift 或无起点 只增删该节点 并初始化起点
        this.origin = data.indexOf(row);
        if (this.selections.includes(row)) {
          // 已选 则删
          console.log(`----------else---remove---------`);
          this.removeSelectItem(row);
        } else {
          // 选中
          console.log(`----------else----add--------`);
          this.addSelectItem(row);
        }
      }

      // 事件结束 保存这次点击的行的index,供下次使用
      // this.temp = endIdx;
    },
  },
  created() {

  },
  mounted() {
    window.addEventListener('keydown', (code) => {
      // console.log('---------code-------',code)
      // 开启多选
      if (code.keyCode === 16 && code.shiftKey) {
        // console.log('------this---',this)
        this.pin = true;
        // console.log(code,code.keyCode,code.shiftKey)
        
      }
    });
    window.addEventListener('keyup', (code) => {
      // 关闭多选
      if (code.keyCode === 16) {
        // console.log('---------------------------')
        this.pin = false;
      }
      // this.removeSelectItem([1,2,3,4],3)
      // this.addSelectItem([1,2,3,4],5)
      this.getSelectItemIndex(this.selections)
    });
  },
  beforeDestroy() {},
};
</script>
