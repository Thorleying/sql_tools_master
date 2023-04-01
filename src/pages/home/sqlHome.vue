<template>
<a-row :gutter="16">
    <a-col :span="12">
        <a-card title="输入配置" class="card">
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="formState"
                :rules="rules"
                v-bind="layout"
                @finish="handleFinish"
                @validate="handleValidate"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item has-feedback label="库名" name="databaseName">
                   <a-input v-model:value="formState.databaseName"  autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="表注释" name="databaseComment">
                   <a-input placeholder="描述表的中文名称，作用等" v-model:value="formState.databaseComment"  autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="条数" name="sql_nums">
                   <a-input-number v-model:value="formState.sql_nums" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span:16, offset: 2 }">
                    <add-node></add-node>
                </a-form-item>
                <!-- <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1">
                <template #header>
                    <a-input placeholder="字段名称" style="width: 50%;"/>
                </template>
                </a-collapse-panel>
                <a-collapse-panel key="2">
                <template #header>
                    <a-input placeholder="字段名称" style="width: 50%;"/>
                </template>
                </a-collapse-panel>
                </a-collapse> -->
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" html-type="submit">点击提交</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </a-col>
    <a-col :span="12">
        <a-card title="生成结果" class="card" v-if="create_table_sql!==''">
            <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="建表语句">
                <div v-highlight style="width:100%;">
                <a-button type="dashed" @click="copy(create_table_sql)">点击复制代码</a-button>
                <pre>
                    <code>
                       {{ create_table_sql }}
                    </code>
                </pre>
            </div>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="插入语句">
                <div v-highlight style="width:100%">
                <a-button type="dashed" @click="copy(insert_sql)">点击复制代码</a-button>
                <pre>
                    <code>
                        {{ insert_sql }}
                    </code>
                </pre>
                </div>
            </a-collapse-panel>
            </a-collapse>
        </a-card>
        <a-empty description="暂且没数据" v-else/>
    </a-col>
    </a-row>
</template>
<script lang="ts">
import useClipboard from 'vue-clipboard3';
import type { Rule } from 'ant-design-vue/es/form';
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import addNode from '../../components/addNode.vue';
import { mainStore } from '../../store';
import { create_sql } from '../../module_sql/create_sql';
import { postFiled } from '../../service/field';
// import { postFiled } from '../../service/field';
interface FormState {
  databaseName: string;
  databaseComment:string;
  sql_nums: number | undefined;
}
export default defineComponent({
    name:"sqlHome",
    components:{addNode},
    setup(){   
    const state=reactive({
        //建表代码
        create_table_sql:'',
        //插入语句
        insert_sql:'' as any
    })  
    const store=mainStore()
    const activeKey = ref([1]);
    const formRef = ref<FormInstance>();
    const formState = reactive<FormState>({
      databaseName: '',
      databaseComment:'',
      sql_nums: 0,
    });
    let checkNum = async (_rule: Rule, value: number) => {
      if (!value) {
        return Promise.reject('请输入生成条数');
      }
      if (!Number.isInteger(value)) {
        return Promise.reject('Please input digits');
      } else {
        if (value < 0 || value>101) {
          return Promise.reject('条数范围为0-100');
        } else {
          return Promise.resolve();
        }
      }
    };
    let validateDatabaseName = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入数据库名');
      } else {
        return Promise.resolve();
      }
    };
    let validateDatabaseComment = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      }  else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      databaseName: [{ required: true, validator: validateDatabaseName, trigger: 'change' }],
      databaseComment: [{ validator: validateDatabaseComment, trigger: 'change' }],
      sql_nums: [{ validator: checkNum, trigger: 'change' }],
    };
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 16 },
    };
    const handleFinish = async (values: FormState) => {
      console.log(values, formState,store.fileds);
      console.log(create_sql(formState.databaseName,formState.databaseComment,store.fileds))
      if(!store.isKeepField){
        message.warn('暂未保存字段，请保存');
      }else{
        if(store.fileds.length===0){
            message.error('字段不能为空啊，你没有字段怎么建表啊')
        }else{
            state.create_table_sql=create_sql(formState.databaseName,formState.databaseComment,store.fileds)
        // state.insert_sql =create_sql_one(formState.databaseName,store.fileds,formState.sql_nums)
        //过滤数据 只保留field_rule
        let rules:any;
        let fields:any;
        rules=store.fileds.map((item:any)=>{
            return{
                field_rule:item.field_rule
            }
        })
        fields=store.fileds.map((item:any)=>{
            return{
                field_name:item.field_name
            }
        })
        //传递给后端
        const {data}=await postFiled(fields,rules,formState.sql_nums,formState.databaseName)
        console.log('’输出传递结果',data)
        let flag=data.data;
        let str:any="";
        flag.forEach((item:any,index:any) => {
            str+=`
            ${item}\n`
            console.log(index)
        });
        state.insert_sql=str
        }
    }
    };
    const handleFinishFailed = (errors:any) => {
      console.log(errors);
    };
    const resetForm = () => {
      (formRef.value as any).resetFields();
    };
    const { toClipboard } = useClipboard();
    //点击复制代码
    const copy=async (sql_str:any)=>{
        try {
        await toClipboard(sql_str);
        message.success('复制成功!')
        } catch (e) {
        console.log(e);
        }
    }
    const handleValidate = (...args:any) => {
      console.log(args);
    };
    return{
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      activeKey,
      ...toRefs(state),
      copy
    }
    }
})
</script>
<style scoped>
  .card{
    height:780px;
  }
</style>