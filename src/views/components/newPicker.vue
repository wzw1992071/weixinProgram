// 使用说明：
// 1按vue组件引入，标签名为组件name
// 2入参格式 pickDatas：[{name,id}] ,togglePicker:fasle initDataID(可无):"2"
// 3关闭事件返回参数  type:1为确认，0为取消 data：选中的值的对象全部数据
<template>
    <div>
       
        <mt-popup
            v-model="togglePicker"
            :closeOnClickModal=false
            position="bottom"
            >
            <div class="btnGroup">
                <div @click="commitData(0)">取消</div>
                <div @click="commitData(1)">确认</div>
            </div>
           <mt-picker :slots="pickSlots" valueKey="type_name" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
export default {
  name: "NewPicker",
  data() {
    return {
      selectData: {},
      pickSlots: [
        {
          values: [],
          className: "slot1",
          textAlign: "center",
          defaultIndex:0
        }
      ]
    };
  },
  props: ["pickDatas", "togglePicker","initDataID"],
  methods: {
    onValuesChange(picker, values) {
      if (this.togglePicker) {
        console.log(values);
        this.selectData = values[0];
      }
    },
    // 获取默认值序号
    getIndex(id,datas=[]){
      let idIndex;
      datas.forEach((item,index) => {
          if(item.id ==id){
            idIndex=index
          }
      });
      return idIndex
    },
    // 提交数据
    commitData(type) {
      this.$emit("commitData",{
        type:type,
        data:this.selectData
      });
    }
  },
  mounted() {
    console.log(this.pickDatas)
    this.pickSlots[0].values = this.pickDatas;
    if(this.initDataID.toString()){
      this.pickSlots[0].defaultIndex=this.getIndex(this.initDataID,this.pickDatas)
    }
  }
};
</script>

<style lang="less" scoped>
.mint-popup {
  width: 100%;
  .btnGroup {
    padding: 1rem 2rem 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>

