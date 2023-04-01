<template>
    <a-layout class="layout">
     <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo">
          <img src="../assets/log.png" class="logo_img">
          <h2>sql-tools</h2>
        </div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px'}"
        >
          <!-- <a-menu-item key="1">代码生成</a-menu-item>
          <a-menu-item key="2">词库大全</a-menu-item> -->
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin-top:70px;padding: 0  30px;">
        <h3 class="title_content">快速生成sql语句,大大提高开发效率</h3>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '780px',height:'100vh'}">
            <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name:'layoutView',
    setup() {
      return {
        selectedKeys: ref<string[]>(['1']),
      };
    },
  });
  </script>
  <style>
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }
 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    /* background: rgba(255, 255, 255, 0.3); */
  }
  .ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
  
  [data-theme='dark'] .site-layout-content {
    background: #141414;
  }
  .logo_img{
    position: absolute;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  .logo h2{
    color: white;
    position: absolute;
    line-height:35px;
    left:100px;
  }
  .title_content{
    font-weight: 900;
    font-size: 20px;
  }
  .card{
    height:780px;
  }
  </style>
  