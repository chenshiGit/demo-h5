<template>
  <div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/list'}">搜索</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-row>
      <el-col>
        <el-form :model="searchForm" :rules="searchRules" ref="searchForm" inline="true">
          <el-form-item label="武侠榜排名" prop="rank">
            <el-input v-model="searchForm.rank" placeholder="请输入排名数1到100"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch('searchForm')" plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <div>
        <el-table
          :data="list"
          stripe
          border
          style="width: 100%"
          v-loading="listLoading">
          <el-table-column
            prop="id"
            label="排名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="称号">
          </el-table-column>
        </el-table>
        <el-col :span="24" class="pagination">
          <el-pagination layout="prev,pager,next" :total="10" :pager-count="100" background></el-pagination>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "List",
      methods:{
        toSearch(formName){
          this.$refs[formName].validate(valid => {
            if(valid){
              let params = {
                id:this.searchForm.rank,
                userName:this.searchForm.name,
                nickName:null
              };
              this.request('search',params).then((res) => {
                console.log(res);
                this.list = res;
                console.log(this.list);
              })
            }else{
              console.log('error submit!!');
              return false;
            }
          })
        }
        },
      data() {
        return {
          //表单搜索数据
          searchForm: {
            rank:null,
            name:null
          },
          searchRules:{
            rank:[
              {required: true, message: '请输入数字1~100', trigger: 'blur'},
              // {type: 'string', min: 1, message: '帐号长度不能低于3位', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
            ],
            name:[]
          },
          list:[],
        }
      }
    }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");

</style>
