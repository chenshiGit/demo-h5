<template>
  <el-container>



    <el-header style="text-align: right; font-size: 12px; background-color: #e5f6ff" class="el-header">
      <el-button type="primary" icon="el-icon-switch-button" @click="open">退出</el-button>
    </el-header>

    <el-aside width="205px" >
      <el-menu v-on:select="handleSelect" :default-active="$route.path" router
               background-color="rgba(70, 76, 91, 1)" text-color="#ccc">
        <el-submenu index="1">
          <el-menu-item index="/list">搜索</el-menu-item>
          <el-menu-item index="/bhConfigure">配置1</el-menu-item>
        </el-submenu>
      </el-menu>
      
    </el-aside>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/list'}">搜索</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

  </el-container>
</template>

<script>
    export default {
      name: "ElementIndex",
      methods: {
        open() {
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '确认要'),
              h('i', { style: 'color: teal' }, '退出')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                  window.localStorage.removeItem('loginToken');
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 3000);
              } else {
                done();
              }
            }
          }).then(action => {
            this.$message({
              type: 'info',
              message: '退出成功！'
            });
            this.$router.push({path: '/login'});
          });
        },
      }
    }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
  .el-header {
    line-height: 60px;
  }
</style>
