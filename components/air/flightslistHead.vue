<template>
 <el-row class="flight-title">
     <el-col :span="5">航空信息</el-col>
     <el-col :span="14" >
         <el-row justify="space-between" type="flex">
             <el-col :span="14">起飞时间</el-col>
             <el-col :span="14">到达时间</el-col>
         </el-row>
     </el-col>
     <el-col :span="5">价格</el-col>
 </el-row>
</template>
 
<script>
export default {
 
}
</script>
 
<style >
 .flight-title{
     width: 746px;
     height: 38px;
     border: 1px solid #dddddd;
     background-color: #f6f6f6;
     line-height: 38px;
     text-align: center;
     font-size: 12px;
     color: #666666;
     margin: 20px 0 10px;
 }
</style>