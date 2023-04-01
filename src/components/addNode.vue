<template>
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
      @finish="onFinish"
    >
      <a-space
        v-for="(user, index) in dynamicValidateForm.users"
        :key="user.id"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
      >
        <a-form-item
          :name="['users', index, 'field_type']"
          :rules="{
            required: true,
            message: '请选择字段类型',
          }"
        >
        <a-select
        ref="select"
        v-model:value="user.field_type"
        style="width: 120px"
        >
        <a-select-option value="int">int</a-select-option>
        <a-select-option value="varchar">varchar</a-select-option>
        <a-select-option value="datetime">datetime</a-select-option>
        <a-select-option value="char">char</a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item
          :name="['users', index, 'field_name']"
          :rules="{
            required: true,
            message: '请输入字段名',
          }"
        >
          <a-input v-model:value="user.field_name" placeholder="字段名" />
        </a-form-item>
        <a-form-item
          :name="['users', index, 'field_rule']"
          :rules="{
            required: true,
            message: '请选择规则',
          }"
        >
        <a-select
        ref="select"
        v-model:value="user.field_rule"
        style="width: 120px"
        >
        <a-select-option value="id">id</a-select-option>
        <a-select-option value="GUID">GUID</a-select-option>
        <a-select-option value="name">姓名</a-select-option>
        <a-select-option value="email">邮箱</a-select-option>
        <a-select-option value="age">年龄</a-select-option>
        <a-select-option value="addr">地址</a-select-option>
        <a-select-option value="birth">出生年月</a-select-option>
        <a-select-option value="time">时间</a-select-option>
        <a-select-option value="ip">ip</a-select-option>
        </a-select>
        </a-form-item>
        <MinusCircleOutlined @click="removeUser(user)" />
      </a-space>
      <p style="color:red;font-weight: bold;">添加完字段之后，切记一定保存字段</p>
      <a-form-item>
        <a-button type="dashed"  @click="addUser">
          <PlusOutlined />
          添加字段
        </a-button>
        <a-button type="dashed"  html-type="submit">保存所有字段</a-button>
      </a-form-item>
    </a-form>
  </template>
<script lang="ts">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { mainStore } from '../store';
  
  interface User {
    field_type: string;
    field_name: string;
    id: number;
    field_rule:string;
  }
  export default defineComponent({
    name:'addNode',
    components: {
      MinusCircleOutlined,
      PlusOutlined,
    },
    setup() {
      const store=mainStore()
      const formRef = ref<FormInstance>();
      const dynamicValidateForm = reactive<{ users: User[] }>({
        users: [],
      });
      const removeUser = (item: User) => {
        let index = dynamicValidateForm.users.indexOf(item);
        if (index !== -1) {
          dynamicValidateForm.users.splice(index, 1);
        }
      };
      const addUser = () => {
        dynamicValidateForm.users.push({
          field_type: '字段类型',
          field_name: '',
          field_rule:'规则',
          id: Date.now(),
        });
      };
      const onFinish = (values:any) => {
        console.log('Received values of form:', values);
        console.log('dynamicValidateForm.users:', dynamicValidateForm.users);
        (store.fileds as any)=dynamicValidateForm.users
        store.isKeepField=true
      };
      return {
        formRef,
        dynamicValidateForm,
        onFinish,
        removeUser,
        addUser,
      };
    },
  });
  </script>
  
  