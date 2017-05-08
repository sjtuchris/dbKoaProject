<template>
<div>
  <el-row class="tac">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>Function Menu</template>
          <el-menu-item-group>
            <template slot="title">Group</template>
            <el-menu-item index="1-1">1</el-menu-item>
            <el-menu-item index="1-2">2</el-menu-item>
          </el-menu-item-group>
          
          <el-submenu index="1-4">
            <template slot="title">4</template>
            <el-menu-item index="1-4-1">1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" @click="toPost"><i class="el-icon-edit"></i>Post Project</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>Nav3</el-menu-item>
      </el-menu>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'side-bar',
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toPost(){
        this.$router.push('/postproject')
      }
  }
}
</script>

