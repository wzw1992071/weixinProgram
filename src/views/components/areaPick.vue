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
           <!-- <mt-picker :slots="pickSlots" @change="onValuesChange"></mt-picker> -->
           <mt-picker :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
export default {
  name: "AreaPick",
  data() {
    return {
      initData: false,//是否需要初始化
    //   组件数据
      selectData: {
        province: {
          id: "",
          name: ""
        },
        city: {
          id: "",
          name: ""
        },
        county: {
          id: "",
          name: ""
        }
      },
      provinceList:[],
      cityList:[],
      countyList:[],
    //  三级联动数据
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
          defaultIndex: 0
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center",
          defaultIndex: 0
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center",
          defaultIndex: 0
        }
      ]
    };
  },
  props: ["area", "togglePicker"],
  methods: {
    onValuesChange(picker, values) {
                //   console.log(values);
      if (this.togglePicker) {
        if (values[0]) {
        //   console.log(picker);

        if (values[0].id == this.selectData.province.id) {
            if (values[1]&&values[1].id == this.selectData.city.id) {
              if(values[2]&&values[2].id&&values[2].id.toString().substring(0,2)!=this.selectData.city.id.toString().substring(0,2)) {
                  return false;
              } 
              if (values[2]&&values[2].id == this.selectData.county.id) {
              } else {
                if(values[2]){
                    this.selectData.county.id = values[2].id;
                    this.selectData.county.name = values[2].name;
                }
                if(this.initData){
                    
                    picker.setSlotValue(2,this.countyList[this.getIndex(this.area.county_id,this.countyList)])
                    if(this.getIndex(this.area.county_id,this.countyList)>-1){
                        this.initData=false
                    }
                }
              }
            } else {
                try{
                    this.selectData.city.id = values[1].id;
                    this.selectData.city.name = values[1].name;
                    this.getChildArea(values[1].id, 2, picker,()=>{
                        if(this.initData){
                            picker.setSlotValue(1,this.cityList[this.getIndex(this.area.city_id,this.cityList)])
                        }
                    });
                }catch(err){

                }
               
                    
            }
          } else {
            this.selectData.province.id = values[0].id;
            this.selectData.province.name = values[0].name;
            this.getChildArea(values[0].id, 1, picker,()=>{
                if(this.initData){
                    picker.setSlotValue(0,this.slots[0].values[this.getIndex(this.area.province_id,this.slots[0].values)])
                }
            });
           
          }
        }
      }
    },
    // 提交组件数据
    commitData(type) {
      this.$emit("commitData", {
            type:type,
            data:this.selectData
        });
        // console.log(this.selectData)
    //   this.togglePicker = false;
    },
    // 获取子区域
    getChildArea(id, level, picker,cb) {
      this.$http
        .getChildArea(id)
        .then(res => {
          picker.setSlotValues(level, res.data);
          if(level==1){
              this.cityList=res.data
          }else if(level==2){
                this.countyList=res.data
          }
          if(cb){cb()}
        })
        .catch(error => {});
    },
    getIndex(dataId,dataList=[]){
        let dataIndex
        dataList.forEach((item,index)=>{
            if(item.id==dataId){
                dataIndex=index
            }
        })
        // console.log(dataIndex)
        return dataIndex;
    }
  },
  mounted() {
      if(this.area.province_id){
          this.initData =true//判断是否需要回填
      }
    this.$http
      .getProvinces()
      .then(res => {
        res.data.forEach((element, index) => {
          this.slots[0].values.push(element);
        });
      })
      .catch(error => {});
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