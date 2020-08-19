<template>
  <div class="login-test"> 
      <van-field 
      v-model="value1" 
      :label="label1" class="van-input" 
      :placeholder="placeh"
      :clearable="clear"
      :type="type"
      :inputmode="imode"
      :rule="rule"
      />
      
  </div>
</template>

<script>
export default {
    name:'LoginTest',
    data(){
        return{
            value1:''
        }
    },
    props:['label1','placeh',"clear","type","imode","rule"],
    watch:{
        value1() {
            this.handleData()
            // console.log(this.value1)
        }
    },
    methods:{
        handleData(){
            const rule = new RegExp(this.rule)
            if(rule.test(this.value1)){
                this.$emit('handleInput',this.value1)
                // console.log(this.value1);
            }
        }

    },
    
}
</script>

<style>
    .van-input{
        border-radius: 3px;
        box-shadow: 1px 1px 1px 1px  rgba(0, 0, 0, .1);
    }
</style>